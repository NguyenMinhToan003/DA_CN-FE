import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
const Profile = () => {
  return (
    <Button
      variant='text'
      startIcon={<AccountCircleOutlinedIcon sx={{ width: 27, height: 27, mr: 2 }} />}
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
      <Typography sx={{ fontWeight: 600, fontSize: '17px' }}>Thông tin</Typography>
    </Button>
  )
}
export default Profile