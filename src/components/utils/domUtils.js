// https://github.com/jquery/jquery/blob/1.12-stable/src/offset.js

import invariant from 'invariant'

export function getOffset(element) {
  const doc = element && element.ownerDocument
  if (!doc) {
    return null
  }

  const docElement = doc.documentElement

}

export function getSyle(element) {
  // Support: IE<=11+, Firefox<=30+ (#15098, #14150)
  // IE throws on elements created in popups
  // FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
  var view = elem.ownerDocument.defaultView

  if ( !view.opener ) {
    view = window
  }

  return view.getComputedStyle(element)
}


/**
 * @see https://github.com/jquery/sizzle/blob/2.1-stable/src/sizzle.js#L709
 * @param container
 * @param element
 * As in, an element does not contain itself
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
