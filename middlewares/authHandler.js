const jwt = require("jsonwebtoken");
const { redisClient } = require("../config/redisConn");
const crypto = require("crypto");
const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    // Retrieve the secret key from Redis using the token
    const secretKey = await redisClient.get(token);
    if (secretKey) {
      // Decode the token using the secret key
      const decodedToken = jwt.verify(token, secretKey);

      if (!decodedToken.userId) {
        res.status(401);
        throw new Error("Authentication failed: Invalid token");
      }

      // Attach the user ID to the request object for future use
      req.userId = decodedToken.userId;

      next();
    } else {
      res.status(401);
      throw new Error("Unauthorized");
    }
  } catch (error) {
    next(error);
  }
};

const generateToken = async (userId) => {
  // Generate a 32-byte random key and convert it to hexadecimal
  const secretKey = crypto.randomBytes(32).toString("hex");
  const token = jwt.sign({ userId }, secretKey, { expiresIn: "1h" });

  await redisClient.set(token, secretKey); // Set the token with the secret key in Redis
  return token;
};

module.exports = { verifyToken, generateToken };
