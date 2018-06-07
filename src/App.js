import React, { Component } from 'react';
import data from './data.json'
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        {data.map((el, idx) => <div key={idx}>{el.transcript}</div>)}
      </div>
    );
  }
}

export default App;
