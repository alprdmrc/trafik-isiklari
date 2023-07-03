import "./App.css";
import { useEffect, useState } from "react";
import TrafficLamp from "./components/TrafficLamp";

const lamps = ["gr1", "gr2", "gryaya"];

function App() {
  const [activeLamp, setActiveLamp] = useState("wait1");
  const [greenTime, setGreenTime] = useState(5000);
  const [step, setStep] = useState(0);
  const [timer, setTimer] = useState(5);
  const interval = 5000;
  var activeTime = interval + greenTime;

  const handleYaya = (e) => {
    e.preventDefault();
    setActiveLamp("gryaya");
    setTimer(15);
  };

  const handleGreenTime = (e) => {
    let greenInput = e.target.value;
    if (greenInput > 30) {
      greenInput = 30;
    } else if (greenInput < 1) {
      greenInput = 1;
    }
    setGreenTime(greenInput * 1000);
  };

  const nextStep = () => {
    step < 6 ? setStep(step + 1) : setStep(1);

    if (step === 1 || step === 3) {
      setTimer(greenTime / 1000);
    } else if (activeLamp === "gryaya") {
      setTimer(15);
    } else {
      setTimer(5);
    }
  };

  useEffect(() => {
    let timeout = null;

    let countdown = setInterval(() => {
      setTimer((time) => time - 1);
    }, 1000);

    switch (activeLamp) {
      case "wait1":
        setStep(1);
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
        setTimer(15);
        timeout = setTimeout(function () {
          setActiveLamp("wait1");
        }, 15000);
        break;
      default:
        console.log("unknown state");
    }

    return () => {
      clearTimeout(timeout);
      clearInterval(countdown);
    };
  }, [activeLamp]);

  return (
    <div className="App">
      <div className="panel">
        <p>Mevcut Adim : {activeLamp === "gryaya" ? "Yaya Gecisi" : step}</p>
        <p>Sonraki Adima Kalan Sure : {timer}</p>
      </div>
      <div className="cadde">
        {lamps.map((lamp, index) => (
          <TrafficLamp
            greenTime={greenTime}
            activeLamp={activeLamp}
            nextStep={nextStep}
            key={index}
            id={lamp}
          />
        ))}
      </div>
      <div className="controller">
        <button className="yayabutonu" onClick={handleYaya}>
          Yaya
        </button>
        <input
          onChange={handleGreenTime}
          className="yesilInput"
          type="number"
          min="1"
          max="30"
          value={greenTime / 1000}
        />
      </div>
    </div>
  );
}

export default App;
