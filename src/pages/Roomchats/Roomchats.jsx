import Roomchat from './Roomchat'
import Box from '@mui/material/Box'
const Chats = () => {
  return (
    <>
      <Box sx={{ width: '100%', display: 'flex', gap: 1, padding: 2, flexDirection: 'column' }}>
        <Roomchat />
        <Roomchat />
        <Roomchat />
        <Roomchat />
        <Roomchat />
        <Roomchat />
      </Box>
    </>
  )
}
export default Chats