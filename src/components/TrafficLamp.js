import React, { useEffect, useState } from "react";
import "./lamp.css";

const lights = ["red", "green", "yellow"];

const TrafficLamp = ({ id, activeLamp, greenTime }) => {
  const [lightState, setLightState] = useState(0);
  // const [isActive, setIsActive] = useState(false);
  // const [isYaya, setIsYaya] = useState(false);
  const interval = 5000;

  // useEffect(() => {
  // if (activeLamp === "gryaya") {
  //   setIsYaya(true);
  // } else {
  //   setIsYaya(false);
  // }
  // if (activeLamp === id) {
  //   setIsActive(true);
  // } else {
  //   setIsActive(false);
  // }
  // }, [activeLamp]);

  useEffect(() => {
    const isYaya = activeLamp === "gryaya";
    const isActive = activeLamp === id;
    let time = null;
    if (isYaya) {
      if (isActive) {
        // switch (lightState) {
        //   case 0:
        //     setLightState(1);
        //     console.log(id, 0);
        //     break;
        //   case 1:
        //     setTimeout(function () {
        //       setLightState(0);
        //     }, 15000);
        //     console.log(id, 1);
        //     break;
        //   default:
        //     console.log("unknown state");
        // }
        setLightState(1);
        time = setTimeout(() => {
          setLightState(0);
          console.log("calisiyom 15");
        }, 15000);
        console.log(id, 1);
        // return () => clearTimeout(time);
      } else {
        setLightState(2);
        time = setTimeout(() => {
          setLightState(0);
          console.log("calisiyom 7.5");
        }, 7500);
        console.log(id, 2);
        // return () => clearTimeout(time);
        // switch (lightState) {
        //   case 0:
        //     setLightState(2);
        //     console.log(id, 2);
        //     break;
        //   case 2:
        //     setTimeout(function () {
        //       setLightState(0);
        //     }, 7500);
        //     console.log(id, 3);
        //     break;
        //   case 1:
        //     setLightState(2);
        //     console.log(id, 4);
        //     break;
        //   default:
        //     console.log("unknown state");
        // }
      }
    } else {
      if (isActive) {
        setLightState(1);
        time = setTimeout(function () {
          setLightState(2);
          console.log("calisiyom green");
        }, greenTime);
        console.log(id, 3);
        // return () => clearTimeout(time);
        // switch (lightState) {
        //   case 0:
        //     setLightState(1);
        //     console.log(id, 5);
        //     break;
        //   case 1:
        //     setTimeout(function () {
        //       setLightState(2);
        //     }, greenTime);
        //     console.log(id, 6);
        //     break;
        //   case 2:
        //     setTimeout(function () {
        //       setLightState(0);
        //     }, interval);
        //     console.log(id, 7);
        //     break;
        //   default:
        //     console.log("unknown state");
        // }
      } else {
        // console.log(id, 8);
        setLightState(0);
        console.log(id, 4);
      }
    }
    if (time) {
      return () => clearTimeout(time);
    }
  }, [activeLamp]);

  return (
    <div className="trafik-lambasi">
      <div className="direk"></div>
      <div className="isiklar">
        <div className={`red ${lightState === 0 && "active"}`}></div>
        <div className={`yellow ${lightState === 2 && "active"}`}></div>
        <div className={`green ${lightState === 1 && "active"}`}></div>
      </div>
      {id},{activeLamp}
    </div>
  );
};

export default TrafficLamp;
