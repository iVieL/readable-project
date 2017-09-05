import dateformat from 'dateformat'

export function capitalize (str = '') {
  return typeof str !== 'string'
    ? ''
    : str[0].toUpperCase() + str.slice(1)
}

export function uniqueId() {
  return '_'+Math.random().toString(36).substr(2, 9)
}

export function formatDate(timestamp) {
  return dateformat(timestamp, 'yyyy-mm-dd hh:MM:ss')
}
