
import React from 'react';
import { Navigate } from "react-router-dom";
import './Profile.css';

function Profile() {
  const token = localStorage.getItem('token');
  const username = token.split('|')[0];
  const userhandle = "@" + username;
  const [goToPlay, setGoToPlay] = React.useState(false);

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
            <div class="level cent">
              Level 1
            </div>
            <div class="points cent">
              5,312 Points
            </div>
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
          <div class="more-info">
            <h1>{userhandle}</h1>
            <div class="stats">
              <div>
                <div class="title">Wins</div>
                <i class="fa fa-trophy"></i>
                <div class="value">2</div>
              </div>
              <div>
                <div class="title">Matches</div>
                <i class="fa fa-gamepad"></i>
                <div class="value">27</div>
              </div>
            </div>
          </div>
        </div>
        <div class="general">
          <h1>{userhandle}</h1>
          <span>How to Play</span>
          <span class="more">Hover...</span>
        </div>
      </div>
      <div class="a">
        <div class="a-eye"></div>
      </div>
      <button className="profile-play" onClick={handlePlayClick} style={{ display: 'block', marginBottom: '10px', fontFamily: 'ButtonFont' }}>
        Play
      </button> 
    </div>


  );
}
export default Profile