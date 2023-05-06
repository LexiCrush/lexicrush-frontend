import React from "react";
import { Navigate } from "react-router-dom";
import "./Gameover.css"


function Gameover() {
  const [goToPlay, setGoToPlay] = React.useState(false);
  const [goToProfile, setgoToProfile] = React.useState(false);

  function handlePlayClick() {
    setGoToPlay(true);
  }
  function handleProfileClick() {
    setgoToProfile(true);
  }


  if (goToPlay) {
    return <Navigate to="/longest" />;
  }

  if (goToProfile) {
    return <Navigate to="/profile" />;
  }

  return (
    <body>
    <div class="container">
      <div class="stars"></div>
      <div class="planet">
        <div class="shadow"></div>
      </div>
      <div class="astronaut">
        <div class="tank center"></div>
        <div class="suit center">
          <div class="helmet center"></div>
          <div class="buttons center"></div>
          <div class="hand-l"></div>
          <div class="hand-r"></div>
          <div class="leg-l"></div>
          <div class="leg-r"></div>
          <div class="pipe"></div>
        </div>
      </div>
    </div>
    <h1 className="glitch-game-over"  style={{fontFamily: 'ButtonFont', marginBottom: '-110px', color: "white", top: '50%', left: '50%', transform: 'translate(-50%, -40%)'}}>
        <span aria-hidden="true">Game over</span>
        Game Over
        <span aria-hidden="true">Game over</span>
        </h1>
    <button className="rounded" onClick={handlePlayClick} style={{ display: 'block', marginBottom : '10px', fontFamily: 'ButtonFont'}}>  
      Play Again
    </button>
    <button className="profile-button" onClick={handleProfileClick} style={{ display: 'block', fontFamily: 'ButtonFont'}}>
      Return Home
    </button>
    
  </body>
  );
}

export default Gameover;
