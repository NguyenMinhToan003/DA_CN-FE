import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import theme from '~/theme'
import InputBase from '@mui/material/InputBase'
import Paper from '@mui/material/Paper'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import ThemeMode from '~/components/ThemeMode'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import { useRef, useState } from 'react'
import Button from '@mui/material/Button'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import Badge from '@mui/material/Badge'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'

const Header = ({ toggleNav, widthNav }) => {
  const [key, setKey] = useState('')
  const refSearch = useRef(null)
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedOption, setSelectedOption] = useState('SinhVien')
  const handleSearch = () => {
    setKey('')
    refSearch.current.lastElementChild.focus()
  }
  const handleClickOptionSearch = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleCloseOptionSearch = (option) => {
    setSelectedOption(option)
    setAnchorEl(null)
  }
  return (
    <Box sx={{
      position: 'sticky',
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: 'primary.main',
      height: theme.Layout.headerHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 2,
      zIndex: 1000
    }}>

      <Box sx={{ width: widthNav, display: 'flex', transition: 'transform 0.3s ease' }}>

        <Tooltip title='menu'>
          <IconButton onClick={toggleNav} sx={{ color: 'text.default' }}>
            <MenuIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Box sx={{
        height: '100%',
        width: '100%', display: 'flex', gap: 2, justifyContent: 'flex-end', alignItems: 'center',
        flexDirection: {
          xs: 'column-reverse',
          sm: 'row'
        }
      }}>

        <Paper
          sx={{
            p: '2px 4px', display: 'flex', alignItems: 'center', width: {
              sm: '100%',

              lg: 600
            }
          }}
        >
          <Button
            color='text.primary'
            onClick={handleClickOptionSearch}
            endIcon={<KeyboardArrowDownIcon />}>
            {selectedOption}
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={anchorEl}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem onClick={() => handleCloseOptionSearch('SinhVien')}>SinhVien</MenuItem>
            <MenuItem onClick={() => handleCloseOptionSearch('LopHoc')}>LopHoc</MenuItem>
          </Menu>
          <InputBase
            ref={refSearch}
            value={key}
            onChange={(e) => setKey(e.target.value)}
            sx={{
              ml: 1, flex: 1
            }}
            placeholder='Tìm kiếm...'

          />

          <IconButton
            onClick={() => setKey('')}
            color='error'
            sx={{ display: key ? 'flex' : 'none' }}
          >
            <CloseIcon />
          </IconButton>

          <Button variant='contained' color='primary' onClick={handleSearch}>Tìm kiếm</Button>

        </Paper>

        <Box sx={{
          display: 'flex', justifyContent: 'flex-end', alignItems: 'center'
        }}>


          <IconButton color='success'>

            <Badge badgeContent={1} color='error'>
              <NotificationsNoneIcon sx={{ color: 'text.default' }} />
            </Badge>

          </IconButton>
          <ThemeMode />


          <Typography sx={{
            ml: 2, color: 'text.default',
            whiteSpace: 'nowrap'
          }} >
            Nguyễn Minh Toàn
          </Typography>
          <Avatar sx={{ ml: 2 }} />
        </Box>
      </Box>
    </Box >
  )
}
export default Header