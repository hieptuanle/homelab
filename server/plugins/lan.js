const fp = require("fastify-plugin");
const { getConnectedDevices } = require("../services/lanService");

module.exports = fp(async function (fastify) {
  async function _getDevices() {
    try {
      const devices = await getConnectedDevices();

      // get disconnected devices
      const currentDeviceHashMap = new Map();
      for (let device of devices) {
        currentDeviceHashMap.set(device.ip, device);
      }

      const pastDeviceKeys = await fastify.redis.keys("devices:*");

      for (let key of pastDeviceKeys) {
        const device = await fastify.redis.get(key);
        if (
          currentDeviceHashMap.get(key.replace("devices:", "")) === undefined
        ) {
          fastify.log.info(
            `Device disconnected: ${JSON.parse(device).device.ip}`,
          );
          fastify.io.emit("device-disconnected", JSON.parse(device).ip);
          await fastify.redis.del(key);
        }
      }

      // detect newly connected devices
      for (let device of devices) {
        const currentDevice = currentDeviceHashMap.get(device.ip);
        if (!currentDevice) {
          fastify.log.info(`New device found: ${device.ip}`);
          fastify.io.emit("new-device", device);
        }
        // save devices to redis using fastify.redis using key 'devices:<ip_address>'
        await fastify.redis.set(
          `devices:${device.ip}`,
          JSON.stringify({ device, time: Date.now() }),
        );
      }
    } catch (err) {
      fastify.log.error(err);
    }
  }

  _getDevices();
  setInterval(_getDevices, 10000);
});
