import React, { useState, useEffect } from 'react';
import "./Longest.css";
import { Navigate } from "react-router-dom";
import axios from 'axios';

function Longest() {
  const accessToken = localStorage.getItem('token');
  const [goBack, setGoBack] = React.useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(() => {
    const storedQuestion = localStorage.getItem('currentQuestion');
    return storedQuestion !== null ? storedQuestion : '';
  });
  const [points, setPoints] = useState(0);
  const [roundResult, setRoundResult] = useState('');
  const [botAnswer, setBotAnswer] = useState(''); 
  const [hint, setHint] = useState('');
  const [currentAnswer, setAnswer] = useState('');
  const [helloVisible, setHelloVisible] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [hintVisible, setHintVisible] = useState(false);
  const [remainingTime, setRemainingTime] = useState(10);
  const [restart, setRestart] = useState(false);

  const token = localStorage.getItem('token');
  const username = token.split('|')[0];
  const userhandle = "@" + username;
  // const URL = 'http://lexicrush.zyns.com';


  const [round, setRound] = useState(() => {
    const storedRound = localStorage.getItem('round');
    return storedRound !== null ? parseInt(storedRound) : 1;
  });

  useEffect(() => {
    localStorage.setItem('round', round);
  }, [round]);


  function handleTimeOver() {

    if (round === 5) {
      setRound(1)
      setHelloVisible(false); // hide the answer
      setHintVisible(false); // hide the hint
      setCurrentQuestion(''); // clear the current question
      setPoints(0); // reset the points
      setRemainingTime(10); // reset the timer
    } else {
      setRound(round + 1); // increase the round
      setRemainingTime(10); // reset the timer
      setCurrentQuestion(''); // clear the current question
      setPoints(0); // reset the points
    }
  }

  useEffect(() => { // get a new question
    if (currentQuestion === '') {
      axios.get('http://localhost:8080/api/getq')
        .then(response => {
          setCurrentQuestion(response.data);
          localStorage.setItem('currentQuestion', response.data);
        })
        .catch(error => console.error(error));
    }
  }, [round]);

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

  // const handleScoring = (e) => {
  //   e.preventDefault();
  //   console.log('Player Answer:', currentAnswer);
  //   console.log('Bots Answer:', botAnswer);

  //   axios.post('http://localhost:8080/api/updatescore', {
  //     playerAnswer: currentAnswer,
  //     botAnswer: botAnswer
  //   }, {
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //       'Access-Token': accessToken
  //     }
  //   })
  //     .then(response => { console.log(response); setRoundResult(response.data); })
  //     .catch(error => console.error(error));
  // }


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
        <div className="timer-container">
          <Time key={remainingTime} initialTime={10} onTimeOver={handleTimeOver} />
        </div>
      </div>
      <div className="rectangle-left">
        <h1 class="player-name">{username}</h1>
        <button className="arrow circle left" onClick={handleGoBackClick}></button>

        <button onClick={() => { setHintVisible(true) }} className="hint-button" style={{ display: 'block', marginBottom: '10px', fontFamily: 'ButtonFont' }}>
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
        {/* // displays current Q */}
        <div>
          {helloVisible &&
            <div className="xanswer">
              {points === 0 ? "Sorry, " + currentAnswer + " is NOT a valid answer!" : "Correct " + currentAnswer + " is worth " + points + " points"}
            </div>
          }
          {botAnswer &&
            <div className="botAnswer" style={{ color: "white", fontFamily: "aom" }}>
              {"@BOT123 Chose: " + botAnswer}
            </div>

          }
        </div>
      </div>
      <p>
        <span className="xx">
          <input type="text" placeholder="Enter" onKeyDown={handleKeyDown} onChange={handleChange} on />
          <span class="my-span"></span>
        </span>
      </p>
      <div class="scene" style={{ zIndex: "-1" }}>
        <div class="space" style={{ zIndex: "-1" }} >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div>{round}</div>
      {/* <button>Restart Game</button> */}
    </div>
  );
}

function Time(props) {
  const { initialTime, onTimeOver } = props;
  const [timeLeft, setTimeLeft] = useState(
    localStorage.getItem("timeLeft") || initialTime
  );
  const [timerId, setTimerId] = useState(null);

  const startTimer = () => {
    const newTimerId = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
      localStorage.setItem("timeLeft", timeLeft - 1);
    }, 1000);
    setTimerId(newTimerId);
  };

  const stopTimer = () => {
    clearTimeout(timerId);
  };

  const restartTimer = () => {
    setTimeLeft(initialTime);
    localStorage.removeItem("timeLeft");
  };

  useEffect(() => {
    if (timeLeft === 0) {
      onTimeOver();
      restartTimer();
      return;
    }

    startTimer();

    return () => stopTimer();
  }, [timeLeft, onTimeOver, initialTime]);

  return (
    <div>
      <div>{timeLeft}</div>
      <button onClick={stopTimer}>Stop</button>
      <button onClick={restartTimer}>Restart</button>
    </div>
  );
}

export default Longest;

