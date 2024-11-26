import { APIs } from '.'
export const student_teacher = async (id, teacherId) => {
  const response = await APIs.get(`/student/dk-giao-vien?id=${id}&teacherId=${teacherId}`)
  return response.data
}
export const getListStudentByTeacherId = async (id, status = -1, process = -1, topic = -1) => {
  const response = await APIs.get(`/student/support-teacher/ds-sinh-vien?id=${id}&status=${status}&process=${process}&topic=${topic}`)
  return response.data
}
export const getStudentById = async (id) => {
  const response = await APIs.post('/student', { id: id })
  return response.data
}
