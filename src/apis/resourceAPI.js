import { APIs } from '.'
export const uploadResource = async (formData) => {
  const response = await APIs.post('/resource/upload', formData)
  return response?.data
}
export const getDsResource = async (topicId) => {
  const response = await APIs.get(`/resource/ds-resource?topicId=${topicId}`)
  return response?.data
}