"use client";

import React, { useEffect, useState } from "react";

export default function Clock({ initialTime }: { initialTime: string }) {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-6xl">{time}</h1>
    </div>
  );
}
