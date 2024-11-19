import { Alert, Box, Button, Chip, Container, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getDetailTopicById } from '~/apis/topicAPI'
import { confirmTopic, updateTopic } from '~/apis/topicAPI'

const Topic = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const { id } = useParams()
  const [topic, setTopic] = useState({
    name: '',
    tech: '',
    description: '',
    process: 0,
    status: []
  })

  const [students, setStudents] = useState([])
  const fetchTopic = async () => {
    const response = await getDetailTopicById(id)
    setTopic(() => ({
      name: response.name,
      tech: response.tech,
      description: response.description,
      process: response.process,
      status: response.status
    }))
    setStudents(response.students)
  }
  useEffect(() => {
    fetchTopic()
  }, [])
  return <>
    <Box sx={{ display: 'flex', gap: 3, p: 2 }}>
      <Container sx={{ backgroundColor: 'secondary.main', p: 2, borderRadius: 1 }} maxWidth='md'>
        <Typography variant='h5' gutterBottom>Thông tin đề tài</Typography>
        <Alert severity={topic.process === 0 ? 'error' : 'success'}>Trạng thái: {topic.status[topic.process]}</Alert>
        <Divider />
        <TextField
          label='Tên đề tài'
          variant='outlined'
          value={topic.name}
          fullWidth
          margin='normal' />
        <TextField
          label='Công nghệ'
          value={topic.tech}
          variant='outlined'
          fullWidth
          margin='normal' />
        <TextField
          label='Mô tả'
          value={topic.description}
          variant='outlined'
          fullWidth
          multiline
          rows={4}
          margin='normal' />
      </Container>
      <Container sx={{ backgroundColor: 'secondary.main', p: 1, borderRadius: 1, mt: 2 }} maxWidth='md'>
        <TableContainer>
          <Typography variant='h5' gutterBottom>Thành Viên ({students.length})</Typography>
          <Divider />
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: 50 }}>Mã</TableCell>
                <TableCell sx={{ width: 'auto' }}>Tên sinh viên</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                students.map((student, index) => (
                  <TableRow key={student._id}>
                    <TableCell>{student.studentCode}</TableCell>
                    <TableCell>{student.name}</TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box >
  </>
}
export default Topic