import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Checkbox from '@mui/material/Checkbox'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { login } from '~/apis/authAPI'
import CircularProgress from '@mui/material/CircularProgress'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import HttpsIcon from '@mui/icons-material/Https'

const Login = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [typePassword, setTypePassword] = useState('password')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handlerLogin = async () => {
    setLoading(true)
    const response = await login(username, password, 'student')
    if (response) {
      localStorage.setItem('user', JSON.stringify({ ...response, role: 'student' }))
      navigate('/')
    }
    setLoading(false)
  }
  const handlerLogin2 = async () => {
    setLoading(true)
    const response = await login(username, password, 'teacher')
    if (response) {
      localStorage.setItem('user', JSON.stringify({ ...response, role: 'teacher' }))
      navigate('/')
    }
    setLoading(false)
  }
  return <>
    <Box Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: '0', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#232b38', color: 'text.main' }}>
      <Box sx={{
        width: 500,
        height: 500,
        borderRadius: 2,
        p: 4,
        backgroundColor: 'secondary.main',
        border: '1px solid #ccc',
        boxShadow: 3
      }}>
        <Box sx={{ pb: 6 }}>
          <Typography variant='h4' sx={{ fontWeight: 'bold' }} align='center'>
            Đăng nhập
          </Typography>
        </Box>
        <TextField fullWidth label='Email' margin='normal'
          onChange={e => setUsername(e.target.value)}
          value={username}
          autoFocus
          InputProps={{
            startAdornment: (
              <InputAdornment position='start' >
                <AlternateEmailIcon />
              </InputAdornment>
            )
          }}

          sx={{ fontSize: 10 }}
        />
        <TextField fullWidth label='Password' margin='normal' type={typePassword}
          onChange={e => setPassword(e.target.value)}
          value={password}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <HttpsIcon />
              </InputAdornment>
            )
          }
          }
          sx={{ fontSize: 10 }}
        />
        <Box>
          <Checkbox id='showPassword'
            onChange={e => setTypePassword(e.target.checked ? 'text' : 'password')}
          />
          <Typography variant='caption' component='label' htmlFor='showPassword'>
            show password
          </Typography>
        </Box>
        <Button variant='contained' color='success' fullWidth
          sx={{
            mt: 2, p: 1.5, fontWeight: 'bold',
            fontSize: 14
          }}
          disabled={loading}
          startIcon={loading && <CircularProgress size={20} color='inherit' />}
          onClick={handlerLogin2}>
          GIÁO VIÊN
        </Button>
        <Button variant='contained' fullWidth
          sx={{
            mt: 2, p: 1.5, fontWeight: 'bold',
            fontSize: 14
          }}
          disabled={loading}
          startIcon={loading && <CircularProgress size={20} color='inherit' />}
          onClick={handlerLogin}>
          SINH VIÊN
        </Button>
        <Box sx={{ mt: 1 }}>
          <NavLink to='/register'>
            <Typography variant='caption' >
              Đăng ký tài khoản
            </Typography>
          </NavLink>
        </Box>
      </Box>
    </Box >
  </>
}
export default Login