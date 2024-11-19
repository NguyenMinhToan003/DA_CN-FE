import { Routes, Route } from 'react-router-dom'
import Index from '~/pages/index'
import Home from '~/pages/home'
import Roomchats from '~/pages/Roomchats/Roomchats'
import Chat from '~/pages/chat/Chat'
import Profile from '~/pages/profile/Profile'
import Login from '~/pages/auth/Login'
import Topic from '~/pages/topic'
const AppRouter = () => {

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Index />} >
        <Route index element={<Home />} />
        <Route path='topic/:id' element={<Topic />} />
        <Route path='profile' element={<Profile />} />
        <Route path='roomchats' element={<Roomchats />} />
        <Route path='roomchats/chat/:id' element={<Chat />} />
        <Route path='*' element={<Home />} />
      </Route>
    </Routes>
  )
}
export default AppRouter
