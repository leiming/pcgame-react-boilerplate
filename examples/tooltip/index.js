import React from 'react';
import {render} from 'react-dom';
import Tooltip from "../../src/components/Tooltip/Tooltip";

require('./index.less')

export default class Sample extends React.Component {

  static defaultProps = {
    prefix: 'ar-'
  };

  render() {
    return <div>
      <Tooltip popover={<span>popover</span>}>good</Tooltip>
    </div>
  }
}

render(<Sample />, document.getElementById('root'));