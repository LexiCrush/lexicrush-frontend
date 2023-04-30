import React from "react";
import { Navigate } from "react-router-dom";
import "./Gamepage.css"


function Gamepage() {
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
    <button className="rounded" onClick={handlePlayClick} style={{ display: 'block', marginBottom : '10px', fontFamily: 'ButtonFont'}}>  
      Play
    </button>
    <button className="profile-button" onClick={handleProfileClick} style={{ display: 'block', fontFamily: 'ButtonFont'}}>
      Profile
    </button>
    
  </body>
  );
}

export default Gamepage;
