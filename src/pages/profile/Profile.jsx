import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Container from '@mui/material/Container'
import { useEffect, useState } from 'react'

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  console.log(user)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [classs, setClass] = useState('')
  const [mssv, setMssv] = useState('')
  const [avatar, setAvatar] = useState('')
  const fetchProfile = () => {
    setName(user?.name)
    setEmail(user?.email)
    setClass(user?.CLASS)
    setMssv(user?.studentCode)
    setAvatar(user?.avatar)
  }
  useEffect(() => {
    fetchProfile()
  }, [])
  return (
    <>
      <Container maxWidth='xl' sx={{
        p: 3, display: 'flex', gap: 3,
        flexDirection: {
          lg: 'row',
          xs: 'column'
        }
      }}>
        <Box sx={{ minWidth: 400, height: 300, bgcolor: 'secondary.main', borderRadius: 3 }}>
          <Typography variant='body2' sx={{ fontWeight: 'bold', p: 3 }} >
            Profile Picture
          </Typography>
          <Divider />
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Avatar sx={{ width: 100, height: 100 }} src={avatar} />
          </Box>
          <Box sx={{ py: 3, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <input type='file' accept='image/*' id='image' style={{ display: 'none' }} />
            <Button variant='contained' color='primary' sx={{ fontWeight: 'bold' }}
              component='label' htmlFor='image'
            >
              UPLOAD AVATAR
            </Button>
          </Box>
        </Box>
        <Box sx={{ width: '100%', bgcolor: 'secondary.main', borderRadius: 3 }}>
          <Typography variant='body2' sx={{ fontWeight: 'bold', p: 3 }} >
            Thông tin cá nhân
          </Typography>
          <Divider />
          <Box sx={{ p: 3 }}>
            <TextField
              fullWidth
              label='Tên'
              value={name}
              onChange={e => setName(e.target.value)}
              margin='normal'
              sx={{ fontSize: 10 }}
            />
            <TextField
              fullWidth
              label='Email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              margin='normal'
              sx={{ fontSize: 10 }}
            />
            <TextField
              fullWidth
              label='Lớp'
              value={classs}
              onChange={e => setClass(e.target.value)}
              margin='normal'
              sx={{ fontSize: 10 }}
            />
            <TextField
              fullWidth
              label='MSSV'
              value={mssv}
              onChange={e => setMssv(e.target.value)}
              margin='normal'
              sx={{ fontSize: 10 }}
            />
          </Box>
          <Box sx={{ p: 3 }}>
            <Button variant='contained' color='primary' sx={{ fontWeight: 'bold' }}>
              UPDATE PROFILE
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  )
}
export default Profile