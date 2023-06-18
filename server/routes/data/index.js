module.exports = async function (fastify) {
  fastify.post("/", async function postData(req, reply) {
    const { temperature, sensor, humidity } = req.query;
    try {
      await fastify.pg.query(
        "INSERT INTO temperature_data(temperature, sensor, humidity) VALUES($1, $2, $3)",
        [temperature, sensor, humidity],
      );
      return reply.send("ok");
    } catch (err) {
      fastify.log.error(err);
      reply.status(500).send();
    }
  });

  fastify.get("/", async function (request, reply) {
    // return reply.view("home.ejs");

    try {
      const result = await fastify.pg.query(
        "SELECT * FROM temperature_data ORDER BY timestamp DESC",
      );
      return reply.view("data.ejs", { data: result.rows });
    } catch (err) {
      fastify.log.error(err);
      reply.status(500).send();
    }
  });
};
