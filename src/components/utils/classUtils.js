import classnames from 'classnames'
import invariant from 'invariant'

export function getClassNames(prefix, ...classNames) {

  const classNamesType = Object.prototype.toString.apply(classNames)
  invariant(classNamesType === '[object Array]'
    || classNamesType === '[object String]', 'The type classNames must be string or array')

  for (let value of classNames) {
    console.log(value)
  }

}