import "./App.css";
import { useEffect, useState } from "react";
import TrafficLamp from "./components/TrafficLamp";

const lamps = ["gr1", "gr2", "gryaya"];

function App() {
  const [activeLamp, setActiveLamp] = useState("wait1");
  const [greenTime, setGreenTime] = useState(5000);
  const interval = 5000;
  var activeTime = interval + greenTime;

  const handleYaya = (e) => {
    e.preventDefault();
    setActiveLamp("gryaya");
  };

  const handleGreenTime = (e) => {
    setGreenTime(e.target.value * 1000);
  };

  useEffect(() => {
    let timeout = null;
    switch (activeLamp) {
      case "wait1":
        timeout = setTimeout(function () {
          setActiveLamp("gr1");
        }, interval);
        break;
      case "gr1":
        timeout = setTimeout(function () {
          setActiveLamp("gr2");
        }, activeTime);
        break;
      case "gr2":
        timeout = setTimeout(function () {
          setActiveLamp("wait2");
        }, activeTime);
        break;
      case "wait2":
        timeout = setTimeout(function () {
          setActiveLamp("wait1");
        }, interval);
        break;
      case "gryaya":
        timeout = setTimeout(function () {
          setActiveLamp("wait1");
        }, 15000);
        break;
      default:
        console.log("unknown state");
    }
    if (timeout) {
      return () => clearTimeout(timeout);
    }
  }, [activeLamp]);

  return (
    <div className="App">
      {lamps.map((lamp, index) => (
        <TrafficLamp
          greenTime={greenTime}
          activeLamp={activeLamp}
          key={index}
          id={lamp}
        />
      ))}
      <button className="yayabutonu" onClick={handleYaya}></button>
      <input
        onChange={handleGreenTime}
        className="yesilInput"
        type="number"
        min="1"
        max="30"
      />
    </div>
  );
}

export default App;
