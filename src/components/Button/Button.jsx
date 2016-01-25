import React,{Children,PropTypes, Component} from 'react'
import classnames from 'classnames'

export default class Button extends Component {

  static defaultProps = {
    componentClassName: 'button',
    prefix            : 'ar-',
    disabled          : false,
    onClick           : ()=> {}
  };

  static propTypes = {
    componentClassName: PropTypes.string.isRequired,
    prefix            : PropTypes.string,
    disabled          : PropTypes.bool,
    onClick           : PropTypes.func
  };

  render() {

    const {className, prefix, disabled, style, ...props} = this.props
    const classNames = classnames(
      {
        [`${prefix}${props.componentName}`]: prefix,
        [`${props.componentName}-disable`] : disabled
      },
      props.componentName, className)

    // 当 Button 中放入复核组件时,只设置 properties 是无法阻止内部元素的响应事件的
    // 若采用屏蔽 children 内部的事件响应(例如onClick),则需递归检测每一级子孙元素上的事件,子子孙孙无穷匮也
    // 本模块的折衷方案是: 按钮内部使用遮罩层挡住内部元素, 缺陷是模块的 active hover 等交互完全失效

    const isContainer = (typeof props.children !== 'string') && disabled
    const Mask = isContainer ?
      <div style={{position:'absolute', width: '100%', height: '100%', zIndex:2}}></div> : ''

    const buttonStyle = isContainer ? Object.assign({position:'relative'}, style) : style

    return <button className={classNames} {...props} disabled={disabled}
                   style={buttonStyle}>
      {Mask}
      {this.props.children}
    </button>
  }

}