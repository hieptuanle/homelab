"use strict";

const fp = require("fastify-plugin");
const { Yeelight } = require("yeelight-node");

module.exports = fp(async function (fastify) {
  const yeelight = new Yeelight({ ip: process.env.YEELIGHT_IP, port: 55443 });

  let power = "off";
  yeelight.get_prop("power").then((response) => {
    const result = JSON.parse(response).result[0];
    power = result;
  });

  setInterval(() => {
    yeelight.get_prop("power").then((response) => {
      let result;
      try {
        result = JSON.parse(response).result[0];
      } catch (err) {
        fastify.log.error(err);
        fastify.log.info(response);
        return;
      }

      if (result !== power) {
        power = result;
        fastify.log.info(`Yeelight is ${result}`);
        fastify.io.emit("yeelight", { power: result });
      }
    });
  }, 3000);

  fastify.decorate("yeelight", yeelight);
});
