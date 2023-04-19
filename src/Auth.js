/*https://supertokens.com/blog/building-a-login-screen-with-react-and-bootstrap*/
import React, { useState } from "react"
import { Navigate } from "react-router-dom";

export default function (props) {
    let [authMode, setAuthMode] = useState("signin")
  
    const changeAuthMode = () => {
      setAuthMode(authMode === "signin" ? "signup" : "signin")
    }

    const [goToGame, setGoToGame] = React.useState(false);
    if (goToGame) {
        return <Navigate to="/gamepage" />;
    }
    
    if (authMode === "signin") {
      return (
        <div className="Auth-form-container">
          <form className="Auth-form" >
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Login to LexiCrush</h3>
              <div className="text-center" style={{ color: "black", fontSize: "18px"}}>
               Type in anything. {" "}
                <span className="link-primary" onClick={changeAuthMode}>
                  Click Submit
                </span>
              </div>
              <div className="form-group mt-3">
                <label>Username</label>
                <input
                  type="username"
                  className="form-control mt-1"
                  placeholder="Enter username"
                />
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control mt-1"
                  placeholder="Enter password"
                />
              </div>
              <div className="d-grid gap-2 mt-3">
                <button onClick={() => {setGoToGame(true)}} type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
              <p className="text-center mt-2" style={{ color: "black", fontSize: "18px"}}>
                Forgot <a href="#">password?</a>
              </p>
            </div>
          </form>
        </div>
      )
    }

  
    return (
      <div className="Auth-form-container">
        {/*<h1 style={headingStyle}>LexiCrush</h1>*/}
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center" style={{ color: "black", fontSize: "18px"}}>
              Already registered?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign In
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Username</label>
              <input
                type="username"
                className="form-control mt-1"
                placeholder="Username"
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Password"
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <p className="text-center mt-2" style={{ color: "black", fontSize: "18px"}}>
              Forgot <a href="#">password?</a>
            </p>
          </div>
        </form>
      </div>
    )
  }