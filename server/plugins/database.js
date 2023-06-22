"use strict";

const fp = require("fastify-plugin");

module.exports = fp(async function (fastify) {
  await fastify.register(require("@fastify/postgres"), {
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });

  fastify.addHook("onReady", async () => {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS temperature_data (
        id SERIAL PRIMARY KEY,
        timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        temperature REAL NOT NULL,
        sensor TEXT,
        humidity REAL
      )`;

    await fastify.pg.query(createTableQuery);
  });
});
