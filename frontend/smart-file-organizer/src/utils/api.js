import axios from 'axios'
import { getToken, logout } from './auth'

const api = axios.create({
    baseURL: 'http://localhost:8080',
})

// Attach JWT to every request
api.interceptors.request.use((config) => {
    const token = getToken()
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
})

// Auto-logout on 401
api.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.response?.status === 401) {
            logout()
            window.location.href = '/login'
        }
        return Promise.reject(err)
    }
)

export default api
