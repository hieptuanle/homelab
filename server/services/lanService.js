const childProcess = require("child_process");

exports.getConnectedDevices = function () {
  return new Promise((resolve, reject) => {
    childProcess.exec(
      `ssh -p ${process.env.ROUTER_PORT} ${process.env.ROUTER_DOMAIN} arp -a`,
      function (err, stdout, stderr) {
        /* stdout:
  ? (192.168.0.1) at 34:60:f9:e4:b5:83 [ether]  on eth1
  ? (192.168.50.241) at 48:55:19:e4:fc:ac [ether]  on br0
  ? (192.168.50.53) at 5c:e5:0c:33:54:16 [ether]  on br0
  ? (192.168.50.54) at 76:d6:ae:15:c9:34 [ether]  on br0
  ? (192.168.50.27) at 2c:fd:ab:21:53:5b [ether]  on br0
  ? (192.168.50.100) at a4:83:e7:c0:0d:2d [ether]  on br0
  ? (192.168.50.119) at 1„c:57:dc:49:95:85 [ether]  on br0
  ? (192.168.50.103) at e6:1a:8b:92:61:84 [ether]  on br0
  ? (192.168.50.173) at 38:b8:00:22:42:3b [ether]  on br0
  ? (192.168.50.103) at <incomplete>  on br0

  stderr: ''

  Get the {ip, mac, interface} of each connected device
  */

        if (err) {
          reject(err);
          return;
        }

        if (stderr) {
          reject(stderr);
          return;
        }

        const devices = stdout
          .split("\n")
          .map(function (line) {
            const parts = line.split(" ");

            if (line.includes("incomplete")) return;
            if (parts.length < 7) return;
            return {
              ip: parts[1].substring(1, parts[1].length - 1),
              mac: parts[3],
              interface: parts[7],
            };
          })
          .filter((entry) => {
            return entry && entry.ip;
          });

        resolve(devices);
      },
    );
  });
};
