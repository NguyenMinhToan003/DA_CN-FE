import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { IconButton } from '@mui/material'
import { getListStudentByTeacherKey } from '~/apis/studentAPI'
import { useEffect, useState } from 'react'
import { joinTopic } from '~/apis/topicAPI'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'

const AddMemberTopic = ({ open, onClose, setIsChange }) => {
  const profile = JSON.parse(localStorage.getItem('user'))
  const topicId = useParams().id
  const [students, setStudents] = useState([])
  const [search, setSearch] = useState('')
  const fetchStudents = async () => {
    const response = await getListStudentByTeacherKey(profile._id, search, 0)
    setStudents(response)
  }
  useEffect(() => {
    fetchStudents()
  }, [open])

  const handlSearch = async () => {
    const response = await getListStudentByTeacherKey(profile._id, search, 0)
    setStudents(response)
  }
  const handleAddMember = async (studentId) => {
    const response = await joinTopic(topicId, [studentId])
    if (response.modifiedCount > 0) {
      fetchStudents()
      setIsChange(true)
      toast.success(response.message)
    }
    else if (response.modifiedCount == 0) {
      toast.warning(response.message)
    }
    else {
      toast.error(response.message)
    }

  }
  return <>
    {
      open == true && (
        <Box sx={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, display: 'flex',
          justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000020',
          zIndex: 100
        }}>
          <Container maxWidth='sm' sx={{ backgroundColor: 'secondary.main', borderRadius: 2, p: 1, boxShadow: 24 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                p: 2
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant='h6' sx={{ fontWeight: 'bold' }} margin='normal'>Thêm thành viên</Typography>
                <IconButton onClick={onClose}>
                  <HighlightOffIcon color='error' />
                </IconButton>
              </Box>
              <Divider />
              <Box>
                <TextField label='Tên / Mã Sinh Viên' variant='outlined'
                  fullWidth
                  autoFocus
                  onChange={(e) => setSearch(e.target.value)} margin='normal'
                />
                <Button variant='contained' color='success' sx={{ p: 1 }}
                  onClick={handlSearch}>
                  Tìm kiếm
                </Button>
              </Box>
              <Box sx={{
                display: 'flex', gap: 1, alignItems: 'center', flexDirection: 'column'
                , height: 300, overflowY: 'auto'
              }}>
                {
                  students.map((student, index) => (
                    <Box key={index} sx={{ display: 'flex', gap: 1, alignItems: 'center', justifyContent: 'space-between', width: '100%', backgroundColor: 'secondary.main' }}>
                      <Typography >{student.name}</Typography>
                      <Button variant='contained' sx={{ p: 1 }}
                        onClick={() => handleAddMember(student._id)}>

                        Thêm
                      </Button>
                    </Box>
                  ))
                }
              </Box>
            </Box>
          </Container>
        </Box>
      )
    }
  </>

}

export default AddMemberTopic