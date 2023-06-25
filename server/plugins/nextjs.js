"use strict";

const fp = require("fastify-plugin");

module.exports = fp(async function (fastify) {
  fastify.register(require("@fastify/http-proxy"), {
    upstream: process.env.NEXTJS_URL,
    prefix: "/_next",
    rewritePrefix: "/_next",
    websocket: true,
  });

  fastify.register(require("@fastify/http-proxy"), {
    upstream: process.env.NEXTJS_URL,
    prefix: "/__nextjs_original-stack-frame",
    rewritePrefix: "/__nextjs_original-stack-frame",
    websocket: true,
  });

  fastify.register(require("@fastify/http-proxy"), {
    upstream: process.env.NEXTJS_URL,
    prefix: "/next-assets",
    rewritePrefix: "/next-assets",
    websocket: true,
  });
  fastify.register(require("@fastify/http-proxy"), {
    upstream: process.env.NEXTJS_URL,
    prefix: "/turbopack-hmr",
    rewritePrefix: "/turbopack-hmr",
    websocket: true,
  });

  fastify.register(require("@fastify/http-proxy"), {
    upstream: process.env.NEXTJS_URL,
    prefix: "/next",
    websocket: true,
  });

  // Create convenient method .from() to proxy to myself and let http-proxy do the proxy
  // to nextjs server
  fastify.register(require("@fastify/reply-from"), {
    base: process.env.HOMELAB_URL,
  });
});
