const fs = require("fs");
const path = require("path");
const fp = require("fastify-plugin");
const dayjs = require("dayjs");

/***
  File .buildserver has the following format
  ```
  BUILD_TIME=2023-07-01T11:46:31Z
  LATEST_COMMIT_TIME=2023-07-01T18:27:43+07:00
  ```

  This plugin should read from that file and decorate buildmetadata property to fastify with propery buildTime and latestCommitTime
*/

module.exports = fp(async function (fastify) {
  const buildServerFile = path.join(__dirname, "..", ".buildserver");
  const buildServerFileContent = fs.readFileSync(buildServerFile, "utf8");

  let buildTime = buildServerFileContent.match(/BUILD_TIME=(.*)/)[1];
  let latestCommitTime = buildServerFileContent.match(
    /LATEST_COMMIT_TIME=(.*)/,
  )[1];

  buildTime = dayjs(buildTime).format("YYYY-MM-DD HH:mm:ss");
  latestCommitTime = dayjs(latestCommitTime).format("YYYY-MM-DD HH:mm:ss");

  fastify.decorate("buildmetadata", { buildTime, latestCommitTime });
});
