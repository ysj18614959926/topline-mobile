export const setUser = (data) => {
  return window.localStorage.setItem('user', JSON.stringify(data))
}
export const getUser = () => {
  return JSON.stringify(window.localStorage.getItem('user'))
}
export const removeUser = () => {
  return window.localStorage.removeItem('user')
}
