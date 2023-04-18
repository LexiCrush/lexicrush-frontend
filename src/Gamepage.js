import React from "react";
import { Navigate } from "react-router-dom";
import "./Gamepage.css"


function Gamepage() {
  const [goToShortest, setGoToShortest] = React.useState(false);
  const [goToLongest, setGoToLongest] = React.useState(false);

  function handleShortestClick() {
    setGoToShortest(true);
  }
  function handleLongestClick() {
    setGoToLongest(true);
  }


  if (goToShortest) {
    return <Navigate to="/shortest" />;
  }

  if (goToLongest) {
    return <Navigate to="/TestApi" />;
  }

  return (
    <body>
    <div class="container">
      <div class="stars"></div>
      <div class="planet">
        <div class="shadow"></div>
      </div>
      <div class="astronaut">
        <div class="tank center"></div>
        <div class="suit center">
          <div class="helmet center"></div>
          <div class="buttons center"></div>
          <div class="hand-l"></div>
          <div class="hand-r"></div>
          <div class="leg-l"></div>
          <div class="leg-r"></div>
          <div class="pipe"></div>
        </div>
      </div>
    </div>
    {/* <button className="rounded" onClick={handleShortestClick} style={{ display: 'block', marginBottom: '10px', fontFamily: 'ButtonFont' }}>
      Shortest Word Mode
    </button> */}
    <button className="rounded-button" onClick={handleLongestClick} style={{ display: 'block', fontFamily: 'ButtonFont'}}>
      Longest Word Mode
    </button>
    
  </body>
  );
}

export default Gamepage;
