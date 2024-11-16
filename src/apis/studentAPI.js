import { APIs } from '.'
export const student_teacher = async (id, teacherId) => {
  const response = await APIs.get(`/student/dk-giao-vien?id=${id}&teacherId=${teacherId}`)
  return response.data
}
export const getListStudentByTeacherId = async (id) => {
  const response = await APIs.get(`/student/support-teacher/ds-sinh-vien?id=${id}`)
  return response.data
}
