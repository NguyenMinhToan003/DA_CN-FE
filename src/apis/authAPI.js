import { APIs } from '.'
export const login = async (email, password, user) => {
  const response = await APIs.post('/auth/login', { email, password, user })
  return response?.data
}
export const registerStudent = async (name, email, password, CLASS, studentCode) => {
  const response = await APIs.post('auth/student/register', {
    name: name,
    email: email,
    password: password,
    CLASS: CLASS,
    studentCode: studentCode
  })
  return response?.data
}
export const registerTeacher = async (name, email, password) => {
  const response = await APIs.post('/auth/teacher/register', {
    name: name,
    email: email,
    password: password
  })
  return response?.data
}