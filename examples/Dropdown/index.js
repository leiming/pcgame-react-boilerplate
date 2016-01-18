import React from 'react';
import ReactDOM from 'react-dom';
import Button from "../../src/components/Button/Button";
import Dropdown from "../../src/components/Dropdown/Dropdown";

require('./index.less')

export default class Sample extends React.Component {

  static defaultProps = {
    prefix: 'ar-'
  };

  render() {
    return <div>
      <Dropdown activeMethod='click' defaultVisible={true} {...this.props} onVisibleChange={this.onVisibleChange}>
        <span className="button ar-button">toggle</span>
        <div className={'customContent'}>
          <span className="dropdown-close"></span>
          <ul>
            <li>aaa</li>
            <li>bbb</li>
            <li>ccc</li>
          </ul>
        </div>
      </Dropdown>

      <Dropdown onVisibleChange={this.onVisibleChange} {...this.props}>
        <Button>dfdsd</Button>
        <div className={'customContent'}>
          <span className="dropdown-close"></span>
          <ul>
            <li>aaa</li>
            <li>bbb</li>
            <li>ccc</li>
          </ul>
        </div>
      </Dropdown>
    </div>
  }
}

ReactDOM.render(<Sample />, document.getElementById('root'));