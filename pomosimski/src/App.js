import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [timeleft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const [inputTime, setInputTime] = useState(25);
  const [mode, setMode] = useState("work");

  // Format seconds as MM:SS
  const formatTime = (seconds) => {
    const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${minutes}:${secs}`;
  };

  // Start or pause timer
  const handleStartPause = () => {
    setIsRunning((prev) => !prev);
  };

  // Reset timer
  const handleReset = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    setTimeLeft(mode === "work" ? inputTime * 60 : 5 * 60);
  };

  // Timer countdown logic
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === 0) {
            clearInterval(intervalRef.current);

            if (mode === "work") {
              setMode("break");
              setTimeLeft(5 * 60);
              setIsRunning(true);
            } else {
              setMode("work");
              setTimeLeft(inputTime * 60);
              setIsRunning(false);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    // Cleanup interval on stop or unmount
    return () => clearInterval(intervalRef.current);
  }, [isRunning, mode, inputTime]);

  // Update time when user changes input (only if timer stopped)
  useEffect(() => {
    if (!isRunning) {
      setTimeLeft(inputTime * 60);
    }
  }, [inputTime, isRunning]);

  return (
    <div className="App">
      <h1>PomoSimski</h1>

      <div className="middle">
        <div className="timer">
          <h2 className="mode">
            {mode === "work" ? "Work Time" : "Break Time"}
          </h2>
          <h2>{formatTime(timeleft)}</h2>
        </div>

        <img
          src={
            process.env.PUBLIC_URL +
            (mode === "work" ? "/worksmiski.png" : "/chillsmiski.png")
          }
          alt="Smiski Pomodoro"
        />
      </div>

      <label>
        Choose Duration:
        <select
          value={inputTime}
          onChange={(e) => setInputTime(Number(e.target.value))}
          disabled={isRunning}
        >
          <option value={15}>15 Minutes</option>
          <option value={20}>20 Minutes</option>
          <option value={25}>25 Minutes</option>
          <option value={30}>30 Minutes</option>
        </select>
      </label>

      <div className="buttons">
        <button onClick={handleStartPause}>
          <img
            src={
              process.env.PUBLIC_URL +
              (isRunning ? "/pause.png" : "/start.png")
            }
            alt={isRunning ? "Pause" : "Start"}
          />
        </button>

        <button onClick={handleReset}>
          <img
            src={process.env.PUBLIC_URL + "/reset.png"}
            alt="Reset"
          />
        </button>
      </div>
    </div>
  );
}

export default App;
