import { APIs } from '.'

export const getTeachers = async () => {
  const response = await APIs.get('/teacher/ds-giang-vien')
  return response.data
}
export const confirmStudents = async (id, studentIds) => {
  const response = await APIs.post('/teacher/confim-students', { id: id, studentIds: studentIds })
  return response.data
}
