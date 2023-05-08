import React, { useState, useEffect } from 'react';
import "./Longest.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Longest() {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('token') || 'null | 0';
  const username = accessToken.split('|')[0] || 'null | 0';

  // Game status
  const [round, setRound] = useState(1);
  const [roundResult, setRoundResult] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(() => {
    const storedQuestion = localStorage.getItem('currentQuestion');
    return storedQuestion !== null ? storedQuestion : '';
  });
  const [currentScore, setCurrentScore] = React.useState(0);
  const [remainingTime, setRemainingTime] = useState(10);

  // Answers
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [botAnswer, setBotAnswer] = useState('');
  const [helloVisible, setHelloVisible] = useState(false);

  // Pending status
  const [pending, setPending] = useState(false);
  const [refreshScore, setRefreshScore] = useState(false);
  const [answersIsCorrect, setAnswersIsCorrect] = useState(false);



  function handleTimeOver() {
    if (round === 5) {
      handleEndGame();
      // navigate('/gameover');
    } else {
      setCurrentAnswer("");
      setPending(false);
      setRound(round + 1); // increase the round
      setRemainingTime(10); // reset the timer
      setBotAnswer(''); // clear the bot answer
      setRoundResult(''); // clear the round result
      setHelloVisible(false);
    }
  }

  useEffect(() => { // get a new question
    console.log('New Round: ' + round);
    axios.get('http://localhost:8080/api/getq')
      .then(response => {
        setCurrentQuestion(response.data);
        localStorage.setItem('currentQuestion', response.data);
      })
      .catch(error => console.error(error));
  }, [round]);

  // Get bot answer when enter is pressed
  useEffect(() => {
    if (pending && botAnswer.length === 0) {
      console.log('Enter pressed');
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
  }, [pending])


  // Handle scoring when bot answer is retreived
  useEffect(() => {
    if (pending && currentAnswer.length > 0 && botAnswer.length > 0) {
      console.log('Handle score');
      // console.log('Player Answer:', currentAnswer);
      // console.log('Bots Answer:', botAnswer);

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
  }, [botAnswer])

  // Fetch the updated current score from backend
  useEffect(() => {
    if (refreshScore) {
      console.log('Get updated score: ' + accessToken);
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

      // console.log('Current Score:', currentScore);
    }
  }, [refreshScore])

  const handleAnswerChange = (e) => {
    setCurrentAnswer(e.target.value); // this is the text in the input field

  }


  
  useEffect(() => {
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
          setAnswersIsCorrect(true);
        } else {
          setAnswersIsCorrect(false);
        }
      })

      .catch(error => {
        console.error(error);
        setAnswersIsCorrect(false);
      });
  }, [currentQuestion, currentAnswer])

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) { // Enter key
      e.preventDefault(); // prevent the default action (submitting the form) when pressing enter key in input field
      setPending(true);
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
      .then(response => {
        console.log(response);
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
      localStorage.removeItem('token'); // remove token from local storage
      alert('Your session has expired. Please log in again.'); // alert user
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
          <Time key={remainingTime} initialTime={8} onTimeOver={handleTimeOver} />
        </div>
        <div className='round-container' style={{ fontFamily: "Gamefont" }}>
          {"Round " + round}
        </div>
      </div>
      <div className="rectangle-left">
        <h1 class="player-name" style={{ fontFamily: "Gamefont" }} >{username}</h1>
        {/* <button onClick={() => { setHintVisible(true) }} className="hint-button" style={{ display: 'block', marginBottom: '10px', fontFamily: 'ButtonFont' }}>
          {hint}
        </button> */}
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
