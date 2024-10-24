import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
const Roomchat = () => {
  const roomChat = {
    _id: '1',
    avatarRoom: 'https://i.pravatar.cc/300',
    room_name: 'Đồ án công nghệ phần mền đại học công nghệ thông tin 2021',
  }
  let id = useParams().id
  const navigate = useNavigate()
  return <>
    <NavLink
      to={`/chats/${roomChat._id}`}
      sx={{
        display: 'flex !important',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 1,
        width: '100%',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        ':hover': {
          iconButton: { backgroundColor: '#f0f0f0f0' },
          '& .iconMore': { backgroundColor: '#f0f0f0f0', zIndex: 10 }
        },
        backgroundColor: 'secondary.main',
        borderRadius: 2,
        paddingX: 2
      }
      } >
      <Box
        onClick={() => handleChooseRoom()}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: 2,
          width: '100%',
          paddingY: 1
        }}>
        <Avatar src={roomChat?.avatarRoom}
          sx={{
            cursor: 'pointer',
            width: '4rem',
            height: '4rem'
          }} />
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start'
          }}>
          <Typography
            variant='body1'
            sx={{
              color: 'text.main',
              whiteSpace: 'nowrap',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {roomChat?.room_name}
          </Typography>
          <Typography
            variant='body2'
            sx={{
              color: 'text.secondary',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              ml: 1
            }}
          >
            Chao sinh vien khoa cong nghe thong tin
          </Typography>
        </Box>
      </Box>

    </NavLink >
  </>
}
export default Roomchat