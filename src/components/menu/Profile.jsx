import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import theme from '../../theme'
const Profile = ({ widthNav }) => {
  return (
    <Button
      variant='text'
      startIcon={<AccountCircleOutlinedIcon sx={{ width: 27, height: 27, mr: 2 }} />}
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingX: 3,
        paddingY: 2,
        borderRadius: 1,
        width: '100%',
        transition: 'width 0.3s ease',
        color: 'text.main',
        ':hover': {
          backgroundColor: 'primary.more'
        }
      }}
    >
      {
        widthNav === theme.Layout.navWidth && <Typography>Thông tin</Typography>
      }
    </Button>
  )
}
export default Profile