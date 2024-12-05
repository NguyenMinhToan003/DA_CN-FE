import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Stepper from '@mui/material/Stepper'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import Avatar from '@mui/material/Avatar'
import Alert from '@mui/material/Alert'
import CheckIcon from '@mui/icons-material/Check'
import AlertTitle from '@mui/material/AlertTitle'
import { getTeachers } from '~/apis/teacherAPi'
import { student_teacher } from '~/apis/studentAPI'
import { createTopic, getTopicById } from '~/apis/topicAPI'
import Tooltip from '@mui/material/Tooltip'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { toast } from 'react-toastify'
import { getStudentById } from '~/apis/studentAPI'
import { NavLink } from 'react-router-dom'


const steps = ['Đăng kí giáo viên', 'Đăng kí đề tài', 'Bắt đầu đồ án']
let teacherListDefault = []
const HomeStudent = () => {
  const [user, setUser] = useState({})
  const [activeStep, setActiveStep] = useState(0)
  const [topicName, setTopicName] = useState('')
  const [topicTech, setTopicTech] = useState('')
  const [topicDescription, setTopicDescription] = useState('')
  const [teacherChecked, setTeacherChecked] = useState(null)
  const [teacherSearch, setTeacherSearch] = useState('')
  const [teacherList, setTeacherList] = useState([])
  const [topicOwner, setTopicOwner] = useState({})
  const fetchData = async () => {
    const userLocal = JSON.parse(localStorage.getItem('user'))
    const userFetch = await getStudentById(userLocal?._id)
    setUser(userFetch)
    const teachers = await getTeachers()
    setTeacherList(teachers)
    teacherListDefault = teachers
    teachers.forEach(teacher => {
      if (teacher._id === userFetch.teacherId) {
        setTeacherChecked(teacher)
      }
    })
    if (userFetch.status === 1) {
      setActiveStep(1)
    }

    if (userFetch.topicId) {
      setTopicOwner(userFetch.topic)
      setTopicName(userFetch.topic.name)
      setTopicTech(userFetch.topic.tech)
      setTopicDescription(userFetch.topic.description)
      setActiveStep(2)
      if (userFetch?.topic?.process === 1) setActiveStep(3)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
  const checkStatusButtonNext = () => {
    if (teacherChecked === null && activeStep === 0) return false
    if (activeStep === 1 && (topicName === '' || topicTech === '' || topicDescription === '')) return false
    if (activeStep === 2 && topicOwner.process == 0) return false
    if (activeStep === 3) return false
    return true
  }

  const handleNext = async () => {
    if (teacherChecked === null && activeStep === 0) return
    if (activeStep === 1 && (topicName === '' || topicTech === '' || topicDescription === '')) return
    if (activeStep === 0) {
      const id = user._id
      const response = await student_teacher(id, teacherChecked._id)
      if (response.modifiedCount === 1) {
        toast.info('Hãy chờ giáo viên chấp nhận')
      }
    }
    if (activeStep === 1) {
      const id = user._id
      const response = await createTopic(topicName, topicDescription, topicTech, id)
      if (!response?.modifiedCount) {
        toast.error(response.message)
      }
    }
    if (activeStep === 2) {
      await fetchData()
    }
    if (activeStep < 3)
      setActiveStep(activeStep + 1)
  }
  const handerCheckedTeacher = (teacher) => () => {
    setTeacherChecked(teacher)
  }
  const handleSearchTeacher = (e) => {
    setTeacherSearch(e.target.value)
    if (e.target.value.length === 0) return setTeacherList(teacherListDefault)
    const newList = teacherListDefault.filter(
      teacher => teacher.name.toLowerCase().includes(
        e.target.value.toLowerCase().trim()
      ))
    setTeacherList(newList)
  }
  return <>
    <Container maxWidth='md' sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: 'secondary.main',
      borderRadius: 2,
      height: 650,
      overflow: 'hidden',
      padding: 3,
      boxShadow: 2
    }}>
      <Box sx={{ height: '100%' }}>
        <Typography variant='h5' gutterBottom sx={{ whiteSpace: 'nowrap', mb: 2 }}>
          Đăng Ký Đề Tài Đồ Án Chuyên Ngành
        </Typography>
        <Divider />
        <Stepper activeStep={activeStep} sx={{ my: 3 }} >
          {
            steps.map((step, index) => (
              <Step key={index}>
                <StepLabel>
                  {step}
                </StepLabel>
              </Step>
            ))
          }
        </Stepper>
        <Box sx={{
          width: '100%',
          height: '100%',
          overflow: 'hidden'
        }}>
          <Box style={{
            display: 'flex',
            height: '100%',
            width: '100%',
            transition: 'transform 0.3s ease',
            transform: `translateX(-${activeStep * 100}%)`
          }}>
            <Box sx={{
              minWidth: '100%',
              opacity: activeStep === 0 ? 1 : 0,
              visibility: activeStep === 0 ? 'visible' : 'hidden',
              transition: 'opacity 0.3s ease'
            }}>
              <TextField
                label='Lọc tên giáo viên'
                variant='outlined'
                fullWidth
                margin='normal'
                value={teacherSearch}
                onChange={(e) => handleSearchTeacher(e)}
                InputProps={
                  teacherSearch.length > 0 ? {
                    endAdornment: (
                      <IconButton
                        onClick={() => {
                          handleSearchTeacher({ target: { value: '' } })
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                    )
                  } : null
                }
              />
              <Box sx={{
                mt: 1,
                borderRadius: 1
              }}>
                <Box sx={{
                  overflowY: 'auto',
                  display: 'flex',
                  height: 330,
                  flexDirection: 'column',
                  gap: 0.5
                }}>
                  {
                    teacherList.map((teacher, index) => (
                      <Box
                        onClick={handerCheckedTeacher(teacher)}
                        key={index}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: 1.5,
                          justifyContent: 'space-between',
                          cursor: 'pointer',
                          borderRadius: 1,
                          '&:hover': {
                            backgroundColor: teacherChecked?._id == teacher._id
                              ? 'primary.more'
                              : 'background.hover'
                          },
                          backgroundColor: teacherChecked?._id === teacher._id
                            ? 'primary.more'
                            : 'secondary.main',
                          color: 'text.primary'

                        }}
                      >
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                          <Avatar sx={{ width: 30, height: 30 }} />
                          <Typography sx={{
                            fontWeight: teacherChecked?._id === teacher._id
                              ? 'bold' : 'normal'
                          }}>{teacher.name}</Typography>
                        </Box>
                        <IconButton color='inherit'>
                          {
                            teacherChecked?._id === teacher._id
                              ? <RadioButtonCheckedIcon />
                              : <RadioButtonUncheckedIcon />
                          }
                        </IconButton>
                      </Box>
                    ))
                  }
                </Box>
              </Box>
            </Box>
            <Box sx={{
              minWidth: '100%',
              opacity: activeStep === 1 ? 1 : 0,
              visibility: activeStep === 1 ? 'visible' : 'hidden',
              transition: 'opacity 0.3s ease'
            }}>
              <TextField
                label='Tên đề tài'
                variant='outlined'
                fullWidth
                margin='normal'
                required
                value={topicName}
                onChange={(e) => setTopicName(e.target.value)}
              />
              <TextField
                label='Công nghệ sử dụng'
                variant='outlined'
                fullWidth
                margin='normal'
                value={topicTech}
                onChange={(e) => setTopicTech(e.target.value)}
                required />
              <TextField
                label='Mô tả'
                variant='outlined'
                fullWidth
                margin='normal'
                multiline
                rows={4}
                value={topicDescription}
                onChange={(e) => setTopicDescription(e.target.value)}
                required
              />
              <TextField
                label='Giáo viên hướng dẫn'
                variant='outlined'
                fullWidth
                margin='normal'
                value={teacherChecked?.name + ''}
                required
              />
            </Box>
            <Box sx={{
              minWidth: '100%',
              opacity: activeStep === 2 ? 1 : 0,
              visibility: activeStep === 2 ? 'visible' : 'hidden',
              transition: 'opacity 0.3s ease'
            }}>
              {
                activeStep === 2 &&
                <Box sx={{ minWidth: '100%' }}>
                  <Alert severity='warning' sx={{ padding: 1, mb: 1 }}>
                    <AlertTitle>Đề tài đang chờ duyệt</AlertTitle>
                  </Alert>
                  <Alert severity='info' sx={{ padding: 1 }}>
                    <AlertTitle>Thông tin đề tài</AlertTitle>
                    <Tooltip title='Sao chép mã đề tài'>
                      <Button
                        startIcon={<ContentCopyIcon />}
                        onClick={async () => await navigator.clipboard.writeText(topicOwner?._id)} variant='text' >
                        Mã đề tài:{topicOwner?._id}
                      </Button>
                    </Tooltip>

                    <Typography>Công nghệ: {topicOwner?.tech}</Typography>
                    <Typography>Mô tả: {topicOwner?.description}</Typography>
                    <Typography>Giáo viên hướng dẫn: {teacherChecked?.name}</Typography>
                  </Alert>
                </Box>
              }
            </Box>
            <Box sx={{
              minWidth: '100%',
              opacity: activeStep === 3 ? 1 : 0,
              transition: 'opacity 0.3s ease'
            }}>
              {
                activeStep === 3 &&
                <Box sx={{ minWidth: '100%' }}>
                  <Alert severity='success' variant='filled' icon={<CheckIcon />} sx={{ padding: 1, mb: 1 }}>
                    Đề tài đã được chấp nhận
                  </Alert>
                  <Alert severity='info' sx={{ padding: 1 }}>
                    <AlertTitle>Thông tin đề tài</AlertTitle>
                    <Tooltip title='Sao chép mã đề tài'>
                      <Button
                        startIcon={<ContentCopyIcon />}
                        onClick={async () => await navigator.clipboard.writeText(topicOwner?._id)} variant='text' >
                        Mã đề tài:{topicOwner?._id}
                      </Button>
                    </Tooltip>
                    {/* <Typography>Mã đề tài: {topicOwner?._id}</Typography> */}
                    <Typography>Tên đề tài: {topicOwner?.name}</Typography>
                    <Typography>Công nghệ: {topicOwner?.tech}</Typography>
                    <Typography>Mô tả: {topicOwner?.description}</Typography>
                    <Typography>Giáo viên hướng dẫn: {teacherChecked?.name}</Typography>
                  </Alert>
                </Box>
              }
            </Box>
          </Box>

        </Box>
      </Box>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
      }}>
        {
          activeStep < 3 &&
          <Button
            variant={checkStatusButtonNext() ? 'contained' : 'disabled'}
            color='primary'
            onClick={handleNext}>
            Tiếp theo
          </Button>
        }
        {
          activeStep === 3 &&
          <Button
            variant='contained'
            color='primary'
            component={NavLink}
            to={`/topic/${topicOwner?._id}`}
          >
            Xem chi tiết
          </Button>
        }
      </Box>
    </Container >

  </>
}
export default HomeStudent