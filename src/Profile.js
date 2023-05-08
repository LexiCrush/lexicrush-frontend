import React, { useEffect } from 'react';
import { Navigate } from "react-router-dom";
import './Profile.css';
import axios from 'axios';
import { set } from 'animejs';

function Profile() {
  // SERVER IP
  // const URL = 'http://localhost:8080';
  const URL = 'http://157.230.61.120:8080';

  // token is from local storage or if not there, null
  const token = localStorage.getItem('token') || 'null | 0';
  const username = token.split('|')[0] || 'null | 0';
  const userhandle = "Hey, " + username + "!" || 'null | 0';

  const [goToPlay, setGoToPlay] = React.useState(false);
  const [Logout, setLogout] = React.useState(false);
  const [HighScore, setHighScore] = React.useState(null);
  const [NumGamesPlayed, setNumGamesPlayed] = React.useState(null);
  const [AvailibleHints, setAvailibleHints] = React.useState(null);
  const [AvailibleCoins, setAvailibleCoins] = React.useState(null);
  const [HintRequested, setHintRequested] = React.useState(false);
  const [refreshHintCoinEq, setRefreshHintCoinEq] = React.useState(false);


  // Fetch the updated current score from backend
  useEffect(() => {
    if (token === 'null | 0') {
      setHighScore('Login/Register to Play!');
    }
    console.log('Get updated score: ' + token);
    axios.get(URL + '/api/getHighScore', {
      headers: {
        'Access-Token': token,
      }
    })
      .then(response => {
        setHighScore(response.data);
      })
      .catch(error => console.error(error));
  }, [])

  useEffect(() => {
    if (token === 'null | 0') {
      setHighScore('Login/Register to Play!');
    }
    console.log('Get updated score: ' + token);
    axios.get(URL + '/api/getNumGames', {
      headers: {
        'Access-Token': token,
      }
    })
      .then(response => {
        setNumGamesPlayed(response.data);
      })
      .catch(error => console.error(error));
  }, [])




  useEffect(() => {
    axios.get(URL + '/api/getHintCount', {
      headers: {
        'Access-Token': token,
      }
    })
      .then(response => {
        setAvailibleHints(response.data);
        setRefreshHintCoinEq(false);
      })
      .catch(error => console.error(error));
  }, [refreshHintCoinEq])


  useEffect(() => {
    axios.get(URL + '/api/getCoinCount', {
      headers: {
        'Access-Token': token,
      }
    })
      .then(response => {
        setAvailibleCoins(response.data);
        setRefreshHintCoinEq(false);
      })
      .catch(error => console.error(error));
  }, [refreshHintCoinEq])

  // post to /buyHint 
  useEffect(() => {
    if (HintRequested) {
      if (AvailibleCoins < 10) {
        alert("You don't have enough coins left to buy a hint :(");
        setHintRequested(false);
        return;
      }
      axios.post(URL + '/api/buyHint', {}, {
        headers: {
          'Access-Token': token,
        }
      })
        .then(response => {
          setRefreshHintCoinEq(true);
          setHintRequested(false);
        })
        .catch(error => console.error(error));
    }
  }, [HintRequested])

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

  function handleHintTransaction() {
    setHintRequested(true);
  }



  return (
    <div class="cent">
      <div class="card">
        <div class="additional">
          <div class="user-card">
            <button class="points cent" onClick={handleHintTransaction} style={{ fontFamily: 'Gamefont' }}>
              Buy Hint
            </button>
            <button class="level cent" onClick={handleLogoutClick} style={{ fontFamily: 'Gamefont' }}>
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
                <div class="title" style={{ fontFamily: 'Gamefont' }}>Hints</div>
                <i class="fa fa-gamepad"></i>
                <div class="value" style={{ fontFamily: 'Gamefont' }}>{AvailibleHints}</div>
              </div>
              <div>
                <div class="title" style={{ fontFamily: 'Gamefont' }}>High Score</div>
                <i class="fa fa-trophy"></i>
                <div class="value" style={{ fontFamily: 'Gamefont' }}>{HighScore}</div>
              </div>
              <div>
                <div class="title" style={{ fontFamily: 'Gamefont' }}>Coins</div>
                <i class="fa fa-gamepad"></i>
                <div class="value" style={{ fontFamily: 'Gamefont' }}>{AvailibleCoins}</div>
              </div>
              <div>
                <div class="title" style={{ fontFamily: 'Gamefont' }}># of Games</div>
                <i class="fa fa-gamepad"></i>
                <div class="value" style={{ fontFamily: 'Gamefont' }}>{NumGamesPlayed}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="general" style={{ fontFamily: 'Gamefont', margin: '0 auto', textAlign: 'justify' }}>
          <h1>{userhandle}</h1>
          <br></br>
          <p> Welcome to Lexicrush, a timed word guessing game with a twist...</p>
          <br></br>
          <p> Begins/Ends with letter mode: Choose a valid answer with as MANY letters as possible.</p>
          <br></br>
          <p> Win 1 coin for every letter you beat your opponent by. Buy hints for 10 coins each!</p>
          <br></br>
        </div>
      </div>
      <div class="a">
        <div class="a-eye"></div>
      </div>
      <button className="profile-play" onClick={handlePlayClick} style={{ display: 'block', fontFamily: 'ButtonFont' }}>
        Play
      </button>
    </div>


  );
}
export default Profile