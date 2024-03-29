"use strict";
const fp = require("fastify-plugin");

module.exports = fp(async function (fastify) {
  fastify.register(require("@fastify/cors"), {
    origin: "*",
    methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  });
});
