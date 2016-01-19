import React, {Component} from 'react'
import {findDOMNode, render} from 'react-dom'
import invariant from 'invariant'

export default class Tooltip extends Component {

  getTipContainer(container) {

    if (this.tipContainer) {
      return this.tipContainer
    }

    if (container && findDOMNode(container)) {
      return this.tipContainer = findDOMNode(container)
    }

    invariant(document, 'Only in browser runtime can Tooltip run')

    const tipContainer = document.createElement('div')
    document.body.appendChild(tipContainer)
    return this.tipContainer = findDOMNode(tipContainer)

  }

  componentDidMount(){

    const tipContainer = this.getTipContainer();

    console.log(tipContainer)

    render(this.popover, tipContainer)

//    if (this.popover) {
//      tipContainer.appendChild(this.popover)
//    }

  }

  render() {

    const {popover, ...props} = this.props;

    // todo: poppver is string

    this.popover = popover


    return <span>{this.props.children}</span>
  }

}