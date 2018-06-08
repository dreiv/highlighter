import React, { Component } from 'react';
import data from './data.json'
import './App.css';
import Highlight from "./components/Highlight"

class App extends Component {

	constructor(props) {
		super(props)
		this.state = {
			search: "",
			searchIndex: 0
		}
		this._changeName = this._handleInputChange.bind(this)
		this._changeIndex = this._handleIndexChange.bind(this)
	}

	render() {
		return (
			<div className="App">
				<div className='search'>
					<input type="search" value={this.state.search} onChange={this._changeName} />
					<input type="search" value={this.state.searchIndex} onChange={this._changeIndex} />
				</div>
				<Highlight searchWord={this.state.search} activeIndex={this.state.searchIndex}>
					{data.map((el, idx) => <div key={idx}>{el.transcript}</div>)}
				</Highlight>
			</div>
		);
	}

	_handleInputChange(e) {
		this.setState({ search: e.target.value });
	}

	_handleIndexChange(e) {
		this.setState({ searchIndex: e.target.value })
	}
}

export default App;
