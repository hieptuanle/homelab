const HOMELAB_URL = process.env.NEXT_PUBLIC_HOMELAB_URL;

export type TPowerValue = "on" | "off";

export interface IYeelightState {
  power: TPowerValue;
}

export const getSensorData = async () => {
  const sensorDataResponse = await fetch(
    HOMELAB_URL + "/api/sensor-data?limit=1",
    {
      cache: "no-store",
    }
  );
  const sensorData = await sensorDataResponse.json();
  return sensorData;
};

export const getYeelightState = async () => {
  const yeelightResponse = await fetch(HOMELAB_URL + "/api/yeelight");
  const yeelightState = await yeelightResponse.json();
  return yeelightState;
};

export const setYeelightState = async (state: { power: TPowerValue }) => {
  const yeelightResponse = await fetch(HOMELAB_URL + "/api/yeelight", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(state),
  });
  const yeelightState = await yeelightResponse.json();
  return yeelightState;
};
