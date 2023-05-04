import './App.css';
import Start from "./Start"
import Auth from "./Auth"
import Gamepage from "./Gamepage"
import Play from './Play';
import Longest from './Longest';
import Test from './Test';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Profile from './Profile';

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
            <Route path= "/play" element={<Play />} />
            <Route path= "/longest" element={<Longest />} />
            <Route path = "/test" element={<Test />} />
            <Route path = "/profile" element={<Profile />} /> 
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;