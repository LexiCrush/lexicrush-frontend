import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Play.css"
import Timer from "./Timer"

function PlayGame() {
  const [currentQuestion, setCurrentQuestion] = useState('');  
  const [userInput, setUserInput] = useState('');
  const [currentAnswer, setAnswer] = useState('');
  const [points, setPoints] = useState(0);
  const [botAnswer, setBotAnswer] = useState(''); // [botAnswer, setBotAnswer
  const [helloVisible, setHelloVisible] = useState(false);
  const [hint, setHint] = useState('');
  const [hintVisible, setHintVisible] = useState(false);


  useEffect(() => { // get a new question
      axios.get('http://10.0.0.16:8080/api/getq')
        .then(response => {
          setCurrentQuestion(response.data);
        })
        .catch(error => console.error(error));

  }, []);

  useEffect(() => { // if the user gets the answer correct, the bot will respond
    if (points > 0) {
      axios.get('http://10.0.0.16:8080/api/bot', {
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
    axios.get('http://10.0.0.16:8080/api/hint', {
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

    axios.post('http://10.0.0.16:8080/api/checkans', {
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


  return (
    <div className="background">
      <div class="scene">
        <div class="space">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <Timer></Timer>
      <div className="content" style={{color: "white", fontFamily: "aom" }}>
        <div className="centered">
          <h1>{currentQuestion}</h1>
        </div>
        
        <div className="form">
          <input type="text" name="name" required autoComplete="off" onKeyDown={handleKeyDown} onChange={handleChange} />
          <label htmlFor="name" className="label-name">
            <span className="content-name">LONGEST WORD MODE:</span>
          </label>
        </div>


        <div>
          <button onClick={() => {setHintVisible(true)}} style={{fontFamily: 'aom', fontSize: '40px', color: 'white', backgroundColor: 'purple', borderRadius: '10px', padding: '10px', margin: '45px'}}>
            {hint}
          </button>
        </div>
        
        {/* {hintVisible &&
          <div className="hint" style={{fontFamily: "aom", position : "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", color: "white", fontSize: "100px"}}>
            {hint}
          </div>
        } */}
        
        
        {helloVisible &&
          <div className="bottom" style={{color: "purple", fontFamily: "aom" }}>
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
  );
}

export default PlayGame;