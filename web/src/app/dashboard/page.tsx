import { Suspense } from "react";
import Clock from "./clock";
import SensorDataTable from "./sensor-data-table";
import Link from "next/link";
import SensorDataDisplay from "./sensor-data-display";

export default async function Dashboard() {
  const sensorDataResponse = await fetch(
    process.env.HOMELAB_URL + "/api/sensor-data?limit=1",
    {
      cache: "no-store",
    }
  );

  const sensorData = await sensorDataResponse.json();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-10">
      <div className="flex flex-col items-center gap-5">
        <h1 className="text-6xl text-gray-900">Dashboard</h1>
        <p>
          <Link
            className="text-sm text-gray-400 p-2 rounded-md hover:text-gray-600 hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            href="/hello"
          >
            ⬅️ Back to Hello Page
          </Link>
        </p>
      </div>

      <SensorDataDisplay initialSensorData={sensorData[0]} />

      <div>
        <Suspense fallback={<div>Loading clock...</div>}>
          <Clock initialTime={new Date().toLocaleTimeString()} />
        </Suspense>
      </div>
    </main>
  );
}
