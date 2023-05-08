import React, { useState, useEffect } from 'react';
import './Leaderboard.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

  
function Leaderboard() {
  
const URL = 'http://localhost:8080';
const token = localStorage.getItem('token') || 'null | 0';
const [leaderBoard, setLeaderboard] = useState(null);

  
// Example of a data array that
// you might receive from an API

// use effect to get /api/getHighScoreLeaderboard

useEffect(() => {
  axios.get(URL + '/api/getHighScoreLeaderboard', {
    headers: {
      'Access-Token': token,
    }
  })
    .then(response => {
      setLeaderboard(response.data);
    })
    .catch(error => console.error(error));
}, [])



const data = leaderBoard.map((item) => {
  return { user: item[0], points: item[1] }
})

  return (
    <div className="App">
      <table>
        <tr>
          <th>Username</th>
          <th>Points</th>
        </tr>
        {data.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val.user}</td>
              <td>{val.points}</td>
            </tr>
          )
        })}
      </table>
    </div>
  );
}
  
export default Leaderboard;