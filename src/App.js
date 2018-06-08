import React, { Component } from 'react';
import data from './data.json'
import './App.css';
import Highlight from "./components/Highlight"

class App extends Component {

	constructor(props) {
		super(props)
		this.state = {
			search: "",
		}
		this._change = this._handleInputChange.bind(this);
	}

	render() {
		return (
			<div className="App">
				<input className='search' type="search" value={this.state.search} onChange={this._change} />
				<Highlight searchWord={this.state.search}>
					{data.map((el, idx) => <div key={idx}>{el.transcript}</div>)}
				</Highlight>
			</div>
		);
	}

	_handleInputChange(e) {
		this.setState({ search: e.target.value });
	}
}

export default App;
