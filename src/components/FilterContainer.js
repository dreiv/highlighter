import React from 'react'
import Highlight from "./Highlight"
import data from '../data.json'
import './FilterContainer.css'

class FilterContainer extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			search: "",
			searchIndex: 0,
			upButtonPressed: false,
			downButtonPressed: true
		}
		this._changeName = this._handleInputChange.bind(this)
		this._changeIndex = this._handleIndexChange.bind(this)
		this._handleUpButtonPress = this._handleUpButtonPress.bind(this)
		this._handleDownButtonPress = this._handleDownButtonPress.bind(this)
	}

	render() {
		return (<React.Fragment>
			<div className='search'>
				<input type="search" value={this.state.search} onChange={this._changeName} />
				<button onClick={this._handleUpButtonPress}> <i className="arrow up"></i> </button>
				<button> <i className="arrow down"></i> </button>
				<input type="search" value={this.state.searchIndex} onChange={this._changeIndex} />
			</div>
			<Highlight className='text' searchWord={this.state.search} activeIndex={this.state.searchIndex} upButtonPressed={this.state.upButtonPressed}>
				{data.map((el, idx) => <div key={idx}>{el.transcript}</div>)}
			</Highlight>
		</React.Fragment>)
	}

	_handleInputChange(e) {
		this.setState({ search: e.target.value });
	}

	_handleIndexChange(e) {
		this.setState({ searchIndex: e.target.value })
	}

	_handleUpButtonPress(e) {
		this.setState({
			upButtonPressed: true,
			downButtonPressed: false
		})
	}

	_handleDownButtonPress(e) {
		this.setState({
			upButtonPressed: false,
			downButtonPressed: true
		})
	}
}

export default FilterContainer
