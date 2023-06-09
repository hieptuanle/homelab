import Fastify from "fastify";
import { join } from "path";
import { Database } from "sqlite3";
import view from "@fastify/view";
import fastifyStatic from "@fastify/static";

const fastify = Fastify({ logger: true });

// Create a new database or open existing one
const db = new Database("./data.sqlite");

// This will contain the temperature data table creation query
const createTableQuery = `
CREATE TABLE IF NOT EXISTS temperature_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    temperature REAL NOT NULL
)`;

// Run the query to create the table (if it doesn't exist yet)
db.run(createTableQuery);

const checkIfColumnExists = (db, tableName, columnName, callback) => {
  db.all(`PRAGMA table_info(${tableName})`, (err, rows) => {
    if (err) {
      callback(err, null);
    } else {
      const exists = rows.some((row) => row.name === columnName);
      callback(null, exists);
    }
  });
};

checkIfColumnExists(db, "temperature_data", "sensor", (err, exists) => {
  if (err) {
    console.error(err);
  } else if (!exists) {
    db.run("ALTER TABLE temperature_data ADD COLUMN sensor TEXT", (err) => {
      if (err) {
        console.error(err);
      }
    });
  }
});

checkIfColumnExists(db, "temperature_data", "humidity", (err, exists) => {
  if (err) {
    console.error(err);
  } else if (!exists) {
    db.run("ALTER TABLE temperature_data ADD COLUMN humidity REAL", (err) => {
      if (err) {
        console.error(err);
      }
    });
  }
});

// Register the templates rendering plugin
fastify.register(view, {
  engine: { pug: require("pug") },
  root: join(__dirname, "views"),
  viewExt: "pug",
  options: { pretty: true },
});

// Register the static files serving plugin
fastify.register(fastifyStatic, {
  root: join(__dirname, "public"),
});

// Define a route to receive data from the ESP8266
fastify.post("/data", (req, reply) => {
  // read tempurature from query

  fastify.log.info(`Received temperature: ${req.query.temperature}`);
  fastify.log.info(`Received sensor: ${req.query.sensor}`);
  fastify.log.info(`Received humidity: ${req.query.humidity}`);

  const temperature = parseFloat(req.query.temperature);
  const sensor = req.query.sensor;
  const humidity = parseFloat(req.query.humidity);

  // Store the data in the database
  db.run(
    `INSERT INTO temperature_data (temperature, sensor, humidity) VALUES (?, ?, ?)`,
    [temperature, sensor, humidity || 0],
    (err) => {
      if (err) {
        fastify.log.error(err);
        reply.status(500).send();
      } else {
        reply.send();
      }
    },
  );
});

// Define a route to view the data
fastify.get("/view", (req, reply) => {
  // Retrieve the data from the database
  db.all(
    `SELECT * FROM temperature_data ORDER BY timestamp DESC`,
    (err, rows) => {
      if (err) {
        fastify.log.error(err);
        reply.view("error", { message: "Could not retrieve data." });
      } else {
        reply.view("data", { data: rows });
      }
    },
  );
});

// Start the server
fastify.listen(
  {
    port: 3000,
    host: "0.0.0.0",
  },
  (err) => {
    if (err) throw err;
    fastify.log.info(`Server listening on ${fastify.server.address().port}`);
  },
);
