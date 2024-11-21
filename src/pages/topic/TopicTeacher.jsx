import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import TableRow from '@mui/material/TableRow'
import Table from '@mui/material/Table'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getDetailTopicById } from '~/apis/topicAPI'
import { confirmTopic, updateTopic, deleteTopic, removeStudent } from '~/apis/topicAPI'

const TopicTeacher = () => {
  const navigate = useNavigate()
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
  const handleConfimTopic = async () => {
    const response = await confirmTopic(user._id, id)
    if (response.acknowledged) {
      fetchTopic()
      toast.success('Xác nhận đề tài thành công')
    }
  }
  const handleDenyTopic = async () => {
    const response = await deleteTopic(id, user._id)
    if (response.acknowledged) {
      navigate('/')
      toast.success('Hủy đề tài thành công')
    }
  }
  const handleUpdateTopic = async () => {
    const response = await updateTopic(topic.name, topic.description, topic.tech, topic.process, id, user._id)
    if (response.modifiedCount > 0) {
      fetchTopic()
      toast.success('Cập nhật đề tài thành công')
    }
    else if (response.message) {
      toast.error(response.message)
    } else {
      toast.warning('Chưa có thay đổi')
    }
  }
  const handleRemoveStudent = async (studentId) => {
    const response = await removeStudent(id, studentId, user._id)
    if (response.acknowledged) {
      fetchTopic()
      toast.success(response.message)
    }
    toast.error(response.message)
  }
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
          onChange={(e) => setTopic({ ...topic, name: e.target.value })}
          fullWidth
          margin='normal' />
        <TextField
          label='Công nghệ'
          value={topic.tech}
          onChange={(e) => setTopic({ ...topic, tech: e.target.value })}
          variant='outlined'
          fullWidth
          margin='normal' />
        <TextField
          label='Mô tả'
          value={topic.description}
          onChange={(e) => setTopic({ ...topic, description: e.target.value })}
          variant='outlined'
          fullWidth
          multiline
          rows={4}
          margin='normal' />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1, mt: 2 }}>
          <Box>
            {
              topic.process === 0 ?
                <Box>
                  <Button variant='contained' color='error' sx={{ mr: 1 }}
                    onClick={handleDenyTopic}>
                    Hủy đề tài
                  </Button>
                  <Button variant='contained' color='primary'
                    onClick={handleConfimTopic} sx={{ mr: 1 }}>
                    Chấp nhận đề tài
                  </Button>
                </Box>
                : ''
            }

          </Box>
          <Button variant='contained' color='primary'
            onClick={handleUpdateTopic} >
            Lưu
          </Button>
        </Box>
      </Container>
      <Container sx={{ backgroundColor: 'secondary.main', p: 1, borderRadius: 1, mt: 2 }} maxWidth='md'>
        <TableContainer>
          <Typography variant='h5' gutterBottom>Thành Viên ({students.length})</Typography>
          <Divider />
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: 50 }}><strong>Mã</strong></TableCell>
                <TableCell sx={{ width: 'auto' }}><strong>Tên sinh viên</strong></TableCell>
                <TableCell sx={{ width: 100, whiteSpace: 'nowrap' }}><strong>Hành động</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                students.map((student, index) => (
                  <TableRow key={student._id}>
                    <TableCell>{student.studentCode}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>
                      <Button variant='contained' color='error'
                        onClick={() => handleRemoveStudent(student._id)}>Hủy</Button>
                    </TableCell>
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
export default TopicTeacher