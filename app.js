const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
const { connectDB } = require("./config/dbConn");
const { verifyToken } = require("./middlewares/authHandler");
const { connectRedis } = require("./config/redisConn");
const port = process.env.PORT || 8000;

connectDB();
connectRedis();
// Whenever we need any data from client to server we need to use a body parser so we can pass the stream of the data
// that we are recieving freom client for that we need to use a middleware
app.use(express.json());

app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/users", require("./routes/authRoutes"));
app.use("/api/contacts", verifyToken, require("./routes/ContactRoutes"));

// Error handling middleware
app.use(errorHandler);
// const unexpectedErrorHandler = (error, req, res, next) => {
//   console.log(error);
//   errorHandler(error, req, res, next);
// };

// process.on("uncaughtException", unexpectedErrorHandler);
// process.on("unhandledRejection", unexpectedErrorHandler);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
