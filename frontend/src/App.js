import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login'

function App() {
  const [token, setToken] = useState();
  
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/book/')
        .then(response => console.log(response));
  });

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
