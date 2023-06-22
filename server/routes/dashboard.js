"use strict";

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://www.fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */
module.exports = async function (fastify) {
  fastify.get("/dashboard", async function (request, reply) {
    return reply.from("/next" + request.raw.url);
  });

  fastify.get("/hello", async function (request, reply) {
    return reply.from("/next" + request.raw.url);
  });
};
