import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import theme from '~/theme'


const Home = () => {
  const [formData, setFormData] = useState({
    projectName: '',
    projectType: '',
    projectDescription: '',
    teacher: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form Data Submitted: ', formData)
  }

  return (
    <Box sx={{
      display: 'flex', alignItems: 'center', minHeight: `calc(100vh - ${theme.Layout.headerHeight}px)`
    }}>
      <Container maxWidth='sm' sx={{ backgroundColor: 'secondary.main', mt: 2, padding: 2, borderRadius: 3 }}>
        <Box >
          <Typography variant='h5' gutterBottom sx={{ whiteSpace: 'nowrap' }}>
            Đăng Ký Đề Tài Đồ Án Chuyên Ngành
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label='Tên đề tài'
              variant='outlined'
              fullWidth
              margin='normal'
              name='projectName'
              value={formData.projectName}
              onChange={handleChange}
              required
            />
            <TextField
              label='Công nghệ sử dụng'
              variant='outlined'
              fullWidth
              margin='normal'
              name='projectType'
              value={formData.projectType}
              onChange={handleChange}
              required
            />
            <TextField
              label='Mô tả đề tài'
              variant='outlined'
              fullWidth
              margin='normal'
              name='projectDescription'
              value={formData.projectDescription}
              onChange={handleChange}
              multiline
              rows={4}
              required
            />
            <TextField
              label='Giáo viên hướng dẫn'
              variant='outlined'
              fullWidth
              margin='normal'
              name='teacher'
              value={formData.teacher}
              onChange={handleChange}
              required
            />
            <Button variant='contained' color='primary' type='submit' fullWidth sx={{ mt: 2, padding: 1 }}>
              Đăng Ký
            </Button>
          </form>
        </Box>
      </Container>
    </Box>
  )
}

export default Home
