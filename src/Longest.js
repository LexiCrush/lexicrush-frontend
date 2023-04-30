import React, { useState, useEffect } from 'react';
import "./Longest.css";
import { Navigate } from "react-router-dom";
import axios from 'axios';
import Timer from "./Timer"


function Longest() {
  const [goBack, setGoBack] = React.useState(false);

  function handleGoBackClick() {
    setGoBack(true);
  }

  if (goBack) {
    return <Navigate to="/gamepage" />;
  }

  return (

  <div id="loading-indicators">
    <div className="loading-indicator" id="loading-indicator__1">
    </div>
    <div className="square">
    <div class="av">
      <div class="av-eye"></div>
    </div>
    <div className='timer-container'>
      <Timer></Timer>
    </div>
    </div>
    <div className="rectangle-left">
      <h1 class="player-name">Username</h1>
    </div>
    <div className="rectangle-right">
      <h1 class="bot-name">Bot</h1>
    </div>
    <div className="squarebot">
      <div class="avbot">
      <div class="avbot-eye"></div>
    </div>
    </div>
    <div className="question-position">Question</div>
    <div className="points-position">You Answered: </div>
    <div className="bots-points-position">Bot Answered: </div>
    <p>
      <span className="xx">
        <input type="text" placeholder="Enter" />
        <span></span>
        </span>
    </p>
    <div class="scene" style={{ zIndex: "-1" }}>
      <div class="space" style={{ zIndex: "-1" }} >
        <span></span>
        <span></span>
        <span></span>
        </div>
        </div> 
    <button className="arrow circle left" onClick={handleGoBackClick}></button>
    {/* <span className="arrow circle right"></span> */}
  </div>
  );
}

export default Longest;

