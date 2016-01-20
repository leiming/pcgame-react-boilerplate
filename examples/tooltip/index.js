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
      <Tooltip activeMethod="click" popover={<span>popover</span>}>
        <button>
          aaaa
        </button>
      </Tooltip>
      <Tooltip popover={<span>popover2</span>}>good3</Tooltip>
    </div>
  }
}

render(<Sample />, document.getElementById('root'));