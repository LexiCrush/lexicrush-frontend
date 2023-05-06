
import React from 'react';
import { Navigate } from "react-router-dom";
import './Profile.css';

function Profile() {
  const token = localStorage.getItem('token');
  const username = token.split('|')[0];
  const userhandle = "@" + username;
  const [goToPlay, setGoToPlay] = React.useState(false);
  const [Logout, setLogout] = React.useState(false);

  function handleLogoutClick() {
    setLogout(true);
  }

  if (Logout) {
    return <Navigate to= "/login"/>;
  }

  function handlePlayClick() {
    setGoToPlay(true);
  }

  if (goToPlay) {
    return <Navigate to="/longest" />;
  }

  document.addEventListener('DOMContentLoaded', (event) => {
    Map.init();
  });
  
  export class Map {
    static view;
  
    static init() {
      const view = document.getElementById('map');
  
      this.view = view;
  
      Star.init();
    }
  }
  
  class Star {
    static all = [];
    static minimumDensity = 10;
  
    static canvas;
  
    static init() {
      this.canvas = document.getElementById('map-canvas');
      this.densityForm = document.getElementById('controls');
      this.densityInput = document.getElementById('controls-density');
  
      this.resizeCanvas();
  
      window.addEventListener('resize', (event) => this.resizeCanvas());
      
      this.densityForm.addEventListener('submit', (event) => {
        event.preventDefault();
        this.redrawCanvas()
      });
    }
    
    static redrawCanvas() {
      let density = parseInt(this.densityInput.value) || 0;
      
      if (density < this.minimumDensity) {
        density = this.minimumDensity;
      }
      
      this.densityInput.value = density;
      this.resizeCanvas(density);
    }
  
    static resizeCanvas(density) {
      this.canvas.width = Map.view.offsetWidth;
      this.canvas.height = Map.view.offsetHeight;
  
      this.paintCanvas(density);
    }
  
    static paintCanvas(density = 100) {
      if (this.canvas.getContext) {
        const ctx = this.canvas.getContext('2d');
  
        const width = this.canvas.width;
        const height = this.canvas.height;
  
        const boxCountX = parseInt(width / density) + 1;
        const boxCountY = parseInt(height / density) + 1;
  
        const boxOverflowX = boxCountX * density - width;
        const boxOverflowY = boxCountY * density - height;
  
        const boxOffsetX = boxOverflowX / 2;
        const boxOffsetY = boxOverflowY / 2;
  
        for (let iX = 0; iX < boxCountX; iX++) {
          for (let iY = 0; iY < boxCountY; iY++) {
            const values = {
              x: iX * density + parseInt(Math.random() * density) - boxOffsetX,
              y: iY * density + parseInt(Math.random() * density) - boxOffsetY,
            }
  
            this.drawStar(ctx, values);
  
            if (Math.random() > .95) {
              const offsetX = Math.random() > 0.5 ? 3.5 : -3.5;
              const offsetY = Math.random() > 0.5 ? 3.5 : -3.5;
  
              const binaryValues = {
                x: values.x + offsetX,
                y: values.y + offsetY,
              }
  
              this.drawStar(ctx, binaryValues);
            }
          }
        }
      } 
    }
  
    static drawStar(ctx, values) {
      const red = parseInt(Math.random() * 256);
      const green = parseInt(Math.random() * 256);
      const blue = parseInt(Math.random() * 256);
  
      const size = 0.5 + Math.random() * 3;
      const distance = Math.random();
  
      if (distance > .7) {
        ctx.filter = 'blur(1px)';
      } else if (distance > .4) {
        ctx.filter = 'blur(.75px)';
      } else {
        ctx.filter = 'blur(.5px)';
      }
  
      ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${1 - distance * 2 / 10 })`;
      ctx.beginPath();
      ctx.arc(values.x, values.y, size, 0, 2 * Math.PI);
      ctx.fill();
    }
  }
  return (
    <div class="cent">
      <div class="card">
        <div class="additional">
          <div class="user-card">
            <div class="level cent" style={{fontFamily: 'Gamefont'}}>
              Level 1
            </div>
            <button class="points cent" onClick={handleLogoutClick} style={{fontFamily: 'Gamefont'}}>
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
          <div class="more-info" style={{fontFamily: 'Gamefont'}}>
            <h1>{userhandle}</h1>
            <div class="stats">
              <div>
                <div class="title" style={{fontFamily: 'Gamefont'}}>Wins</div>
                <i class="fa fa-trophy"></i>
                <div class="value" style={{fontFamily: 'Gamefont'}}>2</div>
              </div>
              <div>
                <div class="title" style={{fontFamily: 'Gamefont'}}>Matches</div>
                <i class="fa fa-gamepad"></i>
                <div class="value" style={{fontFamily: 'Gamefont'}}>27</div>
              </div>
            </div>
          </div>
        </div>
        <div class="general" style={{fontFamily: 'Gamefont'}}>
          <h1>{userhandle}</h1>
          <span>How to Play</span>
          <span class="more">Hover...</span>
        </div>
      </div>
      <div class="a">
        <div class="a-eye"></div>
      </div>
      <button className="profile-play" onClick={handlePlayClick} style={{ display: 'block', fontFamily: 'ButtonFont'  }}>
        Play
      </button> 
      <button className="buy-hint" style={{ display: 'block', fontFamily: 'ButtonFont'  }}>
        Buy Hint
      </button> 
    </div>


  );
}
export default Profile