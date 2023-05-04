import React from 'react';
import './Auth.css';
import { Navigate } from "react-router-dom";
import axios from 'axios';

function Auth() {
  // if there is a token in local storage, redirect to gamepage
  const accessToken = localStorage.getItem('token');
  const [goBack, setGoBack] = React.useState(false);
  const [goToGame, setGoToGame] = React.useState(false);

  if (accessToken) {
    return <Navigate to="/gamepage" />; // redirect to gamepage if already logged in
  }


  if (goBack) {
    return <Navigate to="/profile" />;
  }

  const handleRegister = (evt) => {
    evt.preventDefault();
    const username = evt.target.username.value;
    const password = evt.target.password.value;

    // Check if username is at least 5 chars long
    if (username.length < 5) {
        alert('Username must be at least 5 characters long');
        return;
    }

    if (username.length > 12) {
      alert('Username can not be longer than 12 characters');
      return;
  }

    if (password.length < 5) {
      alert('Password must be at least 5 characters long');
      return;
  }

    axios.post('http://localhost:8080/auth/register', {
      username: username,
      password: password,
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then((response) => {
        const username = response.data;
        if(username){
            alert(`Success! ${username} has been registered with Lexicrush`);
            document.getElementById("chk").checked = true;
        } else {
            alert(`An account with that username already exists`);
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

    axios.post('http://localhost:8080/auth/login', {
      username: username,
      password: password,
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then((response) => {
        const token = response.data;
        if(token.includes("|")){
            localStorage.setItem('token', token);
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