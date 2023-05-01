import React from 'react';
import './Auth.css';
import { Navigate } from "react-router-dom";

function Auth() {

  const [goToGame, setGoToGame] = React.useState(false);
  if (goToGame) {
      return <Navigate to="/gamepage" />;
  }

  return (
    <div className="main">
      <input type="checkbox" id="chk" aria-hidden="true" />

      <div className="signup">
        <form>
          <label htmlFor="chk" aria-hidden="true">
            Sign up
          </label>
          <input type="text" name="txt" placeholder="User name" required="" class="my-input"/>
          <input type="email" name="email" placeholder="Email" required="" class="my-input"/>
          <input type="password" name="pswd" placeholder="Password" required="" class="my-input"/>
          <button className='sign-button'>Sign up</button>
        </form>
      </div>

      <div className="log">
        <form>
          <label htmlFor="chk" aria-hidden="true">
            Login
          </label>
          <input type="email" name="email" placeholder="Email" required="" class="my-input"/>
          <input type="password" name="pswd" placeholder="Password" required="" class="my-input"/>
          <button className='sign-button' onClick={() => {setGoToGame(true)}}>Login</button>
        </form>
      </div>
    </div>
    
  );
}

export default Auth;