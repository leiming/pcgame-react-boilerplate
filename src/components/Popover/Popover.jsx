import React, {Component, PropTypes} from 'react'

import {getClassNames} from '../utils/classUtils'

export default class Popover extends Component {

  static defaultProps = {
    componentClassName: 'popover',
    prefix            : '',
    direction         : 'top'
  };

  static propTypes = {
    componentClassName: PropTypes.string.isRequired,
    prefix            : PropTypes.string,
    direction         : PropTypes.oneOf(['left', 'right', 'top', 'bottom'])
  };

  render() {
//    return <div className=>
//
//    </div>
  }
}

// todo: temp

getClassNames('prefix', 'a')
getClassNames('prefix', 'b' , 'c')
