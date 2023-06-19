const User = require("../models/authModel");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { generateToken } = require("../middlewares/authHandler");

const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const isUserExist = await User.findOne({ where: { email } });
    if (isUserExist) {
      res.status(400);
      throw new Error("User already exists");
    }
    // Hash and salt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create a user
    const newUser = await User.create({
      id: crypto.randomUUID(),
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      message: "User created",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // find the user by name
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(400);
      throw new Error("User not found!");
    }
    // compared the provided password with hashed password
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      res.status(400);
      throw new Error("Invalid credentials!");
    }
    // generate jwt token
    const token = await generateToken(user.id);
    res
      .status(200)
      //   .header("Authorization", `Bearer ${token}`)
      .header("authorization", `${token}`)
      .json({ message: "Login successful", token: token });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signUp,
  login,
  logout,
};
