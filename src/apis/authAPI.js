import { APIs } from '.'
export const login = async (email, password, user) => {
  const response = await APIs.post('/auth/login', { email, password, user })
  return response.data
}