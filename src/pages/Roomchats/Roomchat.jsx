import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import { NavLink, useNavigate, useParams } from 'react-router-dom'

const menuColor = [
  '#ff413a',
  '#ff851b',
  '#00ac69',
  '#3366ff'
]

const Roomchat = () => {
  const randomColor = menuColor[Math.floor(Math.random() * menuColor.length)]
  const roomChat = {
    _id: '1',
    avatarRoom: 'https://i.pravatar.cc/300',
    room_name: 'Đồ án công nghệ phần mền đại học công nghệ thông tin 2021'
  }
  const navigate = useNavigate()

  return (
    <>
      <Box
        sx={{
          height: 150,
          backgroundColor: 'secondary.main',
          width: '100%',
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Box sx={{ height: '100%', padding: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar sx={{ width: 50, height: 50 }} />
          <NavLink to={`chat/${roomChat._id}`}>
            <Typography sx={{ color: 'text.primary', transition: '.25 all ease-out', ':hover': { textDecoration: 'underline', color: randomColor } }}>{roomChat.room_name}</Typography>
          </NavLink>
        </Box>
        <Box
          sx={{
            minHeight: 40,
            maxHeight: 40,
            width: '100%',
            backgroundColor: randomColor,
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            borderRadius: '0 0 7px 7px',
            padding: 1
          }}
        >
          <Typography sx={{ color: 'text.default' }}>Room Chat</Typography>
        </Box>
      </Box>
    </>
  )
}

export default Roomchat
