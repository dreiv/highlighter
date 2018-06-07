import React, { Component } from 'react';
import data from './data.json'
import './App.css';
import Highlight from "./components/Highlight"

class App extends Component {

	render() {
		return (
			<div className="App">
				<Highlight>
					{data.map((el, idx) => <div key={idx}>{el.transcript}</div>)}
				</Highlight>
			</div>
		);
	}
}

export default App;
