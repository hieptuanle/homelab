"use strict";

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://www.fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */
module.exports = async function (fastify) {
  fastify.get("/api/temperature", async function (request, reply) {
    try {
      const result = await fastify.pg.query(
        "SELECT * FROM temperature_data ORDER BY id DESC LIMIT 10",
      );
      return reply.send(result.rows);
    } catch (err) {
      fastify.log.error(err);
      reply.status(500).send();
    }
  });
};
