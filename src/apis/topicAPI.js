import { APIs } from '.'
export const createTopic = async (name, description, tech, studentId) => {
  const response = await APIs.post('/topic/create', { name, description, tech, studentId })
  return response.data
}
export const getTopicById = async (id) => {
  const response = await APIs.get(`/topic/detail?id=${id}`)
  return response.data
}
export const joinTopic = async (topicId, studentIds) => {
  const response = await APIs.post('/topic/join', { topicId: topicId, studentIds: studentIds })
  return response.data
}
export const getTopicByTeacherId = async (id) => {
  const response = await APIs.get(`/topic/suport-teacher/ds-de-tai?id=${id}`)
  return response.data
}
export const confirmTopic = async (teacherId, ids) => {
  const response = await APIs.post('/topic/suport-teacher/xac-nhan-topics',
    { teacherId: teacherId, ids: ids })
  return response.data
}