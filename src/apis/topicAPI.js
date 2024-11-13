import { APIs } from '.'
export const createTopic = async (name, description, tech, studentId) => {
  const response = await APIs.post('/topic/create', { name, description, tech, studentId })
  return response.data
}
export const getTopicById = async (id) => {
  const response = await APIs.get(`/topic/detai?id=${id}`)
  return response.data
}