import React from 'react'
import {render} from 'react-dom'
import Tooltip from '../../src/components/Tooltip/Tooltip'
import Popover from '../../src/components/Popover/Popover'


require('./index.less')

export default class Sample extends React.Component {

  static defaultProps = {
    prefix: 'ar-'
  };


  render() {

    return <div>
      <div className="container">
        <Popover {...this.props} style={{left : 100}} direction="left">left</Popover>
        <Popover {...this.props} style={{left : 200}} direction="top">top</Popover>
        <Popover {...this.props} style={{left : 300}} direction="right">right</Popover>
        <Popover {...this.props} style={{left : 400}} direction="bottom">bottom</Popover>
      </div>


      <div className="container">
        <Tooltip popover={<span>popover4</span>}>
          <button className="button ar-button">Tooltip</button>
        </Tooltip>

        <Tooltip popover={<Popover {...this.props} direction="left">left</Popover>}>
          <button className="button ar-button">Tooltip</button>
        </Tooltip>
      </div>
    </div>


  }
}



render(<Sample />, document.getElementById('root'))