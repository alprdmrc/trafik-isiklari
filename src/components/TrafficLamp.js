import React, { useEffect, useState } from "react";
import "./lamp.css";

const TrafficLamp = ({ id, activeLamp, greenTime, nextStep }) => {
  const [lightState, setLightState] = useState(0);

  const isYaya = activeLamp === "gryaya";
  const isActive = activeLamp === id;

  useEffect(() => {
    let time = null;

    if (isYaya) {
      if (isActive) {
        setLightState(1);
        time = setTimeout(() => {
          setLightState(0);
        }, 15000);
      } else {
        setLightState(2);
        time = setTimeout(() => {
          setLightState(0);
        }, 7500);
      }
    } else {
      if (isActive) {
        setLightState(1);
        time = setTimeout(function () {
          setLightState(2);
        }, greenTime);
      } else {
        setLightState(0);
      }
    }
    return () => {
      clearTimeout(time);
    };
  }, [activeLamp]);

  useEffect(() => {
    if (!isYaya) {
      nextStep();
    }
  }, [lightState]);

  return (
    <div className="trafik-lambasi">
      <div className="direk"></div>
      <div className="isiklar">
        <div className={`red ${lightState === 0 && "active"}`}></div>
        <div className={`yellow ${lightState === 2 && "active"}`}></div>
        <div className={`green ${lightState === 1 && "active"}`}></div>
      </div>
      <div className="id">{id}</div>
    </div>
  );
};

export default TrafficLamp;
