const fp = require("fastify-plugin");

module.exports = fp(async function (fastify) {
  await fastify.register(require("@fastify/redis"), {
    url: process.env.REDIS_URL || "redis://localhost:6379",
  });

  await fastify.register(require("@fastify/redis"), {
    url: process.env.REDIS_URL || "redis://localhost:6379",
    namespace: "subscriber",
  });
});
