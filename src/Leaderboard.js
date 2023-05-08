
import './Leaderboard.css';
  
// Example of a data array that
// you might receive from an API
const data = [
  { user: "nicolette", points: 32 },
  { user: "smelly", points: 11 },
]
  
function Leaderboard() {
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