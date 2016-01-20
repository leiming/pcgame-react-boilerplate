import React, {Component, PropTypes} from 'react'
import {findDOMNode, render} from 'react-dom'
import invariant from 'invariant'
import classnames from 'classnames'

import {eventListenerPolyfill} from '../utils/eventListenerIEPolyfill'

export default class Tooltip extends Component {

  static defaultProps = {
    componentClassName: 'tooltip',
    perfix            : '',
    defaultVisible    : false,
    activeMethod      : 'hover',
    onVisibleChange   : ()=> {}
  };

  static propTypes = {
    componentClassName: PropTypes.string.isRequired,
    perfix            : PropTypes.string,
    defaultVisible    : PropTypes.bool,
    activeMethod      : PropTypes.oneOf(['click', 'hover', 'focus']),
    onVisibleChange   : PropTypes.func
  };

  state = {
    isVisible: this.props.defaultVisible
  };

  setVisiable = (visible) => {
    this.setState({isVisible: !!visible})
  };

  onClick = () => {
    this.setVisiable(!this.state.isVisible)
  };

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

  componentDidMount() {

  }

  componentDidUpdate() {

    const {componentClassName} = this.props;
    const popoverClassName = classnames({[`${componentClassName}-pop-hidden`]: this.state.isVisible})
    console.log(popoverClassName)
    const popover = React.cloneElement(this.props.popover, {className: popoverClassName})
    render(popover, this.getTipContainer())
  }

  render() {

    const {activeMethod, ...props} = this.props;

    if (activeMethod.indexOf('click') !== -1) {
      props.onClick = this.onClick;
    }
    // todo: poppver is string

    return <span {...props}>{this.props.children}</span>

  }

}


