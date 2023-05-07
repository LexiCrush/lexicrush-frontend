import React, { useEffect } from 'react';
import { Navigate } from "react-router-dom";
import './Profile.css';
import axios from 'axios';
import { set } from 'animejs';

function Profile() {
  // token is from local storage or if not there, null
  const token = localStorage.getItem('token') || 'null | 0';
  const username = token.split('|')[0] || 'null | 0';
  const userhandle = "@" + username || 'null | 0';

  const [goToPlay, setGoToPlay] = React.useState(false);
  const [Logout, setLogout] = React.useState(false);
  const [HighScore, setHighScore] = React.useState(null);

  // Fetch the updated current score from backend
  useEffect(() => {
    if (token === 'null | 0') {
      setHighScore('Login/Register to Play!');
    }
    console.log('Get updated score: ' + token);
    axios.get('http://localhost:8080/api/getHighScore', {
      headers: {
        'Access-Token': token,
      }
    })
      .then(response => {
        setHighScore(response.data);
      })
      .catch(error => console.error(error));

    // console.log('Current Score:', currentScore);
  }, [])

  if (token === 'null | 0') {
    return <Navigate to="/login" />;
  }

  function handleLogoutClick() {
    setLogout(true);
  }

  if (Logout) {
    localStorage.removeItem('token');
    return <Navigate to="/login" />;
  }

  function handlePlayClick() {
    setGoToPlay(true);
  }

  if (goToPlay) {
    return <Navigate to="/longest" />;
  }



  return (
    <div class="cent">
      <div class="card">
        <div class="additional">
          <div class="user-card">
            <div class="level cent" style={{ fontFamily: 'Gamefont' }}>
              Level 1
            </div>
            <button class="points cent" onClick={handleLogoutClick} style={{ fontFamily: 'Gamefont' }}>
              Logout
            </button>
            <svg width="110" height="110" viewBox="0 0 250 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="title desc" class="cent">
              <div style={{ width: "100%", height: "100%" }}>
              </div>
              <defs>
                <clipPath id="scene">
                  <rect x="10" y="10" width="230" height="230" />
                </clipPath>
              </defs>
              <rect x="10" y="10" width="240" height="240" fill="rgba(0,0,0,0.15)" />
              <g stroke="none" stroke-width="0" clip-path="url(#scene)">
                <rect x="0" y="0" width="250" height="250" fill="#b0d2e5" />
              </g>
            </svg>
          </div>
          <div class="more-info" style={{ fontFamily: 'Gamefont' }}>
            <h1>{userhandle}</h1>
            <div class="stats">
              <div>
                <div class="title" style={{ fontFamily: 'Gamefont' }}>High Score</div>
                <i class="fa fa-trophy"></i>
                <div class="value" style={{ fontFamily: 'Gamefont' }}>{HighScore}</div>
              </div>
              <div>
                <div class="title" style={{ fontFamily: 'Gamefont' }}>Matches</div>
                <i class="fa fa-gamepad"></i>
                <div class="value" style={{ fontFamily: 'Gamefont' }}>27</div>
              </div>
            </div>
          </div>
        </div>
        <div class="general" style={{ fontFamily: 'Gamefont' }}>
          <h1>{userhandle}</h1>
          <span>How to Play</span>
          <span class="more">Hover...</span>
        </div>
      </div>
      <div class="a">
        <div class="a-eye"></div>
      </div>
      <button className="profile-play" onClick={handlePlayClick} style={{ display: 'block', fontFamily: 'ButtonFont' }}>
        Play
      </button>
      <button className="buy-hint" style={{ display: 'block', fontFamily: 'ButtonFont' }}>
        Buy Hint
      </button>
    </div>


  );
}
export default Profile