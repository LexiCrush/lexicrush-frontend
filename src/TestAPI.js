import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./TestApi.css"
import Timer from "./Timer"

function EnterAnswer() {
  const [answer, setAnswer] = useState('');
  const [points, setPoints] = useState(0);
  const [text, setText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [botAnswer, setBotAnswer] = useState(''); // [botAnswer, setBotAnswer
  const [helloVisible, setHelloVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!mounted) {
      axios.get('http://localhost:8080/api/getq')
        .then(response => {
          setAnswer(response.data);
        })
        .catch(error => console.error(error));
      setMounted(true);
    }
  }, [mounted]);

  useEffect(() => { // if the user gets the answer correct, the bot will respond
    if (points > 0) {
      axios.get('http://localhost:8080/api/bots')
        .then(response => {
          setBotAnswer(response.data);
        })
        .catch(error => console.error(error));
    }
  }, [points]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', text);
    axios.post('http://localhost:8080/api/checkans', { answer: text })
      .then(response => { console.log(response); setPoints(response.data); })
      .catch(error => console.error(error));
  }

  const handleChange = (e) => {
    setText(e.target.value); // this is the text in the input field
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) { // Enter key
      setUserInput(text);
      handleSubmit(e);
      console.log('Submitted:', text);
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
          <h1>{answer}</h1>
        </div>
        <div className="form">
          <input type="text" name="name" required autoComplete="off" onKeyDown={handleKeyDown} onChange={handleChange} />
          <label htmlFor="name" className="label-name">
            <span className="content-name">LONGEST WORD MODE:</span>
          </label>
        </div>
        
        {helloVisible &&
          <div className="bottom" style={{color: "purple", fontFamily: "aom" }}>
            {points === 0 ? "SORRY! That is not in our database." : "CORRECT! " + points + " Points awarded."}
          </div>
        }
        {botAnswer && 
            <div className="botAnswer" style={{color: "white", fontFamily: "aom" }}>
            {"@ak2k2 choose: " + botAnswer}
            </div>
        }
        
      </div>
    </div>
  );
}

export default EnterAnswer;
