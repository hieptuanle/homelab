const fastifyEnv = require("@fastify/env");
const fp = require("fastify-plugin");

module.exports = fp(async function (fastify) {
  fastify.register(fastifyEnv, {
    dotenv: true,
    schema: {
      type: "object",
      required: [
        "HOMELAB_URL",
        "NEXTJS_URL",
        "YEELIGHT_IP",
        "SOCKETIO_URL",
        "SOCKETIO_PORT",
        "ROUTER_DOMAIN",
        "ROUTER_PORT",
        "ROUTER_USERNAME",
        "POSTGRES_HOST",
        "POSTGRES_USER",
        "POSTGRES_PASSWORD",
        "POSTGRES_DB",
        "REDIS_URL",
      ],
    },
  });
});
