import Cookies from 'universal-cookie'

const cookies = new Cookies()
const LOGIN_KEY = 'readable-user'

export const getUser = () => {
  return cookies.get(LOGIN_KEY)
}

export const login = (user) => {
  cookies.set(LOGIN_KEY, user)
}

export const logout = () => {
  cookies.remove(LOGIN_KEY)
}
