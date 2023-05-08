import React, { useState, useEffect } from 'react';
import "./Longest.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Longest() {
  // SERVER IP
  // const URL = 'http://localhost:8080';
  const URL = 'http://157.230.61.120:8080';

  const navigate = useNavigate();
  const accessToken = localStorage.getItem('token') || 'null | 0';
  const username = accessToken.split('|')[0] || 'null | 0';

  // Game status
  const [round, setRound] = useState(0);
  const [roundResult, setRoundResult] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [currentScore, setCurrentScore] = React.useState(0);
  const [remainingTime, setRemainingTime] = useState(10);

  // Answers
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [botAnswer, setBotAnswer] = useState('');
  const [helloVisible, setHelloVisible] = useState(false);

  // Form
  const [displayInput, setDisplayInput] = useState(true);
  

  // Hint status
  const [HintRequested, setHintRequested] = useState(false);
  const [hint, setHint] = useState('Use a HINT!');

  // Pending status
  const [pending, setPending] = useState(false);
  const [refreshScore, setRefreshScore] = useState(false);
  const [answerIsCorrect, setAnswerIsCorrect] = useState(false);
  const [roundDuration, setRoundDuration] = useState(5);

  //gameover message is stored in local storage. set it to empty string
  localStorage.setItem('gameoverMessage', '');


  function handleTimeOver() {
    if (round === 5) {
      setAnswerIsCorrect(false);
      handleEndGame();
      // navigate('/gameover');
    } else {
      setRound(round + 1); // increase the round
      setDisplayInput(true);
      setHintRequested(false); // reset the hint
      setHint('Use a HINT!'); // reset the hint
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
    axios.get(URL + '/api/getq')
      .then(response => {
        console.log('Current Question:', currentQuestion);
        setCurrentQuestion(response.data);
      })
      .catch(error => console.error(error));
  }, [round]);

  useEffect(() => {
    if (answerIsCorrect === false) {

      axios.post(URL + '/api/checkans', {
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
            setHelloVisible(true);
            setRoundResult('Sorry, thats NOT a valid Answer! ');
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
    if (pending && botAnswer.length === 0 && answerIsCorrect) {
      axios.get(URL + '/api/bot', {
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

    if (currentAnswer.length > 0 && botAnswer.length > 0 ) {
      axios.post(URL + '/api/updateCurrentScore', {
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
          setDisplayInput(false);
          // set remaining time to 0
          

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
      axios.get(URL + '/api/getCurrentScore', {
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

    axios.post(URL + '/api/endGame', {
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

// write use effect to check if hintVisible is true

useEffect(() => {
  if (HintRequested) {
    axios.get(URL + '/api/useHint', {
      headers: {
        'Access-Token': accessToken,
        'Content-Type': 'form-data',
      },
      params: {
        question: currentQuestion,
      },
    })
      .then(response => {
        console.log(response);
        setHint(response.data);
        setHintRequested(false);
      })
      .catch(error => console.error(error));
  }
}, [HintRequested, currentQuestion, accessToken])




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


  useEffect(() => {
    if (round == 0) {
      setRoundDuration(5);
    }
    else {
      setRoundDuration(10);
    }
  }, [round])
 


  return (
    <div id="loading-indicators">
      <div className="loading-indicator" id="loading-indicator__1">
      </div>
      <div className="square">
        <div class="av">
          <div class="av-eye"></div>
        </div>
        <div className="timer-container" style={{ position: 'relative', top: 15, right: -340}}>
          <Time key={remainingTime} initialTime={roundDuration} onTimeOver={handleTimeOver} />
        </div>
        <div className='round-container' style={{ fontFamily: "Gamefont" }}>
          {round >= 1 ? "Round " + round : "Loading Lexicrush..."}
        </div>
      </div>
      <div className="rectangle-left">
        <h1 class="player-name" style={{ fontFamily: "Gamefont" }} >{username}</h1>
        <button onClick={() => { setHintRequested(true)}} className="hint-button" style={{ display: 'block', marginBottom: '10px', fontFamily: 'Gamefont' }}>
          {hint}
        </button>
        <button onClick={() => { handleEndGame() }} className="exit-button" style={{ display: 'block', marginBottom: '10px', fontFamily: 'ButtonFont' }}>
          Exit
        </button>
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
      <div className="question-position" style={{ fontFamily: "Gamefont" }}>{round ? currentQuestion : "Starting game..."}
        <div>
          {helloVisible &&
            <div className="xanswer" style={{ fontFamily: "Gamefont" }}>
              {roundResult}
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
      {displayInput ? 
        <span className="xx">
          <input type="text" value={currentAnswer} placeholder="Enter" onKeyDown={handleKeyDown} onChange={handleAnswerChange} />
          <span class="my-span"></span>
        </span>
        : null}
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
      {/* <button onClick={stopTimer}>Stop</button>
      <button onClick={restartTimer}>Restart</button> */}
    </div>
  );
}

export default Longest;
