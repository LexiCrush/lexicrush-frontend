import React from 'react';
import { Navigate } from "react-router-dom";
import './Test.css';

function Test() {
  const [returnHome, setreturnHome] = React.useState(false);
  const [playAgain, setplayAgain] = React.useState(false);

  function handlereturnHomeClick() {
    setreturnHome(true);
  }

  function handleplayAgainClick() {
    setplayAgain(true);
  }

  if (returnHome) {
    return <Navigate to="/gamepage" />;
  }

  if (playAgain) {
    return <Navigate to="/longest" />;
  }

  return (
    <div>
    <h1 className="glitch-game-over"  style={{fontFamily: 'ButtonFont', marginBottom: '45px', color: "white", top: '50%', left: '50%', transform: 'translate(-50%, -40%)'}}>
        <span aria-hidden="true">Game over</span>
        Game Over
        <span aria-hidden="true">Game over</span>
        </h1>
    <button className="return-home-button" onClick={handlereturnHomeClick}  style={{ display: 'block', marginBottom: '10px', fontFamily: 'ButtonFont' }}>
      Return Home
    </button>
    <button className="again-button" onClick={handleplayAgainClick} style={{ display: 'block', marginBottom: '10px', fontFamily: 'ButtonFont' }}>
      Play Again
    </button> 
    <div class="scene" style={{ zIndex: "-1" }}>
      <div class="space" style={{ zIndex: "-1" }} >
        <span></span>
        <span></span>
        <span></span>
        </div>
        </div> 
    </div>


  );
}

export default Test;

