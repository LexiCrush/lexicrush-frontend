import React, { useState, useEffect } from 'react';
import "./Longest.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { set } from 'animejs';

function Longest() {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('token') || 'null | 0';
  const username = accessToken.split('|')[0] || 'null | 0';

  // Game status
  const [round, setRound] = useState(1);
  const [roundResult, setRoundResult] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [currentScore, setCurrentScore] = React.useState(0);
  const [remainingTime, setRemainingTime] = useState(10);

  // Answers
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [botAnswer, setBotAnswer] = useState('');
  const [helloVisible, setHelloVisible] = useState(false);

  // Hint status
  const [hintVisible, setHintVisible] = useState(false);
  const [buyHint, setBuyHint] = useState(false);

  // Pending status
  const [pending, setPending] = useState(false);
  const [refreshScore, setRefreshScore] = useState(false);
  const [answerIsCorrect, setAnswerIsCorrect] = useState('unknown');

  //gameover message is stored in local storage. set it to empty string
  localStorage.setItem('gameoverMessage', '');


  function handleTimeOver() {
    if (round === 5) {
      setAnswerIsCorrect(false);
      handleEndGame();
      // navigate('/gameover');
    } else {
      setRound(round + 1); // increase the round
      setCurrentAnswer("");
      setAnswerIsCorrect(false);
      setPending(false);
      setRemainingTime(10); // reset the timer
      setBotAnswer(''); // clear the bot answer
      setRoundResult(''); // clear the round result
      setHelloVisible(false);
    }
  }

  useEffect(() => { // get a new question
    axios.get('http://localhost:8080/api/getq')
      .then(response => {
        console.log('Current Question:', currentQuestion);
        setCurrentQuestion(response.data);
      })
      .catch(error => console.error(error));
  }, [round]);

  useEffect(() => {
    if (answerIsCorrect === false) {

      axios.post('http://localhost:8080/api/checkans', {
        question: currentQuestion,
        answer: currentAnswer,
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      })
        .then(response => {
          console.log(response);
          if (response.data >= 1) {
            setAnswerIsCorrect(true);
          } else {
            setAnswerIsCorrect(false);
            setPending(false);
          }
        })

        .catch(error => {
          console.error(error);
        });
    }
  }, [pending])


  // Get bot answer when enter is pressed and checkans says the answer is correct
  useEffect(() => {
    if (pending && botAnswer.length === 0 && answerIsCorrect === true) {
      axios.get('http://localhost:8080/api/bot', {
        params: {
          question: currentQuestion
        }
      }, {
      })
        .then(response => {
          setBotAnswer(response.data);
          console.log('Bot Answer:', botAnswer);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [answerIsCorrect])


  // Handle scoring when bot answer is retreived
  useEffect(() => {
    console.log('currentAnswer:', currentAnswer);
    console.log('botAnswer:', botAnswer);


    if (currentAnswer.length > 0 && botAnswer.length > 0) {
      axios.post('http://localhost:8080/api/updateCurrentScore', {
        playerAnswer: currentAnswer,
        botAnswer: botAnswer,
        question: currentQuestion
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Access-Token': accessToken,
        }
      })
        .then(response => {
          console.log(response);
          setRoundResult(response.data);
          setRefreshScore(true);
        })
        .catch(error => {
          setRefreshScore(false);
          console.error(error)
        });
    }
  }, [pending, botAnswer, answerIsCorrect])

  // Fetch the updated current score from backend
  useEffect(() => {
    if (refreshScore) {
      axios.get('http://localhost:8080/api/getCurrentScore', {
        headers: {
          'Access-Token': accessToken,
        }
      })
        .then(response => {
          setCurrentScore(response.data);
          setRefreshScore(false);
          setHelloVisible(true);
          setPending(false);
        })
        .catch(error => console.error(error));

    }
  }, [refreshScore])

  const handleAnswerChange = (e) => {
    setCurrentAnswer(e.target.value); // this is the text in the input field
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) { // Enter key
      e.preventDefault(); // prevent the default action (submitting the form) when pressing enter key in input field
      setPending(true);
    }
  }

  const handleEndGame = () => {

    axios.post('http://localhost:8080/api/endGame', {
    }, {
      headers: {
        'Access-Token': accessToken
      }
    })
      .then(response => {
        console.log(response);
        localStorage.setItem('gameoverMessage', response.data);
        navigate('/gameover')
      })
      .catch(error => console.error(error));
  }

  // Check if user is logged in
  if (accessToken === 'null | 0') { // if user is not logged in
    navigate('/login');
  }

  else { // if a user is properly logged in
    const tokenTime = accessToken.split('|')[1];
    const currentTime = new Date().getTime();

    if (currentTime - tokenTime > 1000 * 60 * 60 * 2) { // if token is older than 2 hours
      alert('Your session has expired. Please log in again.'); // alert user
      localStorage.removeItem('token'); // remove token from local storage
      navigate("/auth"); // redirect to login page
    }
  }



  return (
    <div id="loading-indicators">
      <div className="loading-indicator" id="loading-indicator__1">
      </div>
      <div className="square">
        <div class="av">
          <div class="av-eye"></div>
        </div>
        <div className="timer-container" style={{ position: 'relative', top: 15, right: -340 }}>
          <Time key={remainingTime} initialTime={10} onTimeOver={handleTimeOver} />
        </div>
        <div className='round-container' style={{ fontFamily: "Gamefont" }}>
          {"Round " + round}
        </div>
      </div>
      <div className="rectangle-left">
        <h1 class="player-name" style={{ fontFamily: "Gamefont" }} >{username}</h1>
        <button onClick={() => { setHintVisible(true)}} className="hint-button" style={{ display: 'block', marginBottom: '10px', fontFamily: 'ButtonFont' }}>
          {"Hint"}
        </button>
        <button onClick={() => { handleEndGame() }} className="exit-button" style={{ display: 'block', marginBottom: '10px', fontFamily: 'ButtonFont' }}>
          Exit
        </button>
        <div id="saturn">
          <div class="plan bottom plan-bg"></div>
          <div class="rings"></div>
          <div class="plan top plan-bg"></div>
        </div>
        <div class="score-position" style={{ fontFamily: "Gamefont" }}>{currentScore}</div>
      </div>
      <div className="rectangle-right">
        <h1 class="bot-name" style={{ fontFamily: "Gamefont" }}>Bot</h1>
      </div>
      <div className="squarebot">
        <div class="avbot">
          <div class="avbot-eye"></div>
        </div>
      </div>
      <div className="question-position" style={{ fontFamily: "Gamefont" }}>{currentQuestion}
        {/* // displays current Q */}
        <div>
          {helloVisible &&
            <div className="xanswer" style={{ fontFamily: "Gamefont" }}>
              {roundResult + "current score is: " + currentScore}
            </div>
          }
          {botAnswer &&
            <div className="botAnswer" style={{ color: "white", fontFamily: "Gamefont" }}>
              {"@BOT123 Chose: " + botAnswer}
            </div>

          }

        </div>
      </div>
      <p>
        <span className="xx"> {/* user text input box */}
          <input type="text" value={currentAnswer} placeholder="Enter" onKeyDown={handleKeyDown} onChange={handleAnswerChange} />
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
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [timerId, setTimerId] = useState(null);

  const startTimer = () => {
    const newTimerId = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    setTimerId(newTimerId);
  };

  const stopTimer = () => {
    clearTimeout(timerId);
  };

  const restartTimer = () => {
    setTimeLeft(initialTime);
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
