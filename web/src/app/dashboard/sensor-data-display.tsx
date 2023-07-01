"use client";

import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { socket } from "@/lib/socketio";

const SensorDataDisplay: React.FC<{ initialSensorData: any }> = ({
  initialSensorData,
}) => {
  const [sensorData, setSensorData] = useState<any>(initialSensorData);

  useEffect(() => {
    function onSensorData(data: any) {
      setSensorData(data);
    }

    socket.on("sensorData", onSensorData);
    return () => {
      socket.off("sensorData", onSensorData);
    };
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row gap-10 items-center justify-center">
        <span id="temperature" className="text-6xl text-gray-800 text-center">
          🌡️ {sensorData.temperature}°C
        </span>
        <span id="humidity" className="text-6xl text-gray-800 text-center">
          💦 {sensorData.humidity}%
        </span>
      </div>
      <div className="text-center">
        <span id="last-updated" className="text-sm text-gray-400 text-center">
          Last updated{" "}
          {dayjs(sensorData.timestamp).format("YYYY-MM-DD HH:mm:ss")}
        </span>
      </div>
    </div>
  );
};

export default SensorDataDisplay;
