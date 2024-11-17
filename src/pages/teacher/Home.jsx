import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Toolbar from '@mui/material/Toolbar'
import InputBase from '@mui/material/InputBase'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { getListStudentByTeacherId } from '~/apis/studentAPI'
import { NavLink } from 'react-router-dom'
import theme from '~/theme'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import { confirmStudents } from '~/apis/teacherAPI'
import { confirmTopic, joinTopic } from '../../apis/topicAPI'
import { toast } from 'react-toastify'


let listStudentDefault = []
const HomeTeacher = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const [studentListChecked, setStudentListChecked] = useState([])
  const [studentList, setStudentList] = useState([])
  const [searchStudent, setSearchStudent] = useState('')
  const fetchStudentList = async () => {
    const response = await getListStudentByTeacherId(user._id)
    listStudentDefault = response
    setStudentList(response)
  }

  useEffect(() => {
    fetchStudentList()
  }, [])

  const handleCheckStudent = (student) => {
    const index = studentListChecked.indexOf(student)
    if (index === -1) {
      setStudentListChecked([...studentListChecked, student])
    }
    else {
      setStudentListChecked(studentListChecked.filter(st => st !== student))
    }
  }
  const handleSearchStudent = async (key) => {
    const newList = listStudentDefault.filter(student =>
      student.name.toLowerCase().includes(key.toLowerCase()))
    setStudentList(newList)
  }
  const handlerComfimStudents = async () => {
    const studentIds = studentListChecked.map(student => student._id)
    const response = await confirmStudents(user._id, studentIds)
    if (response.acknowledged > 0) {
      fetchStudentList()
      setStudentListChecked([])
      toast.success(`Đã thêm ${response.upsertedCount} sinh viên`)
    }
  }
  const handlerConfimTopics = async () => {
    let topicIds = []
    studentListChecked.forEach(student => {
      if (student.topicId) {
        fetchStudentList()
        setStudentListChecked([])
        topicIds.push(student.topicId)
      }
    })
    const response = await confirmTopic(user._id, topicIds)
    if (response.acknowledged === true) {
      setStudentListChecked([])
      fetchStudentList()
      setStudentListChecked([])
      toast.success(`Xác nhận ${response.upsertedCount} đề tài`)
    }
  }
  const handleJoinTopic = async () => {
    let studentIds = []
    let topicId = ''
    let check = true
    studentListChecked.forEach(student => {
      if (student.topicId) {
        if (topicId === '') {
          topicId = student.topicId
        }
        if (topicId !== student.topicId) {
          check = false
        }
      }
      studentIds.push(student._id)
    })
    if (check) {
      const response = await joinTopic(topicId, studentIds)
      if (response.modifiedCount > 0) toast.success(response.message)
    }
    else {
      toast.error('Không thể làm nhóm được')
    }
  }
  return <>
    <Container maxWidth='2xl' sx={{ position: 'relative', mt: 2, }}>
      <Paper >
        <Toolbar sx={{
          backgroundColor: 'primary.more',
          display: 'flex',
          justifyContent: 'space-between',
          position: 'sticky',
          top: theme.Layout.headerHeight,
          borderRadius: studentListChecked.length > 0 ? 2 : 0,
          boxShadow: studentListChecked.length > 0 ? 1 : 0,
          left: 0, right: 0, zIndex: 100,
          gap: 3,
          p: 2
        }}>
          {
            studentListChecked.length > 0 ?
              <Box sx={{
                display: 'flex',
                gap: 1,
                alignItems: 'center',
                flexWrap: 'wrap'
              }}>
                <Typography
                  variant='body2'
                  sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>
                  {studentListChecked.length} chọn
                </Typography>
                <Button variant='contained' onClick={handlerComfimStudents}>Nhận sinh viên</Button>
                <Button variant='contained' onClick={handleJoinTopic}>Nhóm</Button>
                <Button variant='contained' onClick={handlerConfimTopics}>Xác nhận đề tài</Button>
                <Button
                  variant='contained'
                  color='error'
                  onClick={() => setStudentListChecked([])}>
                  Bỏ Chọn
                </Button>
              </Box>
              :
              <Typography variant='h6'
                sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>
                Danh sách sinh viên
              </Typography>
          }
          <Paper sx={{ display: 'flex', alignItems: 'center', boxShadow: 0, p: 0.5, border: 1, borderColor: 'background.default' }}>
            <InputBase
              sx={{ ml: 1, width: 'auto' }}
              value={searchStudent}
              onChange={(e) => {
                setSearchStudent(e.target.value)
                handleSearchStudent(e.target.value)
              }}
              placeholder='Tìm kiếm...'
            />
            {
              searchStudent != ''
                ? <IconButton
                  color='error'
                  onClick={() => { setSearchStudent(''); handleSearchStudent('') }}>
                  <CloseIcon />
                </IconButton>
                : <IconButton>
                  <SearchIcon />
                </IconButton>
            }
          </Paper>
        </Toolbar>
        <TableContainer>
          <Table sx={{ backgroundColor: 'secondary.main' }}>
            <TableHead>
              <TableRow>
              </TableRow>
              <TableRow sx={{ display: 'flex', justifyItems: 'flex-end' }}>
              </TableRow>
              <TableRow>
                <TableCell sx={{ width: 10 }}>
                </TableCell>
                <TableCell sx={{ width: 'auto' }}>
                  <Typography>Tên Sinh Viên</Typography>
                </TableCell>
                <TableCell sx={{ width: 150 }}>
                  <Typography>Mã</Typography>
                </TableCell>
                <TableCell sx={{ width: 100 }}>
                  <Typography>Lớp</Typography>
                </TableCell>
                <TableCell sx={{ width: 'auto' }}>
                  <Typography>Tên đề tài</Typography>
                </TableCell>
                <TableCell sx={{ width: 150 }}>
                  <Typography>Tiến trình</Typography>
                </TableCell>
                <TableCell sx={{ width: 10 }}>
                  <Typography>Chờ</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                studentList.map((student, index) => (
                  <TableRow key={index} sx={{
                    backgroundColor: studentListChecked.includes(student)
                      ? 'primary.more'
                      : 'inherit',
                    '&:hover': {
                      backgroundColor: 'primary.more'
                    }
                  }}>
                    <TableCell>
                      <Checkbox
                        onChange={() => handleCheckStudent(student)}
                        checked={studentListChecked.includes(student)}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ whiteSpace: 'nowrap' }}>{student.name}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{student.studentCode}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{student.CLASS}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>
                        {
                          student?.topic[0]?.name ?
                            <Typography
                              sx={{
                                textDecoration: 'underline', '&:hover': {
                                  color: 'primary.main'
                                }
                              }}>
                              <NavLink to={`/topic?id=${student.topicId}`}>
                                {student.topic[0]?.name}
                              </NavLink>
                            </Typography>
                            : student?.status === 1
                              ? <Button
                                variant='contained'
                                color='primary'
                                sx={{ whiteSpace: 'nowrap' }}>
                                Chọn đề tài
                              </Button>
                              : ''
                        }
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ width: 'auto' }}>
                      {
                        !student?.topicId ? ''
                          : <Chip
                            label={student?.topic[0].status[student?.topic[0]?.process]}
                            color={student.topic[0].process === 0 ? 'warning'
                              : student.topic[0].process === 1 ? 'primary'
                                : student.topic[0].process === 2 ? 'success'
                                  : 'error'}
                          />
                      }
                    </TableCell>
                    <TableCell sx={{ width: 150 }}>
                      {
                        student?.status === 0
                          ? <FiberManualRecordIcon color='error' />
                          : <FiberManualRecordIcon color='success' />
                      }
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Paper >

    </Container >
  </>
}
export default HomeTeacher