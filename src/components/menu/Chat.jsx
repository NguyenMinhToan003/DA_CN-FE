import MailOutlineIcon from '@mui/icons-material/MailOutline'
import { Button, Typography } from '@mui/material'
import theme from '~/theme'
const Chat = ({ widthNav }) => {
  return (
    <Button
      variant='text'
      startIcon={<MailOutlineIcon sx={{ width: 27, height: 27, mr: 2 }} />}
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingX: 2.6,
        paddingY: 2,
        borderRadius: 1,
        width: '100%',
        '.active &': {
          color: 'secondary.more',
          backgroundColor: 'primary.more'
        },
        transition: 'width 0.3s ease',
        color: 'text.main',
        ':hover': {
          backgroundColor: 'primary.more'
        }
      }}
    >
      {
        widthNav === theme.Layout.navWidth && <Typography>Tin nhắn</Typography>
      }
    </Button >
  )
}
export default Chat