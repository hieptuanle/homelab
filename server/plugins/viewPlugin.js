"use strict";

const fp = require("fastify-plugin");

const { join, resolve } = require("path");

module.exports = fp(async function (fastify) {
  fastify.register(require("@fastify/view"), {
    engine: { ejs: require("ejs") },
    root: resolve(join(__dirname, "..", "views")),
  });
});
