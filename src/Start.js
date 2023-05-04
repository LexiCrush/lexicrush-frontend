import React, { useState, useEffect } from "react";
import "./Start.css"
import { Navigate } from 'react-router-dom';

function Start() {
  const [goToLogin, setGoToLogin] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowButton(true);      
    }, 2500);

    return () => clearTimeout(timeoutId);
  }, []);


  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowTitle(true);
    }, 1300);

    return () => clearTimeout(timeoutId);
  }, []);

  if (goToLogin) {
    return <Navigate to="/login" />;
  }
  
  const handleButtonClick = () => {
    setGoToLogin(true);
  };
  
  return (
    <div className="c">
    <div className="bg">
      <div className="light"></div>
      </div>
    <div className="ufo">
      <div className="ufo-bottom"></div>
      <div className="ufo-top"></div>
      <div className="ufo-glass">
        <div className="alien">
          <div className="alien-eye"></div>
        </div>
      </div>
    </div>
    {showTitle && 
    <h1 className="glitch"  style={{fontFamily: 'ButtonFont', color: "white", position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -40%)'}}>
        <span aria-hidden="true">Lexicrush</span>
        Lexicrush
        <span aria-hidden="true">Lexicrush</span>
        </h1>
    }
    {showButton && 
      <button className="play-button" onClick={handleButtonClick} style={{fontFamily: 'ButtonFont' }}>
        Play
      </button>
    }
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

export default Start;

