import React, { Component } from 'react'
import { escapeRegExpFn, isScalar } from '../utils/utils'
import ReactDOM from 'react-dom'

class Highlight extends Component {

	componentDidUpdate = function () {
		const tesNode = ReactDOM.findDOMNode(this.refs.activeRef)
		if (tesNode) {
			tesNode.scrollIntoView();
		}
	};

	render() {

		let _indexCount = 0;
		const fn = (text) => {

			const allChunks = this.constructAllChunks(this.computeHighlightedChunks(text), text.length)

			return (
				<React.Fragment>
					{allChunks.map((chunk, index) => {
						const chunkText = text.substr(chunk.start, chunk.end - chunk.start)

						if (chunk.highlight) {
							_indexCount++;
							const isActive = _indexCount === +this.props.activeIndex
							return <mark key={index} ref={isActive ? 'activeRef' : null} className='active'>{isActive ? '*' + chunkText : chunkText}</mark>
						}
						return <React.Fragment key={index}>{chunkText}</React.Fragment>
					})}
				</React.Fragment>
			)
		}

		const recursiveCloneChildren = (children, fn) => {
			return React.Children.map(children, child => {
				if (isScalar(child)) {
					return fn(child);
				}

				if (child.props.children) {
					return React.cloneElement(child, [], recursiveCloneChildren(child.props.children, fn));
				} else {
					return child
				}
			})
		}

		return <React.Fragment>
			{recursiveCloneChildren(this.props.children, fn)}
		</React.Fragment>
	}

	computeHighlightedChunks(text) {

		const searchWord = this.props.searchWord;
		if (!searchWord || searchWord.length === 0) return []
		const regExp = new RegExp(searchWord, 'gi')

		const chunks = []
		let match
		while ((match = regExp.exec(text)) !== null) {
			const start = match.index
			const end = regExp.lastIndex
			chunks.push({ start, end, highlight: true })
		}

		return chunks
	}

	constructAllChunks(chunks, totalLength) {

		const allChunks = []

		let lastFoundIndex = 0
		chunks.forEach((chunk) => {
			allChunks.push({ start: lastFoundIndex, end: chunk.start, highlight: false })
			allChunks.push({ start: chunk.start, end: chunk.end, highlight: true })
			lastFoundIndex = chunk.end
		})

		allChunks.push({ start: lastFoundIndex, end: totalLength, highlight: false })

		return allChunks
	}
}

Highlight.defaultProps = {
	searchWord: "minim",
	activeIndex: 0
}

export default Highlight
