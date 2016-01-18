import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Button from '../../src/components/Button/Button'

import './index.less'

class ButtonExample extends Component {
  render() {
    return <span>
      <Button className="aaa bbb" disabled onClick={function(){console.log('1111')}}>
        <div>
          <div onClick={function(){console.log('2222')}}>2222</div>
        </div>
      </Button>
      </span>
  }
}

ReactDOM.render(<ButtonExample/>, document.getElementById('root'))