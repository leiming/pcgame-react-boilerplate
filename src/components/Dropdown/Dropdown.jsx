import React, {PropTypes, Component} from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import invariant from 'invariant'

export default class Dropdown extends Component {

  static defaultProps = {
    componentName  : 'dropdown',
    prefix         : '',
    activeMethod   : 'click',
    defaultVisible : false,
    contentStyle   : {},
    toggleStyle    : {},
    onVisibleChange: () => {}
  };

  static propTypes = {
    componentName  : PropTypes.string,
    prefix         : PropTypes.string,
    activeMethod   : PropTypes.oneOf(['click', 'hover']),
    defaultVisible : PropTypes.bool,
    contentStyle   : PropTypes.object,
    toggleStyle    : PropTypes.object,
    onVisibleChange: PropTypes.func
  };

  state = {isOpen: this.props.defaultVisible};

  componentDidMount() {
    // defaultVisible = true 当初次加载时，触发 change 及事件绑定
    if (this.state.isOpen === true) {
      this.props.onVisibleChange({visible: true})
      this.bindOuter()
    }
  }

  // 为什么不能用 componentWillUpdate 处理这个逻辑 ?
  // 因为外部事件触发更新时，需要处理 render 之后的节点，如获取 dropdown-content 高度等
  componentDidUpdate = (prevProps, prevState) => {
    const currentVisible = this.state.isOpen
    if (prevState.isOpen !== currentVisible) {
      this.props.onVisibleChange({visible: currentVisible})
    }
  };

  getDropdownToggle = (child) => {
    const props = this.props
    const prefix = props.prefix || ''

    const toggleProp = {
      'className': classNames(`${props.componentName}-toggle`,
        {[`${prefix}${props.componentName}-toggle`]: prefix})
    }

    if (props.activeMethod.indexOf('click') !== -1) {
      toggleProp.onClick = this.onClick
    }

    return (<span {...toggleProp} style={props.toggleStyle}>{child}</span>)
  };

  getDropdownContent = (child) => {
    const props = this.props
    const prefix = props.prefix || ''

    const contentProps = {
      className: classNames(
        `${props.componentName}-content`,
        {[`${prefix}${props.componentName}-content`]: prefix}
      )
    }

    return (<div {...contentProps} style={props.contentStyle}>{child}</div>)
  };

  setVisible = (visibleState) => {
    const visible = !!visibleState
    this.setState({isOpen: visible})
  };

  bindOuter = () => {
    document.addEventListener('click', this.onDocumentClick)
  };

  unbindOuter = () => {
    document.removeEventListener('click', this.onDocumentClick)
  };

  onDocumentClick = (e) => {
    // 此处留有个关闭按钮的 hook:
    // 当点击的节点 class 中存在 "dropdown-close" 时, 关闭按钮
    const targetClass = e.target.getAttribute('class')

    if (targetClass && targetClass.indexOf("dropdown-close") !== -1) {
      this.setVisible(false)
      return
    }

    const componentNode = ReactDOM.findDOMNode(this)
    const isContain = componentNode.contains(e.target)
    if (!isContain) {
      this.setVisible(false)
    }
  };

  onClick = (e) => {
    const openState = !this.state.isOpen

    if (openState) {
      this.bindOuter()
    } else {
      this.unbindOuter()
    }

    this.setVisible(openState)
    e.preventDefault()
    e.stopPropagation()
  };

  onMouseEnter = (e) => {
    this.setVisible(true)
  };

  onMouseLeave = (e) => {
    this.setVisible(false)
  };

  render() {
    const props = this.props
    const prefix = props.prefix || ''
    const children = props.children

    invariant(children.length === 2,
      'The length of children should be equal to 2')

    const activeMethod = props.activeMethod

    const containerProp = {}

    if (activeMethod.indexOf('hover') !== -1) {
      containerProp.onMouseEnter = this.onMouseEnter
      containerProp.onMouseLeave = this.onMouseLeave
    }

    return (<span
      {...containerProp}
      className={classNames(
        {[`${props.className}`]: props.className},
        `${props.componentName}`,
        {[`${prefix}${props.componentName}`]: prefix},
        {[`${props.componentName}-hidden`]: !this.state.isOpen})
      }>
      {this.getDropdownToggle(children[0])}
      {this.getDropdownContent(children[1])}
    </span>)
  }
}
