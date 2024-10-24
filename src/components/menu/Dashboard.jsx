import Button from '@mui/material/Button'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import { Typography } from '@mui/material'
const Dashboard = () => {
  return (
    <Button
      variant='text'
      startIcon={<HomeOutlinedIcon sx={{ width: 27, height: 27, mr: 2 }} />}
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 3,
        width: '100%',
        borderRadius: 2,
        color: 'secondary.more',
        backgroundColor: 'primary.more',
        ':hover': {
          backgroundColor: 'primary.more'
        }
      }}
    >
      <Typography variant='body1'>Dashboard</Typography>
    </Button>
  )
}
export default Dashboard