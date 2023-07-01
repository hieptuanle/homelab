"use client";

import { IYeelightState } from "@/lib/homelab-api";
import { useYeelight } from "@/lib/useYeelight";
import React from "react";

const YeelightDisplay: React.FC<{
  initialState: IYeelightState;
}> = ({ initialState }) => {
  const [state, setYeelightState] = useYeelight(initialState);

  return (
    <>
      <div
        className="text-6xl text-gray-800 hover:cursor-pointer"
        onClick={() => {
          setYeelightState({ power: state.power === "on" ? "off" : "on" });
        }}
      >
        {" "}
        {state.power === "on" ? "🌕 On" : "🌑 Off"}
      </div>
    </>
  );
};

export default YeelightDisplay;
