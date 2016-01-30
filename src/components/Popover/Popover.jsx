import React, {Component, PropTypes} from 'react'

import {getClassNames} from '../utils/classUtils'
import classnames from 'classnames'

export default class Popover extends Component {

  static defaultProps = {
    componentName: 'popover',
    prefix       : '',
    direction    : 'top'
  };

  static propTypes = {
    componentName: PropTypes.string.isRequired,
    prefix       : PropTypes.string,
    direction    : PropTypes.oneOf(['left', 'right', 'top', 'bottom'])
  };

  render() {

    const {id, style, className, ...props} = this.props

    return <div id={id}
      style={style}
      className={classnames(className, getClassNames(
    props.prefix,
    props.componentName + '-' + props.direction))

     }>
      <span className={getClassNames(props.prefix, props.componentName  + '-content')}>
        {this.props.children}
      </span>
      <span className={getClassNames(props.prefix, props.componentName + '-caret')}> </span>
    </div>
  }
}

