import React, {Component, PropTypes} from 'react'
import {findDOMNode, render, unmountComponentAtNode} from 'react-dom'
import invariant from 'invariant'
import Popover from '../Popover/Popover'
import classnames from 'classnames'
import {getClassNames} from '../utils/classUtils'
import {getStyles, getOffset} from '../utils/domUtils'

import {eventListenerPolyfill} from '../utils/eventListenerIEPolyfill'

export default class Tooltip extends Component {

  static defaultProps = {
    componentName  : 'tooltip',
    perfix         : '',
    defaultVisible : false,
    activeMethod   : 'hover',
    direction      : 'top',
    onVisibleChange: ()=> {}
  };

  static propTypes = {
    componentName  : PropTypes.string.isRequired,
    perfix         : PropTypes.string,
    defaultVisible : PropTypes.bool,
    activeMethod   : PropTypes.oneOf(['click', 'hover', 'focus']),
    direction      : PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
    onVisibleChange: PropTypes.func
  };

  state = {
    isPopoverRendered: false,
    isVisible        : this.props.defaultVisible
  };

  setVisible = (visible) => {
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

  getPopoverOffset() {
    const direction = this.props.direction
    const tooltipOffset = getOffset(findDOMNode(this))
    const popoverOffset = this.state.isPopoverRendered ? getOffset(this.popoverDOM) : {}

    const popoverCaretWidth = 8

    const popoverHeight = popoverOffset.height || 0
    const popoverWidth = popoverOffset.width || 0

    switch (direction) {
      case 'top':
        return {
          top : tooltipOffset.top - (popoverHeight + popoverCaretWidth),
          left: tooltipOffset.left - ((popoverWidth - tooltipOffset.width) / 2)
        }
      case 'left':
        return {
          top : tooltipOffset.top - ((popoverHeight - tooltipOffset.height) / 2),
          left: tooltipOffset.left - (popoverWidth + popoverCaretWidth)
        }
      case 'right':
        return {
          top : tooltipOffset.top - ((popoverHeight - tooltipOffset.height) / 2),
          left: tooltipOffset.left + (tooltipOffset.width + popoverCaretWidth)
        }
      case 'bottom':
        return {
          top : tooltipOffset.top + popoverHeight - (popoverCaretWidth / 2),
          left: tooltipOffset.left - ((popoverWidth - tooltipOffset.width) / 2)
        }
    }

  }

  componentDidUpdate() {
    const style = Object.assign({position: 'absolute'}, this.getPopoverOffset())
    const self = this
    const {componentName} = this.props
    const popoverClassName = classnames({[`${componentName}-pop-hidden`]: !this.state.isVisible})
    const popover = React.cloneElement(this.props.popover, {className: popoverClassName, style})
    render(popover, this.getTipContainer(), function () {

      if (!self.state.isPopoverRendered) {
        self.popoverDOM = findDOMNode(this)
        // Todo: https://github.com/facebook/react/issues/3417
        self.setState({isPopoverRendered: true})
      }

    })
  }

  componentWillUnmount() {
    if (this.tipContainer) {
      unmountComponentAtNode(findDOMNode(this.tipContainer))
    }
  }

  render() {

    const {activeMethod, ...props, className} = this.props;

    if (activeMethod.indexOf('click') !== -1) {
      props.onClick = this.setVisible.bind(this, !this.state.isVisible);
    }

    if (activeMethod.indexOf('hover') !== -1) {
      props.onMouseEnter = this.setVisible.bind(this, true)
      props.onMouseLeave = this.setVisible.bind(this, false)
    }

    if (activeMethod.indexOf('focus') !== -1) {
      props.onFocus = this.setVisible.bind(this, true)
      props.onBlur = this.setVisible.bind(this, false)
    }

    // Todo: popover is string

    props.className = classnames(className, getClassNames(props.prefix, props.componentName))

    return <span {...props}>{this.props.children}</span>

  }

}


