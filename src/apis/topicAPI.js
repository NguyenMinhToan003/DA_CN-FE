import { APIs } from '.'
export const createTopic = async (name, description, tech, studentId) => {
  const response = await APIs.post('/topic/create', { name, description, tech, studentId })
  return response.data
}
export const getTopicById = async (id) => {
  const response = await APIs.get(`/topic/info?id=${id}`)
  return response.data
}
export const getDetailTopicById = async (id) => {
  const response = await APIs.get(`/topic/detail?id=${id}`)
  return response.data[0]
}
export const createEmptyTopic = async (teacherId, studentId) => {
  const response = await APIs.post('/topic/suport-teacher/create-empty',
    { teacherId: teacherId, studentId: studentId })
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
export const updateTopic = async (name, description, tech, process, id, teacherId) => {
  const response = await APIs.put('/topic/update',
    {
      name: name,
      description: description,
      tech: tech,
      process: process,
      id: id,
      teacherId: teacherId
    })
  return response.data
}
export const confirmTopic = async (teacherId, topicId) => {
  const response = await APIs.post('/topic/suport-teacher/xac-nhan-topics',
    { teacherId: teacherId, topicId: topicId })
  return response.data
}
export const deleteTopic = async (id, teacherId) => {
  const response = await APIs.post('/topic/delete-topic', { id: id, teacherId: teacherId })
  return response.data
}
export const removeStudent = async (topicId, studentId, teacherId) => {
  const response = await APIs.post('/topic/suport-student/remove-student',
    { topicId: topicId, studentId: studentId, teacherId: teacherId })
  return response.data
}

