import React, { useState, useEffect } from 'react';
import './Timer.css';
import axios from 'axios';

const TIMER_DURATION = 10;
const TIMER_STORAGE_KEY = 'timerValue';

export default function Timer() {
  const [seconds, setSeconds] = useState(
    Number(window.localStorage.getItem(TIMER_STORAGE_KEY)) || TIMER_DURATION
  );
  const [isActive, setIsActive] = useState(true);

  function onTimerEnd() {
    // Your code to be executed when the timer ends
  }


  useEffect(() => {
    window.localStorage.setItem(TIMER_STORAGE_KEY, seconds.toString());
  }, [seconds]);

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
      // setSeconds(TIMER_DURATION);
      onTimerEnd();
    }
  }, [seconds, onTimerEnd]); 

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