export function capitalize (str = '') {
  return typeof str !== 'string'
    ? ''
    : str[0].toUpperCase() + str.slice(1)
}

export function uniqueId() {
  return '_'+Math.random().toString(36).substr(2, 9)
}
