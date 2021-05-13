/**
 * Compares if two paramaters are equal, supports Strict and Sloppy equality
 * @param {Array|Object|boolean|number|string} x The first item to compare
 * @param {Array|Object|boolean|number|string} y The second item to compare
 * @param {boolean} [strict=true] Optional should the comparison be strict (Default: true)
 * @returns {boolean} true if x and x are equal, false if not
 */
function isDeepEqual (x, y, strict = true) {
  // type
  if (strict && typeof x !== typeof y) return false

  // simple values, null, undefined
  if (typeof x !== 'object' || x === null || x === undefined || typeof x === 'boolean') return strict ? x === y : x == y

  // array
  const xIsArr = Array.isArray(x)
  const yIsArr = Array.isArray(y)

  if (xIsArr !== yIsArr) return false
  if (xIsArr && yIsArr) {
    if (x.length !== y.length) return false
    for (let i = 0; i < x.length; i++) {
      if (!isDeepEqual(x[i], y[i], strict)) return false
    }
    return true
  }

  // object
  if (typeof x === 'object') {
    const keysOfX = Object.keys(strict ? x : Object.fromEntries(Object.entries(x).filter(fx => fx[1] !== undefined)))
    const keysOfY = Object.keys(strict ? y : Object.fromEntries(Object.entries(y).filter(fy => fy[1] !== undefined)))

    if (!isDeepEqual(keysOfX, keysOfY, strict)) return false

    for (const key of keysOfX) {
      if (!isDeepEqual(x[key], y[key], strict)) return false
    }

    return true
  }
}

module.exports = isDeepEqual
