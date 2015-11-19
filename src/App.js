import React, { Component } from 'react';
import Dropdown from './components/Dropdown.jsx';
import $ from 'jquery';
import {addMaskLayer, removeMaskLayer} from './business/MaskUtil';

require('./App.less');

let maskCounter = 0;

export default class App extends Component {

  handler = (otherParams, obj) => {

    const targetLayer = '#iframe'

    console.log(obj);
    console.log(otherParams);

    let visible = obj && obj.visible
    if (visible) {
      addMaskLayer(targetLayer, '#root', maskCounter++)
    } else {
      removeMaskLayer(targetLayer)
    }
  }

  render() {
    const spaceStyle = {width: 50, display: "inline-block"}

    return (
      <div>
        <Dropdown onVisibleChange={this.handler}>
          <span>label</span>

          <div>
            <ul>
              <li>word</li>
              <li>excel</li>
              <li>ppt</li>
            </ul>
          </div>
        </Dropdown>

        <div style={spaceStyle}></div>

        <Dropdown onVisibleChange={this.handler.bind(this, {"bar": 213})}
                  activeMethod={"click"} defaultVisible={true}>
          <span>label2</span>
          <DropdownChild/>
        </Dropdown>
      </div>
    );
  }
}


class DropdownChild extends Component {

  state = {count : 0}

  onClick = (e) => {
    console.log(this.state.count);
    this.setState({count: ++this.state.count})
  }

  render() {

    const divStyle = {
      background: '#ccffcc'
    }

    return (<div className={"ccc"} style={divStyle}>
        <button onClick={this.onClick}>button</button>
        <ul>
          <li>word2</li>
          <li>excel2</li>
          <li>ppt2</li>
        </ul>
      </div>
    )
  }
}
