import * as ReadableAPI from '../api/ReadableAPI'

export const GET_CATEGORIES = 'GET_CATEGORIES'
export const CHANGE_CATEGORY = 'CHANGE_CATEGORY'
export const LOGIN = 'LOGIN'
export const POSTS = 'POSTS'
export const GET_POST = 'GET_POST'
export const CLEAR_POST = 'CLEAR_POST'

export function getCategories( { categories } ) {
  return {
    type: GET_CATEGORIES,
    categories: categories
  }
}

export const fetchCategories = () =>{
  return (dispatch) => {
    ReadableAPI.categories()
      .then((categories) => {
        dispatch(getCategories({categories}))
      })
  }
}

export function session( { user, loggedIn }) {
  return {
    type: LOGIN,
    user: user,
    loggedIn: loggedIn
  }
}

export function changeCategory({ categoryName }) {
  return {
    type: CHANGE_CATEGORY,
    filter: categoryName
  }
}

export function postsAction( { posts, filterCategory } ) {
  return {
    type: POSTS,
    posts: posts,
    filter: filterCategory
  }
}

export function getPost( post ) {
  return {
    type: GET_POST,
    post
  }
}

export function clearPost() {
  return {
    type: GET_POST,
    post: undefined
  }
}

export const fetchPost = (id) => (dispatch) => {
  return ReadableAPI.getPost(id)
    .then( (post) => {
      dispatch(getPost(post))
    })
}

export const filterByCategory = (categoryName) => (dispatch) => {
  if(categoryName) {
    ReadableAPI.postsByCategory(categoryName)
      .then( (posts) => {
        dispatch( postsAction({ posts, filter: categoryName }) )
      })

  } else {
    ReadableAPI.getAll()
      .then( (posts) => {
        dispatch( postsAction({ posts, filter: undefined }))
      })
  }

}
