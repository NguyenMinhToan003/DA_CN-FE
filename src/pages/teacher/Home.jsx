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
  const handlerComfimStudents = async () => {
    const response = await confirmStudents(user._id, studentListChecked)
    if (response.upsertedCount > 0) {
      fetchStudentList()
      setStudentListChecked([])
    }
  }
  const handleCheckStudent = (studentId) => {
    const index = studentListChecked.indexOf(studentId)
    if (index === -1) {
      setStudentListChecked([...studentListChecked, studentId])
    }
    else {
      setStudentListChecked(studentListChecked.filter(topic => topic !== studentId))
    }
  }
  const handleSearchStudent = async (key) => {
    const newList = listStudentDefault.filter(student =>
      student.name.toLowerCase().includes(key.toLowerCase()))
    setStudentList(newList)
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
                alignItems: 'center'
              }}>
                <Typography
                  variant='body2'
                  sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>
                  {studentListChecked.length} chọn
                </Typography>
                <Button variant='contained' onClick={handlerComfimStudents}>Nhận sinh viên</Button>
                <Button variant='contained'>Nhóm</Button>
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
                <TableCell sx={{ width: 50 }}>
                  <Typography>Chờ</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                studentList.map((student, index) => (
                  <TableRow key={index} sx={{
                    backgroundColor: studentListChecked.includes(student._id)
                      ? 'primary.more'
                      : 'inherit',
                    '&:hover': {
                      backgroundColor: 'primary.more'
                    }
                  }}>
                    <TableCell>
                      <Checkbox
                        onChange={() => handleCheckStudent(student._id)}
                        checked={studentListChecked.includes(student._id)}
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
                            <NavLink to={`/topic?id=${student.topicId}`}>
                              <Typography
                                color='primary'
                                sx={{ textDecoration: 'underline' }}>
                                {student.topic[0]?.name}
                              </Typography>
                            </NavLink>
                            : <Button
                              variant='contained'
                              color='primary'
                              sx={{ whiteSpace: 'nowrap' }}>
                              Chọn đề tài
                            </Button>
                        }
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ width: 'auto' }}>
                      {
                        !student?.topicId ? ''
                          : student?.topic[0]?.process === 1
                            ? <Chip label='Đã xác nhận' color='success' />
                            : <Chip label='Chưa xác nhận' color='warning' />
                      }
                    </TableCell>
                    <TableCell sx={{ width: 150 }}>
                      {
                        student?.status === 0
                          ? <FiberManualRecordIcon color='red' />
                          : ''
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