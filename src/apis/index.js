import axios from 'axios'
const api = axios.create({
  baseURL: 'http://localhost:4040/api/v1',
  withCredentials: true
})
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => Promise.reject(error)
)
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === StatusCodes.UNAUTHORIZED) {
      window.location = '/login'
    }
    return Promise.reject(error)
  }
)

export const APIs = api