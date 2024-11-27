import { Box, Button, Container, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '~/apis/authAPI'
const Login = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handlerLogin = async () => {
    const response = await login(username, password, 'student')
    if (response) {
      localStorage.setItem('user', JSON.stringify({ ...response, role: 'student' }))
      navigate('/')
    }
  }
  const handlerLogin2 = async () => {
    const response = await login(username, password, 'teacher')
    if (response) {
      localStorage.setItem('user', JSON.stringify({ ...response, role: 'teacher' }))
      navigate('/')
    }
  }
  return <>
    <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: '0', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000020' }}>
      <Container maxWidth='sm' sx={{
        borderRadius: 2,
        boxShadow: 24,
        p: 3,
        backgroundColor: 'secondary.main'
      }}>
        <Typography variant='h5' align='center' gutterBottom sx={{ fontWeight: 'bold' }}>
          Login
        </Typography>
        <TextField fullWidth label='Username' margin='normal'
          onChange={e => setUsername(e.target.value)}
          value={username}
          autoFocus
        />
        <TextField fullWidth label='Password' margin='normal' type='password'
          onChange={e => setPassword(e.target.value)}
          value={password}

        />
        <Button variant='contained' fullWidth sx={{ mt: 2, p: 1 }}
          onClick={handlerLogin}>
          Login
        </Button>
        <Button variant='contained' color='success' fullWidth sx={{ mt: 2, p: 1 }}
          onClick={handlerLogin2}>
          Login
        </Button>
      </Container>
    </Box>
  </>
}
export default Login