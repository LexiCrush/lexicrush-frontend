import React, { useState } from "react";
import "./Start.css"
import { Navigate } from 'react-router-dom';


function Start() {
  const [goToLogin, setGoToLogin] = useState(false);

  if (goToLogin) {
    return <Navigate to="/login" />;
  }
  
  const handleButtonClick = () => {
    setGoToLogin(true);
  };
  
  return (
  <div class="scene">
    <div class="space">
      <span></span>
      <span></span>
      <span></span>
      <button className="rounded-button" onClick={handleButtonClick} style={{ display: 'block', marginBottom: '10px', fontFamily: 'ButtonFont' }}>
        Play
      </button> 
      <h1 className="glitch"  style={{fontFamily: 'ButtonFont'}}>
        <span aria-hidden="true">Lexicrush</span>
        Lexicrush
        <span aria-hidden="true">Lexicrush</span>
      </h1>
    </div>	
  </div>
  );
}
export default Start;

