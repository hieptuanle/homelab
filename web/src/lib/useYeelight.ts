import React, { useEffect } from "react";
import { socket } from "@/lib/socketio";
import { IYeelightState, setYeelightState } from "@/lib/homelab-api";

export const useYeelight = (
  initialState: IYeelightState
): [IYeelightState, (state: IYeelightState) => Promise<void>] => {
  const [state, setState] = React.useState(initialState);

  useEffect(() => {
    const onYeelightStateChange = (data: IYeelightState) => {
      setState(data);
    };

    socket.on("yeelight", onYeelightStateChange);

    return () => {
      socket.off("yeelight", onYeelightStateChange);
    };
  }, []);

  return [
    state,
    async (state: IYeelightState) => {
      setState(state);
      await setYeelightState(state);
    },
  ];
};
