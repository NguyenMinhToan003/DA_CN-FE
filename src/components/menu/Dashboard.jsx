import Button from '@mui/material/Button'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import { Typography } from '@mui/material'
import theme from '~/theme'


const Dashboard = ({ widthNav }) => {
  return (
    <Button
      variant='text'
      startIcon={<HomeOutlinedIcon sx={{ width: 27, height: 27, mr: 2 }} />}
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingX: 3,
        paddingY: 2,
        width: '100%',
        borderRadius: 1,
        transition: 'width 0.3s ease',
        color: 'text.main',
        '.active &': {
          color: 'secondary.more',
          backgroundColor: 'primary.more'
        },
        ':hover': {
          backgroundColor: 'primary.more'
        }
      }}
    >
      {
        widthNav === theme.Layout.navWidth && <Typography variant='body1'>Dashboard</Typography>
      }
    </Button>
  )
}
export default Dashboard