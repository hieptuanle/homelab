import { Suspense } from "react";
import Clock from "./clock";
import Link from "next/link";
import SensorDataDisplay from "./sensor-data-display";
import YeelightDisplay from "./yeelight-display";
import { getSensorData, getYeelightState } from "@/lib/homelab-api";

export default async function Dashboard() {
  const sensorData = await getSensorData();
  const yeelightState = await getYeelightState();

  return (
    <main className="flex min-h-screen flex-col items-center justify-around py-10 px-5">
      <div className="flex flex-col items-center gap-5">
        <h1 className="text-6xl">Dashboard</h1>
        <p>
          <Link
            className="text-sm text-gray-400 p-2 rounded-md hover:text-gray-600 hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            href="/"
          >
            Back to Home Page
          </Link>
        </p>
      </div>

      <SensorDataDisplay initialSensorData={sensorData[0]} />
      <YeelightDisplay initialState={yeelightState} />
      <div>
        <Suspense fallback={<div>Loading clock...</div>}>
          <Clock initialTime={new Date().toLocaleTimeString()} />
        </Suspense>
      </div>
    </main>
  );
}
