import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'
import HttpsIcon from '@mui/icons-material/Https'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import QrCodeIcon from '@mui/icons-material/QrCode'
import SchoolIcon from '@mui/icons-material/School'
import { registerStudent, registerTeacher } from '~/apis/authAPI'
import { toast } from 'react-toastify'
import { Alert } from '@mui/material'


const Register = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [typePassword, setTypePassword] = useState('password')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [CLASS, setCLASS] = useState('')
  const [studentCode, setStudentCode] = useState('')
  const [checkFields, setCheckFields] = useState({
    name: true,
    email: true,
    password: true,
    rePassword: true,
    CLASS: true,
    studentCode: true
  })
  const handlerCheckFields = () => {
    const check = {
      name: true,
      email: true,
      password: true,
      rePassword: true,
      CLASS: true,
      studentCode: true
    }
    if (name === '') check.name = false
    if (email === '') check.email = false
    if (password === '') check.password = false
    if (rePassword === '') check.rePassword = false
    if (CLASS === '') check.CLASS = false
    if (studentCode === '') check.studentCode = false
    if (password !== rePassword) check.rePassword = false
    setCheckFields(check)
  }
  const isFalseFields = () => {
    return Object.values(checkFields).some(v => v === false)
  }
  const handlerRegisterStudent = async () => {
    handlerCheckFields()
    const check = isFalseFields()
    if (!check) {
      setLoading(true)
      const response = await registerStudent(name, email, password, CLASS, studentCode)
      if (response) {
        toast.success(response.message)
        localStorage.setItem('user', JSON.stringify({ ...response, role: 'student' }))
        navigate('/login')
      }
      setLoading(false)
    }
  }
  const handlerRegisterTeacher = async () => {
    handlerCheckFields()
    const check = isFalseFields()
    if (!check) {
      setLoading(true)
      const response = await registerTeacher(name, email, password)
      if (response) {
        toast.success(response.message)
        navigate('/login')
      }
      setLoading(false)
    }
  }

  return <>
    <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: '0', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#232b38', color: 'text.main' }}>
      <Box sx={{
        width: 500,
        borderRadius: 2,
        p: 4,
        backgroundColor: 'secondary.main',
        border: '1px solid #ccc',
        boxShadow: 3
      }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant='h4' sx={{ fontWeight: 'bold' }} align='center'>
            Đăng ký tài khoản
          </Typography>
          {
            isFalseFields() && <Alert severity='error' sx={{ mt: 1 }}>
              Thông tin không hợp lệ
            </Alert>
          }
        </Box>
        <TextField fullWidth label='Email' margin='normal'
          onChange={e => setEmail(e.target.value)}
          value={email}
          autoFocus
          error={!checkFields.email}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start' >
                <AlternateEmailIcon />
              </InputAdornment>
            )
          }}
          sx={{ fontSize: 10 }}
        />
        <TextField fullWidth label='Mật khẩu' margin='normal' type={typePassword}
          onChange={e => setPassword(e.target.value)}
          value={password}
          error={!checkFields.password}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <HttpsIcon />
              </InputAdornment>
            )
          }}
          sx={{ fontSize: 10 }}
        />
        <TextField fullWidth label='Nhập lại mật khẩu' margin='normal' type={typePassword}
          error={!checkFields.rePassword}
          onChange={e => setRePassword(e.target.value)}
          value={rePassword}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <HttpsIcon />
              </InputAdornment>
            )
          }}
          sx={{ fontSize: 10 }}
        />
        <TextField fullWidth label='Họ và tên' margin='normal'
          onChange={e => setName(e.target.value)}
          error={!checkFields.name}
          value={name}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start' >
                <PermIdentityIcon />
              </InputAdornment>
            )
          }}
          sx={{ fontSize: 10 }}
        />

        <TextField fullWidth label='Mã sinh viên' margin='normal'
          onChange={e => setStudentCode(e.target.value)}
          error={!checkFields.studentCode}
          value={studentCode}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <QrCodeIcon />
              </InputAdornment>
            )
          }}
          sx={{ fontSize: 10 }}
        />
        <TextField fullWidth label='Lớp' margin='normal'
          onChange={e => setCLASS(e.target.value)}
          error={!checkFields.CLASS}
          value={CLASS}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SchoolIcon />
              </InputAdornment>
            )
          }}
          sx={{ fontSize: 10 }}
        />
        <Button variant='contained' color='success' fullWidth
          sx={{
            mt: 2, p: 1.5, fontWeight: 'bold',
            fontSize: 14
          }}
          onClick={handlerRegisterTeacher}
          disabled={loading}
          startIcon={loading && <CircularProgress size={20} color='inherit' />}
        >
          GIÁO VIÊN
        </Button>
        <Button variant='contained' fullWidth
          sx={{
            mt: 2, p: 1.5, fontWeight: 'bold',
            fontSize: 14
          }}
          onClick={handlerRegisterStudent}
          disabled={loading}
          startIcon={loading && <CircularProgress size={20} color='inherit' />}
        >
          SINH VIÊN
        </Button>
        <Box sx={{ mt: 1 }}>
          <NavLink to='/login'>
            <Typography variant='caption' >
              Đã có tài khoản
            </Typography>
          </NavLink>
        </Box>
      </Box>
    </Box >
  </>
}
export default Register