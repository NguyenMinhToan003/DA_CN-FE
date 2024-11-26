import { APIs } from '.'
export const uploadResource = async (formData) => {
  const response = await APIs.post('/resource/upload', formData)
  return response.data
}