import { useState, useEffect, useRef, useCallback } from "react";
import TimeInput from "./TimeInput";
import TimeSlider from "./TimeSlider";
import ProgressDisplay from "./ProgressDisplay";
import Controls from "./Controls";

const Countdown = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [initialTime, setInitialTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const startTimeRef = useRef(null);
  const intervalRef = useRef(null);
  const savedTimeRef = useRef(0);

  const startPause = useCallback(() => {
    if (isRunning) {
      clearInterval(intervalRef.current);
      savedTimeRef.current = timeRemaining;
    } else {
      startTimeRef.current = Date.now() - (initialTime - timeRemaining);
      intervalRef.current = setInterval(() => {
        setTimeRemaining((prevTime) => {
          const timeLeft = prevTime - 1000;
          if (timeLeft <= 0) {
            clearInterval(intervalRef.current);
            return 0;
          }
          return timeLeft;
        });
      }, 1000);
    }
    setIsRunning(!isRunning);
  }, [isRunning, timeRemaining, initialTime]);

  const reset = useCallback(() => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setMinutes(0);
    setSeconds(0);
    setTimeRemaining(0);
    setInitialTime(0);
    savedTimeRef.current = 0;
  }, []);

  const handleMinutesChange = (value) => {
    const newMinutes = Math.min(value, 720);
    setMinutes(newMinutes);
    const newTime = newMinutes * 60 * 1000 + seconds * 1000;
    setTimeRemaining(newTime);
    setInitialTime(newTime);
  };

  const handleSecondsChange = (value) => {
    const newSeconds = Math.min(value, 59);
    setSeconds(newSeconds);
    const newTime = minutes * 60 * 1000 + newSeconds * 1000;
    setTimeRemaining(newTime);
    setInitialTime(newTime);
  };

  const formatTime = (time) => {
    const min = Math.floor(time / 60000);
    const sec = Math.floor((time % 60000) / 1000);
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  const passedTime = initialTime - timeRemaining;

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div>
      <h1>Countdown Timer</h1>

      <TimeInput
        minutes={minutes}
        seconds={seconds}
        setMinutes={handleMinutesChange}
        setSeconds={handleSecondsChange}
        disabled={isRunning}
      />

      <TimeSlider
        value={minutes * 60 + seconds}
        onSliderChange={(newValue) => {
          const newMinutes = Math.floor(newValue / 60);
          const newSeconds = newValue % 60;
          handleMinutesChange(newMinutes);
          handleSecondsChange(newSeconds);
        }}
      />

      <div>
        <h2>Оставшееся время: {formatTime(timeRemaining)}</h2>
      </div>

      <ProgressDisplay currentTime={passedTime} totalTime={initialTime} />

      <Controls
        isRunning={isRunning}
        onStartPause={startPause}
        onReset={reset}
      />
    </div>
  );
};

export default Countdown;
