import React, { useState, useEffect } from 'react';
import "./Longest.css";
import { Navigate } from "react-router-dom";
import axios from 'axios';
import Timer from "./Timer"


function Longest() {
  const [goBack, setGoBack] = React.useState(false);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [points, setPoints] = useState(0);
  const [botAnswer, setBotAnswer] = useState(''); // [botAnswer, setBotAnswer
  const [hint, setHint] = useState('');
  const [currentAnswer, setAnswer] = useState('');
  const [helloVisible, setHelloVisible] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [hintVisible, setHintVisible] = useState(false);
  
  useEffect(() => { // get a new question
      axios.get('http://localhost:8080/api/getq')
        .then(response => {
          setCurrentQuestion(response.data);
        })
        .catch(error => console.error(error));

  }, []);

  useEffect(() => { // if the user gets the answer correct, the bot will respond
    if (points > 0) {
      axios.get('http://localhost:8080/api/bot', {
      params: {
        question: currentQuestion
      }
    }, {
    })
        .then(response => {
          setBotAnswer(response.data);
          console.log('Bot Answer:', botAnswer);
          // setTimeout(() => {
          //   window.location.reload();
          // }, 2000);
        })
        .catch(error => console.error(error));
    }
  }, [points]);


  useEffect(() => { // retrieve a hint
    axios.get('http://localhost:8080/api/hint', {
      params: {
        question: currentQuestion
      }
    }, {
    })
        .then(response => {
          setHint(response.data);
          console.log('Hint:', hint);
        })
        .catch(error => console.error(error));
  }, [currentQuestion]);


  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Question:', currentQuestion);
    console.log('User Submitted:', currentAnswer);

    axios.post('http://localhost:8080/api/checkans', {
      question: currentQuestion,
      answer: currentAnswer
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
      .then(response => { console.log(response); setPoints(response.data); })
      .catch(error => console.error(error));
  }

  const handleChange = (e) => {
    setAnswer(e.target.value); // this is the text in the input field
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) { // Enter key
      setUserInput(currentAnswer);
      handleSubmit(e);
      console.log('Submitted:', currentAnswer);
      // console.log('Points received by API:', points);
      setHelloVisible(true);
      setBotAnswer(botAnswer); // add this line
    }
  }

  function handleGoBackClick() {
    setGoBack(true);
  }

  if (goBack) {
    return <Navigate to="/gamepage" />;
  }


  return (

  <div id="loading-indicators">
    <div className="loading-indicator" id="loading-indicator__1">
    </div>
    <div className="square">
    <div class="av">
      <div class="av-eye"></div>
    </div>
    <div className='timer-container'>
      <Timer> </Timer>
    </div>
    </div>
    <div className="rectangle-left">
      <h1 class="player-name">Username</h1>
      <button className="arrow circle left" onClick={handleGoBackClick}></button>

      <button onClick={() => {setHintVisible(true)}} className="hint-button" style={{ display: 'block', marginBottom : '10px', fontFamily: 'ButtonFont'}}>  
      {hint}
    </button>
    </div>
    <div className="rectangle-right">
      <h1 class="bot-name">Bot</h1>
    </div>
    <div className="squarebot">
      <div class="avbot">
      <div class="avbot-eye"></div>
    </div>
    </div>
    <div className="question-position">{currentQuestion}
    <div>
    {helloVisible &&
        <div className="xanswer">
          {points === 0 ? "SORRY! That is not in our database." : "CORRECT! " + points + " Points awarded."}
        </div>
    }  
    {botAnswer && 
        <div className="botAnswer" style={{color: "white", fontFamily: "aom" }}>
          {"@BOT123 Chose: " + botAnswer}
        </div>
    }
     </div>
    </div>
    <p>
      <span className="xx">
        <input type="text" placeholder="Enter" onKeyDown={handleKeyDown} onChange={handleChange}/>
        <span class="glow-span"></span>
        </span>
    </p>
    <div class="scene" style={{ zIndex: "-1" }}>
      <div class="space" style={{ zIndex: "-1" }} >
        <span></span>
        <span></span>
        <span></span>
        </div>
        </div> 
  
  </div>
  );
}

export default Longest;

