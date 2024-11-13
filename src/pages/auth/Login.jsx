import { Box, Button, Container, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { login } from '~/apis/authAPI'
const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handlerLogin = async () => {
    const response = await login(username, password, 'student')
    if (response) {
      localStorage.setItem('user', JSON.stringify(response))
      window.location.href = '/'
    }
  }
  return <>
    <Box>
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <TextField fullWidth label="Username" margin="normal"
          onChange={e => setUsername(e.target.value)}
          value={username}
        />
        <TextField fullWidth label="Password" margin="normal" type="password"
          onChange={e => setPassword(e.target.value)}
          value={password}
        />
        <Button variant="contained" fullWidth sx={{ mt: 2 }}
          onClick={handlerLogin}>
          Login
        </Button>
      </Container>
    </Box>
  </>
}
export default Login