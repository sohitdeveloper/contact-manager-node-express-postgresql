const Redis = require("ioredis");
const redisClient = new Redis({
  host: "localhost",
  port: 6379,
});

const connectRedis = () => {
  redisClient.ping((err, result) => {
    if (err) {
      console.error("Failed to connect to Redis:", err);
    } else {
      console.log("Connected to Redis");
    }
  });
};

module.exports = { connectRedis, redisClient };
