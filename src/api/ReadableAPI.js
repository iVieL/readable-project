// include key from environment
const READABLE_KEY='ABCD1234'

const api = "http://localhost:5001"

const headers = {
  'Accept': 'application/json',
  'Authorization': READABLE_KEY
}

export function categories() {
  return fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)
}
