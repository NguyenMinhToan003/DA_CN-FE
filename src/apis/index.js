import axios from 'axios'
import { StatusCodes } from 'http-status-codes'
import { toast } from 'react-toastify'
const api = axios.create({
  baseURL: 'http://localhost:4040/api/v1',
  withCredentials: true
})
api.interceptors.request.use(
  // config => {
  //   const token = localStorage.getItem('token')
  //   if (token) {
  //     config.headers.Authorization = `Bearer ${token}`
  //   }
  //   return config
  // },
  // error => Promise.reject(error)
)
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === StatusCodes.UNAUTHORIZED) {
      window.location = '/login'
    }
    if (error.response.status === StatusCodes.BAD_REQUEST) {
      toast.error(error.response.data.message.details[0].message)
    }
  }
)

export const APIs = api