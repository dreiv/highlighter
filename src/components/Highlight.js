import React, { Component } from 'react'
import { escapeRegExpFn, isScalar } from '../utils/utils'

class Highlight extends Component {

	render() {
		const fn = (str) => {
			return (
				<h1>{str.replace(this.props.searchWord, ">>>>>replaceed<<<<<<")}</h1>
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
}

Highlight.defaultProps = {
	searchWord: "minim"
}

export default Highlight
