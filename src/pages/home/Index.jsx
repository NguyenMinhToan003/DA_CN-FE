import HomeStudent from './HomeStudent'
import HomeTeacher from './HomeTeacher'

const Home = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  if (user?.role == 'teacher') {
    return <HomeTeacher />
  }
  else if (user?.role == 'student') {
    return <HomeStudent />
  }
}
export default Home