import React, { useState, useEffect } from 'react';
import './Timer.css';
import axios from 'axios';


export default function Timer() {
  const [seconds, setSeconds] = useState(10);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let intervalId;
    if (isActive && seconds > 0) {
      intervalId = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isActive, seconds]);

  useEffect(() => {
    if (seconds === 0) {
      setSeconds(10)
      // setIsActive(false);
      // window.location.reload();
    }
  }, [seconds]);

  const minutes = Math.floor(seconds / 60);
  const paddedSeconds = (seconds % 60).toString().padStart(2, '0');

  const handleStop = () => {
    setIsActive(false);
  };

  const timerDisplayClass = seconds <= 5 ? 'timer-display red' : 'timer-display';


  return (
    <div className="bomb-timer">
      <div className={timerDisplayClass}>
        {minutes}:{paddedSeconds}
      </div>
      <div className="timer-controls"></div>
    </div>
  );
}
