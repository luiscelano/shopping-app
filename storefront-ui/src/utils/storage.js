// get localStorage
export const getAccessToken = () => localStorage.getItem('accessToken')
export const getProfile = () => JSON.parse(localStorage.getItem('profile'))
export const getIsAuthenticated = () => getAccessToken()

// set localStorage
export const setAccessToken = (value) => localStorage.setItem('accessToken', value)
export const setProfile = (value) => localStorage.setItem('profile', JSON.stringify(value))
