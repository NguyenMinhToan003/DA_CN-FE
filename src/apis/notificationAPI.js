import { APIs } from '.'
export const getNotifications = async (id) => {
  const response = await APIs.get(`/notification/ds-notification?id=${id}`)
  return response?.data
}
export const sendNotification = async (title, description, teacherId) => {
  const response = await APIs.post('/notification/send-notification', { title, description, teacherId })
  return response?.data
}