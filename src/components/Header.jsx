import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import theme from '~/theme'
import InputBase from '@mui/material/InputBase'
import Paper from '@mui/material/Paper'
import SearchIcon from '@mui/icons-material/Search'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import ThemeMode from '~/components/ThemeMode'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import CloseIcon from '@mui/icons-material/Close'
import { useRef, useState } from 'react'
import Button from '@mui/material/Button'

const Header = ({ toggleNav, widthNav }) => {
  const [key, setKey] = useState('')
  const refSearch = useRef(null)
  const handleSearch = () => {
    setKey('')
    refSearch.current.lastElementChild.focus()
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
            <ArrowForwardIcon sx={{ transform: widthNav === theme.Layout.navWidth ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }} />
          </IconButton>
        </Tooltip>
      </Box>

      <Box sx={{
        width: '100%', display: 'flex', gap: 2, justifyContent: 'flex-end', alignItems: 'center'
      }}>

        <Paper
          sx={{
            p: '2px 4px', display: 'flex', alignItems: 'center', width: {
              sm: '100%',
              lg: 400
            }
          }}
        >
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <InputBase
            ref={refSearch}
            value={key}
            onChange={(e) => setKey(e.target.value)}
            sx={{
              ml: 1, flex: 1,
            }}
            placeholder='Tìm mã sinh viên'

          />
          {
            <IconButton
              onClick={() => setKey('')}
              color='error'
              sx={{ display: key ? 'flex' : 'none' }}
            >
              <CloseIcon />
            </IconButton>
          }
          <Button variant='contained' color='primary' onClick={handleSearch}>Tìm kiếm</Button>

        </Paper>

        <Box sx={{
          display: 'flex', justifyContent: 'flex-end', alignItems: 'center'
        }}>
          <ThemeMode />
          <Typography sx={{
            ml: 2, color: 'text.default'
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