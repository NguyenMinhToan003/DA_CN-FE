import { APIs } from '.'

export const getTeachers = async () => {
  const response = await APIs.get('/teacher/ds-giang-vien')
  return response.data
}
