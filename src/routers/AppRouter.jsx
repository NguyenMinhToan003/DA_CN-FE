import { Routes, Route } from 'react-router-dom'
import Index from '~/pages/home'
import Home from '~/pages/home/Home'
import Roomchats from '~/pages/Roomchats/Roomchats'
import Chat from '~/pages/chat/Chat'
import Profile from '~/pages/profile/Profile'

const AppRouter = () => {


  return (
    <Routes>
      <Route path="/" element={<Index />} >
        <Route index element={<Home />} />
        <Route path='profile' element={<Profile />} />
        <Route path='roomchats' element={<Roomchats />} />
        <Route path='roomchats/chat/:id' element={<Chat />} />
        <Route path='*' element={<Home />} />
      </Route>
    </Routes>
  )
}
export default AppRouter