import React from 'react';
import './Auth.css';
import { Navigate } from "react-router-dom";
import axios from 'axios';
import { set } from 'animejs';

function Auth() {
  // SERVER IP
  // const URL = 'http://localhost:8080';
  const URL = 'http://157.230.61.120:8080';

  // if there is a token in local storage, redirect to gamepage
  const accessToken = localStorage.getItem('token');
  const [goToGame, setGoToGame] = React.useState(false);
  const [tokenTime, setTokenTime] = React.useState(0);
  const [currentTime, setCurrentTime] = React.useState(0);


  if (accessToken) {
    
    if (accessToken.split('|')[1] - Date.now() > 1000 * 60 * 60 * 2) { // if token is older than 2 hours
      localStorage.removeItem('token'); // remove token from local storage
      alert('Your session has expired. Please log in again.'); // alert user
      return <Navigate to="/auth" />; // redirect to login page

    } else {

      console.log("Token is still valid: " + accessToken);
      return <Navigate to="/profile" />; // redirect to gamepage if already logged in
    }
  }

  // if (goBack) {
  //   return <Navigate to="/profile" />;
  // }

  const handleRegister = (evt) => {
    evt.preventDefault();
    const username = evt.target.username.value;
    const password = evt.target.password.value;

    // Check if username is at least 5 chars long
    if (username.length < 5) {
      alert('Username must be at least 5 characters long');
      return;
    }

    if (username.length > 14) {
      alert('Username can not be longer than 14 characters');
      return;
    }

    if (password.length < 5) {
      alert('Password must be at least 5 characters long');
      return;
    }

    axios.post(URL + '/auth/register', {
      username: username,
      password: password,
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then((response) => {
        if (response.data) {
          alert(`Success! ${response.data} has been registered with Lexicrush`);
          document.getElementById("chk").checked = true;
        } else {
          alert(`An account with that username already exists`);
          document.getElementById("chk").checked = true;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleLogin = (evt) => {
    evt.preventDefault();
    const username = evt.target.username.value;
    const password = evt.target.password.value;

    axios.post(URL + '/auth/login', {
      username: username,
      password: password,
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then((response) => {
        if (response.data.includes("|")) {
          localStorage.setItem('token', response.data);
          alert(`Login successful!`);
          setGoToGame(true);
        } else {
          alert(`Invalid username or password`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="main">
      <input type="checkbox" id="chk" aria-hidden="true" />

      <div className="signup">
        <form onSubmit={handleRegister}>
          <label htmlFor="chk" aria-hidden="true">
            Register
          </label>
          <input type="text" name="username" placeholder="Username" required="" class="my-input" />
          <input type="password" name="password" placeholder="Password" required="" class="my-input" />
          <button className='sign-button'>Sign up</button>
        </form>
      </div>

      <div className="log">
        <form onSubmit={handleLogin}>
          <label htmlFor="chk" aria-hidden="true">
            Login
          </label>
          <input type="text" name="username" placeholder="Username" required="" class="my-input" />
          <input type="password" name="password" placeholder="Password" required="" class="my-input" />
          <button className='sign-button'>Login</button>
        </form>
      </div>
    </div>

  );
}

export default Auth;