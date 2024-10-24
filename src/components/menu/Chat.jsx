import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Button, Typography } from '@mui/material';
const Chat = () => {
  return (
    <Button
      variant='text'
      startIcon={<MailOutlineIcon sx={{ width: 27, height: 27, mr: 2 }} />}

      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 3,
        borderRadius: 2,
        width: '100%',
        color: 'text.main',
        ':hover': {
          backgroundColor: 'primary.more'
        }
      }}
    >
      <Typography sx={{ fontWeight: 'bold', fontSize: '17px' }}>Tin nhắn</Typography>
    </Button>
  )
}
export default Chat