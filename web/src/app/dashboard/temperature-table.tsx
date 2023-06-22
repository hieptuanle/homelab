"use client";

import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Socket, io } from "socket.io-client";

let socket: Socket;

const TemperatureTable: React.FC<{ initialTemperatureDataPoints: any }> = ({
  initialTemperatureDataPoints,
}) => {
  const [temperatureDataPoints, setTemperatureDataPoints] = useState<any>(
    initialTemperatureDataPoints
  );

  useEffect(() => {
    socket = io();
  }, []);

  useEffect(() => {
    function onTemperature(data: any) {
      setTemperatureDataPoints((prevTemperatureDataPoints: any) =>
        [data, ...prevTemperatureDataPoints].slice(0, 10)
      );
    }

    socket.on("temperature", onTemperature);
    return () => {
      socket.off("temperature", onTemperature);
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
          {temperatureDataPoints.map((dataPoint: any) => (
            <tr key={dataPoint.id}>
              <td className="border px-4 py-2">{dataPoint.id}</td>
              <td className="border px-4 py-2">
                {dayjs(dataPoint.timestamp).format("YYYY-MM-DD HH:mm:ss")}
              </td>
              <td className="border px-4 py-2">{dataPoint.temperature}</td>
              <td className="border px-4 py-2">{dataPoint.humidity}</td>
              <td className="border px-4 py-2">{dataPoint.sensor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TemperatureTable;
