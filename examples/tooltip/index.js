import React from 'react'
import {render, findDOMNode, unmountComponentAtNode} from 'react-dom'
import Tooltip from '../../src/components/Tooltip/Tooltip'
import Popover from '../../src/components/Popover/Popover'


require('./index.less')

export default class Sample extends React.Component {

  static defaultProps = {
    prefix: 'ar-'
  };

  state = {
    before: true
  };

  onClick = () => {
    this.setState({before: false})
  };

  render() {

    const className = 'tile'

    return <div>
      <div className="container">
        <Popover {...this.props} className={className} direction="left">left</Popover>
        <Popover {...this.props} className={className} direction="top">top</Popover>
        <Popover {...this.props} className={className} direction="right">right</Popover>
        <Popover {...this.props} className={className} direction="bottom">bottom</Popover>
      </div>


      <div className="container">

        <Tooltip
          className={className}
          direction="left"
          popover={<Popover {...this.props} direction="left">Tip</Popover>}>
          <button className="button ar-button">Tooltip</button>
        </Tooltip>

        <Tooltip
          className={className}
          direction="top"
          popover={<Popover {...this.props} direction="top">Tip</Popover>}>
          <button className="button ar-button">Tooltip</button>
        </Tooltip>

        <Tooltip
          className={className}
          direction="right"
          popover={<Popover {...this.props} direction="right">Tip</Popover>}>
          <button className="button ar-button">Tooltip</button>
        </Tooltip>

        {this.state.before ?
          <Tooltip
            className={className}
            direction="bottom"
            popover={<Popover {...this.props} direction="bottom">Tip</Popover>}>
            <button className="button ar-button">Tooltip</button>
          </Tooltip>
          :""
        }
        <button onClick={this.onClick}>aaaaaaaa</button>

      </div>
    </div>

  }
}

render(<Sample />, document.getElementById('root'))