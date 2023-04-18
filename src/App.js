import './App.css';
import Start from "./Start"
import Auth from "./Auth"
import Gamepage from "./Gamepage"
import Shortest from './Shortest';
import Longest from './Longest';
import TestAPI from './TestAPI';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

function App() {
  const headingStyle = {
    marginTop: '100px',
    fontFamily: 'Lucida Handwriting, cursive',
    fontSize: '60px',
    fontWeight: 'bold',
    color: '#333',
  };
  const textStyle = {
    fontFamily: 'Copperplate, Papyrus, fantasy',
    fontSize: '30px',
    fontWeight: 'normal',
    color: '#D8BFD8',
  };
  const buttonStyle = {
    marginBottom: '20px',
    fontFamily: 'Copperplate, Papyrus, fantasy',
    fontSize: '20px',
    fontWeight: 'normal',
    color: '#333',
    backgroundColor: '#FFF0F5',
  };
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route path= "/" element={<Start />} />
            <Route path= "/login" element={<Auth />} />
            <Route path= "/gamepage" element={<Gamepage />} />
            <Route path= "/shortest" element={<Shortest />} />
            <Route path= "/longest" element={<Longest />} />
            <Route path= "/testapi" element={<TestAPI />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;