import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Stepper from '@mui/material/Stepper'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import theme from '~/theme'

const steps = ['Đăng kí giáo viên', 'Đăng kí đề tài', 'Bắt đầu đồ án']

const Home = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [teacher, setTeacher] = useState([
    { _id: '1', name: 'Nguyễn Văn A ' },
    { _id: '2', name: 'Nguyễn Văn B' },
    { _id: '3', name: 'Nguyễn Văn C' },
    { _id: '1', name: 'Nguyễn Văn A ' },
    { _id: '2', name: 'Nguyễn Văn B' },
    { _id: '3', name: 'Nguyễn Văn C' }
  ])
  const [formTeacher, setFormTeacher] = useState('')
  const [formTopic, setFormTopic] = useState({
    teacherId: '',
    projectName: '',
    tech: '',
    description: ''
  })
  const handleNext = () => {
    if (activeStep <= 3)
      setActiveStep(activeStep + 1)
  }
  const handleBack = () => {
    if (activeStep > 0)
      setActiveStep(activeStep - 1)
  }
  const handlChangeFormTeacher = (event) => {
    setFormTeacher(event.target.value)
  }
  const handleChangeFormTopic = (event) => {
    setFormTopic({
      ...formTopic,
      [event.target.name]: event.target.value
    })
  }

  return <>

    <Container maxWidth='md' sx={{
      mt: 2,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: 'secondary.main',
      borderRadius: 3,
      height: 700,
      overflow: 'hidden',
      padding: 3
    }}>
      <Box sx={{ height: '100%' }}>
        <Typography variant='h4' gutterBottom sx={{ whiteSpace: 'nowrap' }}>
          Đăng Ký Đề Tài Đồ Án Chuyên Ngành
        </Typography>
        <Divider />
        <Stepper activeStep={activeStep} sx={{ my: 3 }}>
          {
            steps.map((step, index) => (
              <Step key={index}
                onClick={() => setActiveStep(index)}
                sx={{ cursor: 'pointer' }}
              >
                <StepLabel>{step}</StepLabel>
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
                label='Tìm giáo viên'
                variant='outlined'
                fullWidth
                margin='normal'
                name='teacherId'
                value={formTeacher}
                onChange={handlChangeFormTeacher}
                required
                InputProps={
                  formTeacher.length > 0 && {
                    endAdornment: <IconButton
                      onClick={() => {
                        setFormTeacher('')
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  }
                }
              />
              <Box sx={{
                mt: 1,
                height: 380,
                backgroundColor: 'background.default',
                overflowY: 'auto',
                overflowX: 'hidden',
                borderRadius: 1,
                display: 'flex',
                padding: 0.5,
                flexDirection: 'column',
                gap: 1
              }}>
                {
                  teacher.map((teacher, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: 3,
                        backgroundColor: 'secondary.main',
                        cursor: 'pointer',
                        borderRadius: 1
                      }}
                    >
                      <Typography>{teacher.name}</Typography>
                    </Box>
                  ))

                }

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
                name='projectName'
                value={formTopic.projectName}
                onChange={handleChangeFormTopic}
              />
              <TextField
                label='Công nghệ sử dụng'
                variant='outlined'
                fullWidth
                margin='normal'
                name='tech'
                value={formTopic.tech}
                onChange={handleChangeFormTopic}
                required />
              <TextField
                label='Mô tả'
                variant='outlined'
                fullWidth
                margin='normal'
                multiline
                rows={4}
                name='description'
                value={formTopic.description}
                onChange={handleChangeFormTopic}
                required
              />
              <TextField
                label='Giáo viên hướng dẫn'
                variant='outlined'
                fullWidth
                margin='normal'
                name='teacherName'
                value={teacher.name}
                required
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Button
          variant='contained'
          color='secondary'
          onClick={handleBack}>
          Quay lại
        </Button>
        <Button
          variant='contained'
          onClick={handleNext}>
          Tiếp theo
        </Button>
      </Box>
    </Container >

  </>
}
export default Home