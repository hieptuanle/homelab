module.exports = async function (fastify) {
  fastify.post("/", async function postData(req, reply) {
    const { temperature, sensor, humidity } = req.query;
    try {
      const result = await fastify.pg.query(
        "INSERT INTO sensor_data(temperature, sensor, humidity) VALUES($1, $2, $3) RETURNING *",
        [temperature, sensor, humidity],
      );

      fastify.io.emit("sensorData", result.rows[0]);

      return reply.send("ok");
    } catch (err) {
      fastify.log.error(err);
      reply.status(500).send();
    }
  });

  fastify.get("/", async function (request, reply) {
    try {
      const result = await fastify.pg.query(
        "SELECT * FROM sensor_data ORDER BY id DESC LIMIT 100",
      );
      return reply.view("data.ejs", { title: "Data", data: result.rows });
    } catch (err) {
      fastify.log.error(err);
      reply.status(500).send();
    }
  });
};
