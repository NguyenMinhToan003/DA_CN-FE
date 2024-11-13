import { APIs } from '.'
export const student_teacher = (id, teacherId) => {
  return APIs.get(`/student/dk-giao-vien?id=${id}&teacherId=${teacherId}`)
}