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
import { useConfirm } from 'material-ui-confirm'
import { confirmTopic, updateTopic, deleteTopic, removeStudent } from '~/apis/topicAPI'
import AddIcon from '@mui/icons-material/Add'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import SaveIcon from '@mui/icons-material/Save'
import AddMemberTopic from '~/components/popup/AddMemberTopic'
import { getDsResource } from '~/apis/resourceAPI'
import theme from '~/theme'

const TopicTeacher = () => {
  const navigate = useNavigate()
  const confirm = useConfirm()
  const [loading, setLoading] = useState(false)
  const user = JSON.parse(localStorage.getItem('user'))
  const [openAddMember, setOpenAddMember] = useState(false)
  const [isChange, setIsChange] = useState(false)
  const { id } = useParams()
  const [topic, setTopic] = useState({
    name: '',
    tech: '',
    description: '',
    process: 0,
    status: []
  })
  const [resources, setResources] = useState([])
  const [students, setStudents] = useState([])
  const fetchTopic = async () => {
    const response = await getDetailTopicById(id)
    if (response) {
      setTopic(() => ({
        name: response?.name,
        tech: response?.tech,
        description: response?.description,
        process: response?.process,
        status: response?.status
      }))
      setStudents(response?.students)
    }
  }
  const fetchResources = async () => {
    setLoading(true)
    const response = await getDsResource(id)
    if (response) {
      setResources(response)
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchTopic()
    fetchResources()
  }, [])
  useEffect(() => {
    fetchTopic()
    setIsChange(false)
  }, [isChange])
  const handleConfimTopic = async () => {
    confirm({
      title: 'Đồng ý đề tài',
      description: 'Xác nhận đồng ý với đề tài'
    })
      .then(async () => {
        await updateTopic(topic.name, topic.description, topic.tech, topic.process, id, user._id)
        const response = await confirmTopic(user._id, id)
        if (response?.acknowledged) {
          fetchTopic()
          toast.success('Xác nhận đề tài thành công')
        }
      })
      .catch(() => {
      })
  }
  const handleDenyTopic = async () => {
    confirm({
      title: 'Hủy đề tài',
      description: 'Xác nhận hủy đề tài'
    }).then(async () => {
      const response = await deleteTopic(id, user._id)
      if (response.acknowledged) {
        toast.success('Hủy đề tài thành công')
        navigate('/')
      }
      else toast.error(response.message)
    })
      .catch(() => {
      })
  }
  const handleUpdateTopic = async () => {
    const response = await updateTopic(topic.name, topic.description, topic.tech, topic.process, id, user._id)
    if (response?.modifiedCount > 0) {
      fetchTopic()
      toast.success('Cập nhật đề tài thành công')
    }
    else if (response.message) {
      toast.error(response.message)
    } else {
      toast.warning('Chưa có thay đổi')
    }
  }
  const handleClickImage = (url) => {
    confirm({
      title: 'Ảnh',
      description: <Box sx={{ maxWidth: 200, maxHeight: 200 }}>
        <img src={url} alt='media' style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }} />
      </Box>,
      confirmationText: 'Đóng',
      cancellationText: 'Mỏ ảnh ở tab mới'
    })
      .then(() => { })
      .catch(() => {
        window.open(url, '_blank')
      })
  }
  const handleRemoveStudent = async (student) => {
    confirm({
      title: `Xóa sinh viên ${student.name}`,
      description: 'Xác nhận xóa sinh viên khỏi đề tài'
    }).then(async () => {
      const response = await removeStudent(id, student._id, user._id)
      if (response?.acknowledged) {
        fetchTopic()
        toast.success(response.message)
      }
      else toast.error(response.message)
    })
      .catch(() => {
      })
  }
  return <>
    <AddMemberTopic open={openAddMember} onClose={() => setOpenAddMember(false)} setIsChange={setIsChange} />
    <Box sx={{
      m: 2, position: 'sticky',
      top: theme.Layout.headerHeight,
      backgroundColor: 'background.default',
      zIndex: 10,
      py: 1
    }}>
      <Button variant='contained' color='error' startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>Quay lại</Button>
    </Box>
    <Box sx={{
      display: 'flex', gap: 3, p: 2, flexDirection: {
        lg: 'row',
        xs: 'column'
      }
    }}>
      <Container sx={{ backgroundColor: 'secondary.main', p: 2, borderRadius: 1, width: '100%' }} maxWidth='xl'>
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
              topic?.process === 0 ?
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
            onClick={handleUpdateTopic}
            startIcon={<SaveIcon />}>
            Lưu lại thông tin đề tài
          </Button>
        </Box>
      </Container>
      <Container sx={{ backgroundColor: 'secondary.main', p: 1, borderRadius: 1, width: '100%' }} maxWidth='xl'>
        <TableContainer>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant='h6' sx={{ py: 3, fontWeight: 'bold' }}>Thành Viên ({students.length})</Typography>
            <Box >
              <Button variant='contained' sx={{ py: 1 }} startIcon={<AddIcon />}
                onClick={() => setOpenAddMember(true)}
              >Thêm thành viên</Button>
            </Box>
          </Box>
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
                students?.length > 0
                  ? <>
                    {
                      students.map((student, index) => (
                        <>
                          <TableRow >
                            <TableCell>{student.studentCode}</TableCell>
                            <TableCell>{student.name}</TableCell>
                            <TableCell>
                              <Button variant='contained' color='error'
                                onClick={() => handleRemoveStudent(student)}
                                startIcon={<RemoveCircleOutlineIcon />}>Hủy</Button>
                            </TableCell>
                          </TableRow>
                        </>

                      ))
                    }
                  </>
                  :
                  <TableCell colSpan={3} align='center'>
                    {
                      loading === true
                        ? <Typography textAlign='center' color='info' fontWeight='bold'>Loading..</Typography>
                        : <Typography textAlign='center' color='error' fontWeight='bold'>Empty</Typography>
                    }
                  </TableCell>
              }

            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box >

    <Container sx={{ p: 1, minWidth: '100%', maxWidth: '100%', mb: 3 }} maxWidth='xl' >
      <Box sx={{ display: 'flex', gap: 3, backgroundColor: 'secondary.main', borderRadius: 3, minWidth: '100%' }}>
        <TableContainer>
          <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant='h6' sx={{ fontWeight: 'bold' }}>Resource</Typography>
          </Box>
          <Divider />
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: 10 }}>STT</TableCell>
                <TableCell sx={{ width: 200 }}> Tiêu đề</TableCell>
                <TableCell sx={{ width: 'auto' }}>Nội dung</TableCell>
                <TableCell sx={{ width: 600 }}>Resource</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                resources.length > 0 ?
                  <>{
                    resources.map((resource, index) => (
                      <TableRow key={resource._id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{resource.name}</TableCell>
                        <TableCell>{resource.description}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            {
                              resource.url.length > 0
                                ? <>
                                  {
                                    resource.url.map((url, index) => (
                                      <img key={index} src={url} alt='media' style={{ width: 100, height: 100, objectFit: 'cover', cursor: 'pointer', border: '1px solid #ccc' }}
                                        onClick={() => handleClickImage(url)} />
                                    ))
                                  }
                                </>
                                : ''
                            }
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))
                  }
                  </>
                  : <TableRow>
                    <TableCell colSpan={4} align='center'>
                      {
                        loading === true
                          ? <Typography textAlign='center' color='info' fontWeight='bold'>Loading..</Typography>
                          : <Typography textAlign='center' color='error' fontWeight='bold'>Empty</Typography>
                      }
                    </TableCell>
                  </TableRow>
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container >
  </>
}
export default TopicTeacher