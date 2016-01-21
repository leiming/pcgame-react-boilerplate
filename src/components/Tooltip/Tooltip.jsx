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


  componentDidUpdate() {
    const {componentClassName} = this.props;
    const popoverClassName = classnames({[`${componentClassName}-pop-hidden`]: !this.state.isVisible})
    const popover = React.cloneElement(this.props.popover, {className: popoverClassName})
    render(popover, this.getTipContainer())
  }

  render() {

    const {activeMethod, ...props} = this.props;

    if (activeMethod.indexOf('click') !== -1) {
      props.onClick = this.setVisiable.bind(this, !this.state.isVisible);
    }

    if (activeMethod.indexOf('hover') !== -1) {
      props.onMouseEnter = this.setVisiable.bind(this, true)
      props.onMouseLeave = this.setVisiable.bind(this, false)
    }

    if (activeMethod.indexOf('focus') !== -1) {
      props.onFocus = this.setVisiable.bind(this, true)
      props.onBlur = this.setVisiable.bind(this, false)
    }

    // todo: popover is string

    return <span {...props}>{this.props.children}</span>

  }

}


