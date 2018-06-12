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
			matchCount: 0,
		}
		this._changeName = this._handleInputChange.bind(this)
		this._changeIndex = this._handleIndexChange.bind(this)
		this._setMatchCount = this._setMatchCount.bind(this)
	}

	render() {
		return (<React.Fragment>
			<div className='search'>
				<input type="search" value={this.state.search} onChange={this._changeName} />
				<input type="number" value={this.state.searchIndex} onChange={this._changeIndex} />
				<label> {`${+this.state.searchIndex + 1}/${this.state.matchCount}`} </label>
			</div>
			<Highlight
				searchWord={this.state.search}
				activeIndex={this.state.searchIndex}
				setMatchCount={this._setMatchCount}
				activeClass="active"
				matchElement="strong"
			>
				{data.map((el, idx) => <div key={idx}>{el.transcript}</div>)}
			</Highlight>
		</React.Fragment>)
	}

	_handleInputChange(e) {
		this.setState({
			search: e.target.value,
			searchIndex: 0
		}
		);
	}

	_handleIndexChange(e) {

		let circularSearchIndex
		if (e.target.value < 0) {
			circularSearchIndex = this.state.matchCount - 1
		}
		else {
			circularSearchIndex = e.target.value % this.state.matchCount
		}

		this.setState({ searchIndex: circularSearchIndex })
	}

	_setMatchCount(matchCount) {
		this.setState({ matchCount: matchCount })
	}
}

export default FilterContainer
