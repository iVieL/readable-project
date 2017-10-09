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

export const hashCode = (str) => {
  var hash = 0, i, chr;
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr   = str.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}
