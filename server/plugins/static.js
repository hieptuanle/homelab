"use strict";

const path = require("path");

module.exports = async function (fastify) {
  fastify.register(require("@fastify/static"), {
    root: path.join(__dirname, "../public"),
    prefix: "/",
  });
};
