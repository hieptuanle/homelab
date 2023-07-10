"use strict";

const fp = require("fastify-plugin");
const { Yeelight } = require("yeelight-node");

module.exports = fp(async function (fastify) {
  const yeelight = new Yeelight({ ip: process.env.YEELIGHT_IP, port: 55443 });

  yeelight.client.on("data", async function (data) {
    // updated data has the format '{"method":"props","params":{"power":"on"}}
    const state = JSON.parse(data)["params"];
    if (!state) return;
    const power = await fastify.redis.get("yeelight:power");
    if (state.power !== power) {
      fastify.redis.set("yeelight:power", state.power);
      fastify.redis.publish("yeelight:set", JSON.stringify(state));
    }
  });

  async function updateYeelightState() {
    try {
      const power = await fastify.redis.get("yeelight:power");
      const response = await yeelight.get_prop("power");
      let result;
      result = JSON.parse(response).result[0];
      if (result !== power) {
        await fastify.redis.set("yeelight:power", result);
        await fastify.redis.publish(
          "yeelight:set",
          JSON.stringify({ power: result }),
        );
        fastify.log.info(`Yeelight change from ${power} to ${result}`);
      }
    } catch (err) {
      fastify.log.error(err.message);
      return;
    }
  }

  fastify.redis.subscriber.subscribe("yeelight:set", (err, count) => {
    if (err) {
      fastify.log.error(`Error subscribing to yeelight:set: ${err.message}`);
      return;
    }
    fastify.log.info(
      `Subscribed to ${count} channels. Listening for updates on the 'yeelight:set' channel...`,
    );
  });

  fastify.redis.subscriber.on("message", (channel, message) => {
    try {
      fastify.log.info(`Channel: ${channel}, Message: ${message}`);
      const state = JSON.parse(message);
      fastify.io.emit("yeelight", state);
    } catch (err) {
      fastify.log.error(err.message);
    }
  });

  await updateYeelightState();
  setInterval(updateYeelightState, 10000);

  fastify.decorate("yeelight", yeelight);
});
