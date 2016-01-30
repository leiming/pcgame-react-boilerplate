// https://github.com/jquery/jquery/blob/1.12-stable/src/offset.js

import invariant from 'invariant'


/**
 * @see https://github.com/jquery/jquery/blob/1.12-stable/src/offset.js#L90
 * @param element
 * @returns {object}
 */
export function getOffset(element) {

  let domRect = {top: 0, left: 0}

  const doc = element && element.ownerDocument
  if (!doc) {
    return domRect
  }

  const docElement = doc.documentElement

  if (!contains(docElement, element)) {
    return domRect
  }

  const window = element.nodeType === 9 ? element.defaultView || element.parentWindow : {}

  // If we don't have gBCR, just use 0,0 rather than error
  // BlackBerry 5, iOS 3 (original iPhone)
  if (typeof element.getBoundingClientRect !== "undefined") {
    domRect = element.getBoundingClientRect()
  }

  // https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect
  const offset = {
    top   : domRect.top + ( window.pageYOffset || docElement.scrollTop ) - ( docElement.clientTop || 0 ),
    left  : domRect.left + ( window.pageXOffset || docElement.scrollLeft ) - ( docElement.clientLeft || 0 ),
    // 在IE8或者更低浏览器版本中，getBoudingClientRect()方法返回的TextRectangle对象没有height和width属性
    width : domRect.width || (domRect.right - domRect.left),
    height: domRect.height || (domRect.bottom - domRect.top)
  }

  return offset
}

/**
 * @see https://github.com/jquery/jquery/blob/1.12-stable/src/css/curCSS.js#L11
 * @param element
 * @returns {CssStyle}
 */
export function getStyles(element) {
  // Support: IE<=11+, Firefox<=30+ (#15098, #14150)
  // IE throws on elements created in popups
  // FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
  let view = element.ownerDocument.defaultView

  if (!view.opener) {
    view = window
  }

  return view.getComputedStyle(element)
}


/**
 * As in, an element does not contain itself
 * @see https://github.com/jquery/sizzle/blob/2.1-stable/src/sizzle.js#L709
 * @param container
 * @param element
 * @returns {Boolean}
 */
export function contains(container, element) {

  if (!element) {
    return false
  }

  if (rnative.test(element.compareDocumentPosition) || rnative.test(element.contains)) {
    return containsInNative(container, element)
  }

  while (element = element.parentNode) {
    if (container === element) {
      return true
    }
  }

  return false
}

// document.getElementById.toString() => "function getElementById() { [native code] }"
const rnative = /^[^{]+\{\s*\[native \w/;

function containsInNative(container, element) {
  invariant(document && Node, 'The runtime of `contains` function must be in browser')

  const containerDocument = container.nodeType === 9 ? container.documentElement : container
  const elementUp = element && element.parentNode

  if (containerDocument === elementUp) {
    return true
  }

  if (elementUp && elementUp.nodeType === 1) {

    if (containerDocument.contains) {
      return containerDocument.contains(elementUp)
    }

    if (containerDocument.compareDocumentPosition) {
      return !!(containerDocument.compareDocumentPosition(elementUp) & Node.DOCUMENT_POSITION_CONTAINED_BY)
    }
  }

  return false
}
