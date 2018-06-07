import React, { Component } from 'react';

export default class Recursive extends Component {

  render() {
    const fn = (str) => {
      return `* ${str}`
    }

    const recursiveCloneChildren = (children, fn) => {
      return React.Children.map(children, child => {
        if (typeof child === "string") {
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
    { recursiveCloneChildren(this.props.children, fn) }
    </React.Fragment>
  }
}