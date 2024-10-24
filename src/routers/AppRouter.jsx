import { Routes, Route } from 'react-router-dom'
import Index from '~/pages/home'
import Home from '~/pages/home/Home'
import Roomchats from '~/pages/roomchats/Roomchats'
import Chat from '~/pages/chat/Chat'
const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} >
        <Route index element={<Home />} />
        <Route path='roomchats' element={<Roomchats />} />
        <Route path='chats/:id' element={<Chat />} />
      </Route>
    </Routes>
  )
}
export default AppRouter
