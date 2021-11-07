import React, { Component } from "react";
import { render } from "react-dom";
import axios from 'axios';


export default class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:8000/book/')
        .then(response => console.log(response));
  }

  render() {
    return (
      <div>
        <h1>This is the App.js</h1>
      </div>
    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);