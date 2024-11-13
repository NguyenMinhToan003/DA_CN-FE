import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Stepper from '@mui/material/Stepper'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import { useEffect, useRef, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import Avatar from '@mui/material/Avatar'
import { getTeachers } from '~/apis/teacherAPi'
import { student_teacher } from '~/apis/studentAPI'
import { createTopic, getTopicById } from '~/apis/topicAPI'


const steps = ['Đăng kí giáo viên', 'Đăng kí đề tài', 'Bắt đầu đồ án']
let teacherListDefault = []
const Home = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  // localStorage.setItem('user', {})
  const [activeStep, setActiveStep] = useState(0)
  const [topicName, setTopicName] = useState('')
  const [topicTech, setTopicTech] = useState('')
  const [topicDescription, setTopicDescription] = useState('')
  const [teacherChecked, setTeacherChecked] = useState(null)
  const [teacherSearch, setTeacherSearch] = useState('')
  const [teacherList, setTeacherList] = useState([])
  const fetchTeacherList = async () => {
    const response = await getTeachers()
    setTeacherList(response)
    teacherListDefault = response
    response.forEach(teacher => {
      if (teacher._id === user.teacherId) {
        setTeacherChecked(teacher)
        setActiveStep(1)
      }
    })
  }
  const fetchTopic = async () => {
    const response = await getTopicById(user.topicId)
    if (response._id) {
      setTopicName(response.name)
      setTopicTech(response.tech)
      setTopicDescription(response.description)
      setActiveStep(2)
    }
  }
  useEffect(() => {
    fetchTeacherList()
    fetchTopic()
  }, [])
  const checkStatusButtonNext = () => {
    if (teacherChecked === null && activeStep === 0) return false
    if (activeStep === 1 && (topicName === '' || topicTech === '' || topicDescription === '')) return false
    return true
  }
  const checkStatusButtonBack = () => {
    if (activeStep === 0) return false
    return true
  }
  const handleNext = async () => {
    if (teacherChecked === null && activeStep === 0) return
    if (activeStep === 1 && (topicName === '' || topicTech === '' || topicDescription === '')) return
    if (activeStep === 0) {
      const id = user._id
      await student_teacher(id, teacherChecked._id)
    }
    if (activeStep === 1) {
      const id = user._id
      await createTopic(topicName, topicDescription, topicTech, id)
    }

    if (activeStep < 3)
      setActiveStep(activeStep + 1)
  }
  const handleBack = () => {
    if (activeStep > 0)
      setActiveStep(activeStep - 1)
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
      mt: 2,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: 'secondary.main',
      borderRadius: 3,
      height: 750,
      overflow: 'hidden',
      padding: 3,
      boxShadow: 2
    }}>
      <Box sx={{ height: '100%' }}>
        <Typography variant='h4' gutterBottom sx={{ whiteSpace: 'nowrap' }}>
          Đăng Ký Đề Tài Đồ Án Chuyên Ngành
        </Typography>
        <Divider />
        <Stepper activeStep={activeStep} sx={{ my: 3 }} alternativeLabel >
          {
            steps.map((step, index) => (
              <Step key={index}
                sx={{ cursor: 'pointer' }}
              >
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
                  height: 380,
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
                            backgroundColor: teacherChecked?._id !== teacher._id
                              ? 'background.hover'
                              : 'messages.bg_primary'
                          },
                          backgroundColor: teacherChecked?._id === teacher._id
                            ? 'messages.bg_primary'
                            : 'secondary.main',
                          color: teacherChecked?._id === teacher._id
                            ? 'messages.text_primary' : 'text.primary',

                        }}
                      >
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                          <Avatar sx={{ width: 50, height: 50 }} />
                          <Typography sx={{
                            fontWeight: teacherChecked?._id === teacher._id
                              ? 'bold' : 'normal'
                          }}>{teacher.name}</Typography>
                        </Box>
                        <IconButton color='primary'>
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
            {
              activeStep === 2 &&
              <Box sx={{ minWidth: '100%' }}>
                <Typography variant='h6'>Đang chờ duyệt</Typography>
              </Box>
            }
          </Box>
        </Box>
      </Box>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Button
          variant={checkStatusButtonBack() ? 'contained' : 'disabled'}
          color='secondary'
          onClick={handleBack}>
          Quay lại
        </Button>
        <Button
          variant={checkStatusButtonNext() ? 'contained' : 'disabled'}
          color='primary'
          onClick={handleNext}>
          Tiếp theo
        </Button>
      </Box>
    </Container >

  </>
}
export default Home