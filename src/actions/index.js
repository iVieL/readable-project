export const GET_CATEGORIES = 'GET_CATEGORIES'
export const LOGIN = 'LOGIN'

export function getCategories( { categories } ) {
  return {
    type: GET_CATEGORIES,
    categories: categories
  }
}

export function session( { user, loggedIn }) {
  return {
    type: LOGIN,
    user: user,
    loggedIn: loggedIn
  }
}