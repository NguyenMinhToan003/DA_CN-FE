import { Routes, Route } from 'react-router-dom'
import Index from '~/pages/home'
import HomeStudent from '~/pages/student/Home'
import Roomchats from '~/pages/Roomchats/Roomchats'
import Chat from '~/pages/chat/Chat'
import Profile from '~/pages/profile/Profile'
import Login from '~/pages/auth/Login'
import HomeTeacher from '~/pages/teacher/Home'
const AppRouter = () => {


  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Index />} >
        <Route index element={<HomeStudent />} />
        <Route path='teacher' element={<HomeTeacher />} />
        <Route path='profile' element={<Profile />} />
        <Route path='roomchats' element={<Roomchats />} />
        <Route path='resources' element={<HomeTeacher />} />
        <Route path='roomchats/chat/:id' element={<Chat />} />
        <Route path='*' element={<HomeStudent />} />
      </Route>
    </Routes>
  )
}
export default AppRouter
