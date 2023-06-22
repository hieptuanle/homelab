"use client";

import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Socket, io } from "socket.io-client";

let socket: Socket;

const SensorDataTable: React.FC<{ initialSensorDataRows: any }> = ({
  initialSensorDataRows,
}) => {
  const [sensorDataRows, setSensorDataRows] = useState<any>(
    initialSensorDataRows
  );

  useEffect(() => {
    socket = io();
  }, []);

  useEffect(() => {
    function onSensorData(data: any) {
      setSensorDataRows((prevTemperatureDataPoints: any) =>
        [data, ...prevTemperatureDataPoints].slice(0, 10)
      );
    }

    socket.on("sensorData", onSensorData);
    return () => {
      socket.off("sensorData", onSensorData);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Time</th>
            <th className="px-4 py-2">Temperature</th>
            <th className="px-4 py-2">Humidity</th>
            <th className="px-4 py-2">Sensor</th>
          </tr>
        </thead>
        <tbody>
          {sensorDataRows.map((sensorDataRow: any) => (
            <tr key={sensorDataRow.id}>
              <td className="border px-4 py-2">{sensorDataRow.id}</td>
              <td className="border px-4 py-2">
                {dayjs(sensorDataRow.timestamp).format("YYYY-MM-DD HH:mm:ss")}
              </td>
              <td className="border px-4 py-2">{sensorDataRow.temperature}</td>
              <td className="border px-4 py-2">{sensorDataRow.humidity}</td>
              <td className="border px-4 py-2">{sensorDataRow.sensor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SensorDataTable;
