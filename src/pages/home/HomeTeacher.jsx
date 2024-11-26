import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Toolbar from '@mui/material/Toolbar'
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
import React, { useEffect, useRef, useState } from 'react'
import { getListStudentByTeacherId } from '~/apis/studentAPI'
import { NavLink, useNavigate } from 'react-router-dom'
import theme from '~/theme'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import { confirmStudents } from '~/apis/teacherAPI'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import { confirmTopic, joinTopic, createEmptyTopic } from '~/apis/topicAPI'
import { toast } from 'react-toastify'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import { LoadingArea } from '~/components/loading/LoadingArea'


let listStudentDefault = []
const listFilter = [
  { name: 'Tất cả', status: -1, process: -1, topic: -1 },
  { name: 'Chờ', status: 0, process: -1, topic: -1 },
  { name: 'Chưa có đề tài', status: 1, process: 0, topic: 0 },
  { name: 'Chưa xác nhận đề tài', status: 1, process: 0, topic: 1 }
]

const HomeTeacher = () => {
  const navigate = useNavigate()
  const [iFilter, setIFilter] = useState(0)
  const [loading, setLoading] = useState(false)
  const [disabledButton, setDisableButton] = useState(false)
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const user = JSON.parse(localStorage.getItem('user'))
  const [studentListChecked, setStudentListChecked] = useState([])
  const [studentList, setStudentList] = useState([])
  const [searchStudent, setSearchStudent] = useState('')
  const fetchStudentList = async () => {
    setLoading(true)
    const response = await getListStudentByTeacherId(user._id)
    listStudentDefault = response
    setStudentList(response)
    setLoading(false)
  }
  useEffect(() => {
    fetchStudentList()
  }, [])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
    handleToggle()
  }
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }
  const handleClose = () => {
    setAnchorEl(null)
    handleToggle()
  }
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
    setSearchStudent(key)
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
      if (response.modifiedCount > 0) {
        toast.success(`${response.modifiedCount} sinh viên đã được xác nhận`)
      }
      else {
        toast.warning('Chưa có thay đổi')
      }
    }
  }
  const handlerConfimTopics = async () => {
    if (studentListChecked.length === 0 && studentListChecked.length > 1) return
    const topicId = studentListChecked[0].topicId
    const response = await confirmTopic(user._id, topicId)
    if (response.acknowledged === true) {
      setStudentListChecked([])
      fetchStudentList()
      setStudentListChecked([])
      if (response.modifiedCount > 0) {
        toast.success(`${response.modifiedCount} sinh viên đã được xác nhận đề tài`)
      }
      else {
        toast.warning('Chưa có thay đổi')
      }
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
      if (response.modifiedCount > 0) {
        fetchStudentList()
        setStudentListChecked([])
        toast.success(response.message)
      }
      else {
        toast.error(response.message)
      }
    }
    else {
      toast.error('Không thể làm nhóm được')
    }
  }
  const handleCreateTopic = async (studentId) => {
    const response = await createEmptyTopic(user._id, studentId)
    if (response.insertedId) {
      navigate(`/topic/${response.insertedId}`)
      toast.info('Đang tạo đề tài')
    }
  }
  const handleUpdateTopic = async (student) => {
    navigate(`/topic/${student}`)
  }
  const handlFilter = async (index, status, process, topic) => {
    setLoading(true)
    setIFilter(index)
    handleClose()
    const response = await getListStudentByTeacherId(user._id, status, process, topic)
    setStudentList((prev) => response)
    setLoading(false)
  }
  return <>
    <Container maxWidth='2xl' sx={{ position: 'relative', mt: 2 }} >
      <Paper >
        <Toolbar sx={{
          backgroundColor: 'primary.more',
          display: 'flex',
          flexDirection: {
            xs: 'column-reverse',
            lg: 'row'
          },
          justifyContent: 'space-between',
          position: 'sticky',
          top: theme.Layout.headerHeight,

          left: 0, right: 0, zIndex: 100,
          border: 1, borderColor: 'secondary.main',
          gap: 3,
          p: 1
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
                <Button variant='contained' onClick={handlerComfimStudents} color='success'>Nhận sinh viên</Button>
                <Button variant='contained' onClick={handleJoinTopic}>Nhóm</Button>
                <Button variant='contained' onClick={handlerConfimTopics} color='warning'>Xác nhận Đề tài</Button>
                <Button
                  variant='contained'
                  color='error'
                  onClick={() => setStudentListChecked([])}>
                  Bỏ Chọn
                </Button>
              </Box>
              :
              <Box>
                <Typography variant='h6'
                  sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>
                  Danh sách sinh viên
                </Typography>
                <Typography sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
                  {studentList?.length} sinh viên
                </Typography>
              </Box>
          }
          < Box sx={{ display: 'flex', gap: 2 }}>

            <Button
              startIcon={<FilterAltIcon />}
              variant='contained'
              color='warning'
              ref={anchorEl}
              onClick={(e) => handleClick(e)}
            >
              {listFilter[iFilter].name}
            </Button>
            <Menu
              sx={{ top: 10 }}
              anchorEl={anchorEl}
              onClose={handleClose}
              open={open}
            >
              {
                listFilter.map((filter, index) => {
                  if (index === iFilter) return ''
                  return <>
                    <MenuItem
                      key={index}
                      onClick={() => handlFilter(index, filter.status, filter.process, filter.topic)}
                    >
                      {filter.name}
                    </MenuItem>
                  </>
                })
              }
            </Menu>

            <TextField variant='standard' size='small' placeholder='Tìm kiếm' value={searchStudent}
              onChange={(e) => handleSearchStudent(e.target.value)}
              InputProps={{
                endAdornment: searchStudent.length > 0
                  ? <IconButton onClick={(e) => handleSearchStudent('')}>
                    <CloseIcon />
                  </IconButton>
                  : <IconButton>
                    <SearchIcon />
                  </IconButton>
              }}
            />
          </Box>
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
                studentList.length > 0
                  ? <>
                    {
                      studentList?.map((student, index) => (
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
                              onClick={() => handleCheckStudent(student)}
                              checked={studentListChecked?.includes(student)} />
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
                                student?.topicId ?
                                  (student?.topic[0]?.name === '' ?
                                    <Button
                                      onClick={() => handleUpdateTopic(student.topicId)}
                                      variant='contained'
                                      color='warning'
                                      sx={{ whiteSpace: 'nowrap' }}>
                                      Sửa đề tài
                                    </Button>
                                    : <Typography
                                      sx={{
                                        whiteSpace: 'nowrap',
                                        textDecoration: 'underline', '&:hover': {
                                          color: 'primary.main'
                                        }
                                      }}>
                                      <NavLink to={`/topic/${student.topicId}`}>
                                        {student.topic[0]?.name}
                                      </NavLink>
                                    </Typography>
                                  )
                                  : student?.status === 1
                                    ? <Button
                                      onClick={() => handleCreateTopic(student._id)}
                                      variant='contained'
                                      color='primary'
                                      sx={{ whiteSpace: 'nowrap' }}>
                                      Tạo đề tài
                                    </Button>
                                    : ''
                              }
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ width: 'auto' }}>
                            {
                              !student?.topicId ? ''
                                : <Chip
                                  label={student?.topic[0]?.status[student?.topic[0]?.process]}
                                  color={student?.topic[0]?.process === 0 ? 'warning'
                                    : student?.topic[0]?.process === 1 ? 'primary'
                                      : student?.topic[0]?.process === 2 ? 'success'
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
                  </>
                  :
                  <TableRow >
                    <TableCell colSpan={6}>
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
      </Paper >
    </Container >
  </>
}
export default HomeTeacher