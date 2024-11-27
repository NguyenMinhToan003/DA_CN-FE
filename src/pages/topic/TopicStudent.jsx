import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Table from '@mui/material/Table'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableContainer from '@mui/material/TableContainer'
import TableCell from '@mui/material/TableCell'
import Alert from '@mui/material/Alert'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getDetailTopicById } from '~/apis/topicAPI'
import Button from '@mui/material/Button'
import UploadResource from '~/components/popup/UploadResource'

const Topic = () => {
  const { id } = useParams()
  const [openUploadResource, setOpenUploadResource] = useState(false)
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
    setTopic({
      name: response.name,
      tech: response.tech,
      description: response.description,
      process: response.process,
      status: response.status
    })
    setStudents(response.students)
  }

  useEffect(() => {
    fetchTopic()
  }, [])

  return (
    <>
      <UploadResource open={openUploadResource} onClose={() => setOpenUploadResource(false)} />
      <Box
        sx={{
          display: 'flex',
          gap: 3,
          p: 2,
          flexDirection: {
            lg: 'row',
            xs: 'column'
          }
        }}
      >
        <Container
          sx={{ backgroundColor: 'secondary.main', p: 2, borderRadius: 3 }}
          maxWidth="xl"
        >
          <Typography variant="h6" sx={{ py: 3, fontWeight: 'bold' }}>
            Thông tin đề tài
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Alert
            severity={topic.process === 0 ? 'error' : 'success'}
            sx={{ m: 3 }}
          >
            Trạng thái: {topic.status[topic.process]}
          </Alert>
          <Divider sx={{ my: 3 }} />
          <TextField
            label="Tên đề tài"
            variant="outlined"
            value={topic.name}
            fullWidth
            sx={{ mb: 2 }}
            margin="normal"
          />
          <TextField
            label="Công nghệ"
            value={topic.tech}
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            margin="normal"
          />
          <TextField
            label="Mô tả"
            value={topic.description}
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            sx={{ mb: 2 }}
            margin="normal"
          />
        </Container>
        <Container
          sx={{ backgroundColor: 'secondary.main', borderRadius: 3 }}
          maxWidth="xl"
        >
          <TableContainer>
            <Typography variant="h6" sx={{ py: 3, fontWeight: 'bold' }}>
              Thành Viên ({students.length})
            </Typography>
            <Divider />
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Mã</TableCell>
                  <TableCell>Tên sinh viên</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student._id}>
                    <TableCell sx={{ whiteSpace: 'normal' }}>
                      {student.studentCode}
                    </TableCell>
                    <TableCell sx={{ whiteSpace: 'normal' }}>
                      {student.name}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>

      <Container maxWidth="2xl" sx={{ mb: 6 }}>
        <Box
          sx={{
            display: 'flex',
            gap: 3,
            backgroundColor: 'secondary.main',
            borderRadius: 3
          }}
        >
          <TableContainer>
            <Box
              sx={{ p: 3, display: 'flex', justifyContent: 'space-between' }}
            >
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Resource
              </Typography>
              <Button variant="contained" color="primary" onClick={() => setOpenUploadResource(true)}>
                Thêm mới
              </Button>
            </Box>
            <Divider />
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: 10 }}>STT</TableCell>
                  <TableCell sx={{ width: 200 }}>Tiêu đề</TableCell>
                  <TableCell sx={{ width: 'auto' }}>Nội dung</TableCell>
                  <TableCell sx={{ width: 300 }}>Link</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Sample Rows */}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </>
  )
}

export default Topic
