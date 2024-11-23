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
import AddResource from '~/utils/popups/addResource'
import { useConfirm } from 'material-ui-confirm'
import { Button } from '@mui/material'

const Topic = () => {
  const { id } = useParams()
  const confirm = useConfirm()
  const [topic, setTopic] = useState({
    name: '',
    tech: '',
    description: '',
    process: 0,
    status: []
  })
  const [resources, setResources] = useState([])
  const [resourceName, setResourceName] = useState('')
  const [resourceDescription, setResourceDescription] = useState('')
  const [resourceLink, setResourceLink] = useState('')

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
  const handleAddResource = () => {
    confirm({
      title: 'Thêm tài nguyên',
      description: <AddResource
        resourceName={resourceName}
        setResourceName={setResourceName}
        resourceDescription={resourceDescription}
        setResourceDescription={setResourceDescription}
        resourceLink={resourceLink}
        setResourceLink={setResourceLink}
      />
    })
      .then(() => {
        // Action for confirmation
      })
      .catch(() => {
        // Action for cancellation
      })
  }


  return <>

    <Box sx={{
      display: 'flex', gap: 3, p: 2, flexDirection: {
        lg: 'row',
        xs: 'column'
      }
    }}>
      <Container sx={{ backgroundColor: 'secondary.main', p: 2, borderRadius: 3 }} maxWidth='xl'>
        <Typography variant='h6' sx={{ py: 3, fontWeight: 'bold' }}>Thông tin đề tài</Typography>
        <Divider sx={{ mb: 3 }} />
        <Alert severity={topic.process === 0 ? 'error' : 'success'}
          sx={{ m: 3 }}>
          Trạng thái: {topic.status[topic.process]}
        </Alert>
        <Divider sx={{ my: 3 }} />
        <TextField
          label='Tên đề tài'
          variant='outlined'
          value={topic.name}
          fullWidth
          sx={{ mb: 2 }}
          margin='normal' />
        <TextField
          label='Công nghệ'
          value={topic.tech}
          variant='outlined'
          sx={{ mb: 2 }}
          fullWidth
          margin='normal' />
        <TextField
          label='Mô tả'
          value={topic.description}
          variant='outlined'
          sx={{ mb: 2 }}
          fullWidth
          multiline
          rows={4}
          margin='normal' />
      </Container>
      <Container sx={{ backgroundColor: 'secondary.main', borderRadius: 3 }} maxWidth='xl'>

        <TableContainer>
          <Typography variant='h6' sx={{ py: 3, fontWeight: 'bold' }}>Thành Viên ({students.length})</Typography>
          <Divider />
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Mã</TableCell>
                <TableCell>Tên sinh viên</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                students.map((student, index) => (
                  <TableRow key={student._id}>
                    <TableCell sx={{ whiteSpace: 'normal' }}>{student.studentCode}</TableCell>
                    <TableCell sx={{ whiteSpace: 'normal' }}>{student.name}</TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box >

    <Container maxWidth='2xl' sx={{ mb: 6 }}>
      <Box sx={{ display: 'flex', gap: 3, backgroundColor: 'secondary.main', borderRadius: 3 }}>
        <TableContainer>
          <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant='h6' sx={{ fontWeight: 'bold' }}>Resource</Typography>
            <Button variant='contained' color='primary' onClick={handleAddResource}>Thêm mới</Button>
          </Box>
          <Divider />
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: 10 }}>STT</TableCell>
                <TableCell sx={{ width: 200 }}> Tiêu đề</TableCell>
                <TableCell sx={{ width: 'auto' }}>Nội dung</TableCell>
                <TableCell sx={{ width: 300 }}>Link</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>Slide</TableCell>
                <TableCell>Nội dung</TableCell>
                <TableCell><img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src='https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1msOOR.img' /></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2</TableCell>
                <TableCell>Document</TableCell>
                <TableCell>Nội dung</TableCell>
                <TableCell>https://www.google.com</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2</TableCell>
                <TableCell>Document</TableCell>
                <TableCell>Nội dunghttps://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1msOOR.imghttps://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1msOOR.imghttps://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1msOOR.imghttps://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1msOOR.imghttps://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1msOOR.imghttps://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1msOOR.imghttps://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1msOOR.imghttps://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1msOOR.img</TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2</TableCell>
                <TableCell>Document</TableCell>
                <TableCell>Nội dung</TableCell>
                <TableCell>https://www.google.com</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2</TableCell>
                <TableCell>Document</TableCell>
                <TableCell>Nội dung</TableCell>
                <TableCell>https://www.google.com</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2</TableCell>
                <TableCell>Document</TableCell>
                <TableCell>Nội dung</TableCell>
                <TableCell>https://www.google.com</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container >

  </>
}
export default Topic