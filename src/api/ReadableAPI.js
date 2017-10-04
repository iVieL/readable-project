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

export function newPost(body) {
  return fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json())
}

export function editPost(body) {
  return fetch(`${api}/posts/${body.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json())
}

export function deletePost(body) {
  return fetch(`${api}/posts/${body.id}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then( res => console.log('deleted!?', res))
}

export function getAll() {
  return fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then(data => data.filter( post => !post.deleted))
}

export function postsByCategory(selected) {
  return fetch(`${api}/${selected}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)
}

export function getPost(id) {
  return fetch(`${api}/posts/${id}`, { headers })
    .then(res => res.json())
    .then(data => data)
}

export function votePost(id, option) {
  return fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( { option } )
  })
    .then(res => res.json())
    .then(data => data)
}

export function postComments(id) {
  return fetch(`${api}/posts/${id}/comments`, { headers })
    .then(res => res.json())
    .then(data => data.filter( comment => !comment.deleted && !comment.parentDeleted))
}

export function voteComment(id, option) {
  return fetch(`${api}/comments/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( { option } )
  })
    .then(res => res.json())
    .then(data => data)
}

export function deleteComment(id) {
  return fetch(`${api}/comments/${id}`, {
    method: 'DELETE',
    headers
  })
    .then(res => res.json())
    .then(data => data)
}

export function editComment(id, body) {
  return fetch(`${api}/comments/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( body )
  })
    .then(res => res.json())
    .then(data => data)
}
