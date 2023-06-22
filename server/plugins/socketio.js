"use strict";

const fp = require("fastify-plugin");
const { Server } = require("socket.io");
const io = new Server();
io.listen(process.env.SOCKETIO_PORT);

module.exports = fp(async function (fastify) {
  fastify.register(require("@fastify/http-proxy"), {
    upstream: process.env.SOCKETIO_URL,
    prefix: "/socket.io",
    rewritePrefix: "/socket.io",
    websocket: true,
  });

  fastify.decorate("io", io);
});
