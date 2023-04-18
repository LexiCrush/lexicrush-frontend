import React from "react";
import Timer from "./Timer";
import WordInput from "./WordInput";
import Hint from "./Hint";

function Longest() {
  const timerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '50px',
  };

  const headingStyle = {
    marginTop: '0px',
    fontFamily: 'Lucida Handwriting, cursive',
    fontSize: '25px',
    fontWeight: 'bold',
    color: '#333',
    };

    const roundStyle = {
    marginTop: '0px',
    fontFamily: 'Lucida Handwriting, cursive',
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333',
    };

  return (
    <div>
      <h1 style={headingStyle}>Longest Game Mode</h1>
      <h2 style={roundStyle}>Round #</h2>
      <Timer />
      <WordInput />
      <Hint />
    </div>
  );
}

export default Longest;
