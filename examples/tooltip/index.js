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
      <Tooltip popover={<span>popover4</span>} activeMethod="focus">
        <span>
          <input type="text"/>
        </span>
      </Tooltip>
    </div>
  }
}

render(<Sample />, document.getElementById('root'));