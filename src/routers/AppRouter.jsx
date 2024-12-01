import { Routes, Route, useNavigate } from 'react-router-dom'
import Index from '~/pages/index'
import Home from '~/pages/home'
import Roomchats from '~/pages/Roomchats/Roomchats'
import Chat from '~/pages/chat/Chat'
import Profile from '~/pages/profile/Profile'
import Login from '~/pages/auth/Login'
import CreateResource from '~/pages/resources/Resource'
import Topic from '~/pages/topic'
import Register from '~/pages/auth/register'
const AppRouter = () => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))
  if (user === null) {
    navigate('/login')
  }


  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/' element={<Index />} >
        <Route index element={<Home />} />
        <Route path='topic/:id' element={<Topic />} />
        <Route path='profile' element={<Profile />} />
        <Route path='roomchats' element={<Roomchats />} />
        <Route path='resource/create' element={<CreateResource />} />
        <Route path='roomchats/chat/:id' element={<Chat />} />
        <Route path='*' element={<Home />} />
      </Route>
    </Routes>
  )
}
export default AppRouter
