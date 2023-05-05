import React, { useState, useEffect } from 'react';
import "./Longest.css";
import { Navigate } from "react-router-dom";
import axios from 'axios';
import { set } from 'animejs';

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
  const [goExit, setExit] = React.useState(false);
  const [currentScore, setCurrentScore] = React.useState(0);
  const [endGame, setEndGame] = React.useState(false);
  const [text, setText] = useState("");

  const token = localStorage.getItem('token');
  const username = accessToken.split('|')[0];
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
      setBotAnswer(''); // clear the bot answer
      setRoundResult(''); // clear the round result
      setGoBack(true);
    } else {
      setRound(round + 1); // increase the round
      setRemainingTime(10); // reset the timer
      setCurrentQuestion(''); // clear the current question
      setBotAnswer(''); // clear the bot answer
      setRoundResult(''); // clear the round result
      setHelloVisible('')
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

  const handleChange = (e) => {
    setAnswer(e.target.value); // this is the text in the input field
    setText(e.target.value);

  }

  // useEffect(() => { // if the user gets the answer correct, the bot will respond
  //   if (points > 0) {
  //     axios.get('http://localhost:8080/api/bot', {
  //       params: {
  //         question: currentQuestion
  //       }
  //     }, {
  //     })
  //       .then(response => {
  //         setBotAnswer(response.data);
  //         console.log('Bot Answer:', botAnswer);
  //         // setTimeout(() => {
  //         //   window.location.reload();
  //         // }, 2000);
  //       })
  //       .catch(error => console.error(error));
  //   }
  // }, [points]);

  const getBotAns = () => { // get the bot answer
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


  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('Question:', currentQuestion);
  //   console.log('User Submitted:', currentAnswer);

  //   axios.post('http://localhost:8080/api/checkans', {
  //     question: currentQuestion,
  //     answer: currentAnswer
  //   }, {
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded'
  //     }
  //   })
  //     .then(response => { console.log(response); setPoints(response.data); })
  //     .catch(error => console.error(error));
  // }

  const handleScoring = (e) => {
    e.preventDefault();
    console.log('Player Answer:', currentAnswer);
    console.log('Bots Answer:', botAnswer);

    axios.post('http://localhost:8080/api/updateCurrentScore', {
      playerAnswer: currentAnswer,
      botAnswer: botAnswer,
      question: currentQuestion
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Token': accessToken,
        // 'Access-Control-Allow-Origin': '*', // allow CORS
        // 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        // 'Access-Control-Allow-Origin': 'http://localhost:3000',
        // 'Access-Control-Allow-Credentials': 'true'
      }
    })
      .then(response => { console.log(response); setRoundResult(response.data); })
      .catch(error => console.error(error));
      // if roundResult is not "Invalid access token"
      // then get the current score
      // if (roundResult !== "Invalid access token") {
      //   getBotAns();
      // }

    // axios.get('http://localhost:8080/api/getCurrentScore', {
    //   headers: {
    //     'Access-Token': accessToken
    //   }
    // })
    //   .then(response => { console.log(response); setCurrentScore(response.data); })
    //   .catch(error => console.error(error));

    // console.log('Current Score:', currentScore);
  }


  const getCurrentScore = () => {
    axios.get('http://localhost:8080/api/getCurrentScore',{
      headers: {
        'Access-Token': accessToken,
      }
    })
      .then(response => { console.log(response); setCurrentScore(response.data); })
      .catch(error => console.error(error));

    console.log('Current Score:', currentScore);
  }


  const handleKeyDown = (e) => {
    if (e.keyCode === 13) { // Enter key
      e.preventDefault(); // prevent the default action (submitting the form) when pressing enter key in input field
      setUserInput(currentAnswer);
      getBotAns();
      handleScoring(e);
      getCurrentScore();
      setHelloVisible(true);
      console.log('Submitted:', currentAnswer);
      setText("")
    }
  }

  const handleEndGame = () => {
    console.log('End Game');
    console.log('accessToken:', accessToken);

    axios.post('http://localhost:8080/api/endGame', {
    }, {
      headers: {
        'Access-Token': accessToken
      }
    })
      .then(response => { console.log(response); setEndGame(response.data); })
      .catch(error => console.error(error));
  }

  if (goBack) {
    handleEndGame();
    return <Navigate to="/test" />;
  }

  // if (points > 0) {
  //   handleScoring();
  //   getCurrentScore();
  // }

  function handlegoExit() {
    setExit(true);
  }

  if (goExit) {
    handleEndGame();
    return <Navigate to="/profile" />;
  }

  // if (accessToken) {

  //   const tokenTime = accessToken.split('|')[1];
  //   const currentTime = new Date().getTime();

  //   if (currentTime - tokenTime > 1000 * 60 * 60 * 2) { // if token is older than 2 hours
  //     localStorage.removeItem('token'); // remove token from local storage
  //     alert('Your session has expired. Please log in again.'); // alert user
  //     return <Navigate to="/auth" />; // redirect to login page

  //   } 
  // }


  return (
    <div id="loading-indicators">
      <div className="loading-indicator" id="loading-indicator__1">
      </div>
      <div className="square">
        <div class="av">
          <div class="av-eye"></div>
        </div>
        <div className="timer-container" style={{ position: 'relative', top: 15, right: -340 }}>
          <Time key={remainingTime} initialTime={8} onTimeOver={handleTimeOver} />
        </div>
        <div className='round-container'>
          {"Round " + round}
        </div>
      </div>
      <div className="rectangle-left">
        <h1 class="player-name">{username}</h1>
        <button onClick={() => { setHintVisible(true) }} className="hint-button" style={{ display: 'block', marginBottom: '10px', fontFamily: 'ButtonFont' }}>
          {hint}
        </button>
        <button onClick={() => { handlegoExit(true) }} className="exit-button" style={{ display: 'block', marginBottom: '10px', fontFamily: 'ButtonFont' }}>
          Exit
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
              {roundResult + "current score is: " + currentScore}
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
        <span className="xx"> {/* user text input box */}
          <input type="text" value={text} placeholder="Enter" onKeyDown={handleKeyDown} onChange={handleChange} />
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

