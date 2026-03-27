export const getToken = () => localStorage.getItem('sfo_token')
export const setToken = (token) => localStorage.setItem('sfo_token', token)
export const getUser = () => {
    try { return JSON.parse(localStorage.getItem('sfo_user')) } catch { return null }
}
export const setUser = (user) => localStorage.setItem('sfo_user', JSON.stringify(user))
export const logout = () => {
    localStorage.removeItem('sfo_token')
    localStorage.removeItem('sfo_user')
}
export const isLoggedIn = () => !!getToken()
