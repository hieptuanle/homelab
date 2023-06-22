import { Suspense } from "react";
import Clock from "./clock";
import TemperatureTable from "./temperature-table";
import Link from "next/link";

export default async function Dashboard() {
  const temperatureDataResponse = await fetch(
    process.env.HOMELAB_URL + "/api/temperature",
    {
      cache: "no-store",
    }
  );

  const temperatureDataPoints = await temperatureDataResponse.json();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-6xl">Dashboard</h1>
      <p className="text-2xl">
        <Link href="/hello">⬅️ Back to Hello Page</Link>
      </p>

      <TemperatureTable initialTemperatureDataPoints={temperatureDataPoints} />

      <div>
        <Suspense fallback={<div>Loading clock...</div>}>
          <Clock initialTime={new Date().toLocaleTimeString()} />
        </Suspense>
      </div>
    </main>
  );
}
