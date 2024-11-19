import TopicTeacher from './TopicTeacher'
import TopicStudent from './TopicStudent'
const Topic = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  if (user.role === 'teacher') {
    return <TopicTeacher />
  }
  if (user?.role === 'student') {
    return <TopicStudent />
  }
}
export default Topic