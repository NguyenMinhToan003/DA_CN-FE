import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import theme from '~/theme'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import ThemeMode from '~/components/ThemeMode'
import MenuIcon from '@mui/icons-material/Menu'
import { getNotifications } from '~/apis/notificationAPI'
import Badge from '@mui/material/Badge'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getStudentById } from '../apis/studentAPI'

const Header = ({ toggleNav, widthNav }) => {
  const userLocal = JSON.parse(localStorage.getItem('user'))
  const [user, setUser] = useState({})

  const [notifications, setNotifications] = useState([])
  const fetchNotifications = async () => {
    // let id = ''
    // if (user?.role === 'student') id = user?.teacherId
    // if (user?.role === 'teacher') id = user?._id
    // const response = await getNotifications(id)
    // if (response) {
    //   setNotifications(response)
    // }
  }
  const fetchUser = async () => {
    if (userLocal.role === 'student') {
      const userFetch = await getStudentById(userLocal?._id)
      setUser(userFetch)
    }
    else {
      setUser(userLocal)
    }
  }
  useEffect(() => {
    fetchUser()
    fetchNotifications()
  }, [])
  return (
    <Box sx={{
      position: 'sticky',
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: 'primary.header',
      height: theme.Layout.headerHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 2,
      zIndex: 1000,
      boxShadow: '0 0 5px rgba(0,0,0,0.2)'
    }}>

      <Box sx={{ width: widthNav, display: 'flex', transition: 'transform 0.3s ease' }}>

        <Tooltip title='menu'>
          <IconButton onClick={toggleNav} sx={{ color: 'text.default' }}>
            <MenuIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Box sx={{
        height: '100%',
        width: '100%', display: 'flex', gap: 2, justifyContent: 'flex-end', alignItems: 'center',
        flexDirection: {
          xs: 'column-reverse',
          sm: 'row'
        }
      }}>

        <Box sx={{
          display: 'flex', justifyContent: 'flex-end', alignItems: 'center'
        }}>
          <ThemeMode />
          <IconButton color='success'>
            <Badge badgeContent={notifications.length} color='error'>
              <NotificationsNoneIcon sx={{ color: 'text.default' }} />
            </Badge>
          </IconButton>
          <Typography sx={{
            ml: 2, color: 'text.default',
            whiteSpace: 'nowrap'
          }} >
            <NavLink
              to='/login' style={{ textDecoration: 'none', color: 'inherit' }}>
              {user?.name}
            </NavLink>
          </Typography>
          <Avatar sx={{ ml: 2 }} />
        </Box>
      </Box>
    </Box >
  )
}
export default Header