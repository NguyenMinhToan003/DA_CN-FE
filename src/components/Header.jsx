import { useColorScheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import IconButton from '@mui/material/IconButton'
import theme from '~/theme'
import InputBase from '@mui/material/InputBase'
import Paper from '@mui/material/Paper'
import SearchIcon from '@mui/icons-material/Search'
import { Avatar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
const Header = () => {
  const { mode, setMode } = useColorScheme()

  if (!mode) return null
  return (
    <Box sx={{
      backgroundColor: 'primary.main',
      height: theme.Layout.headerHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 2
    }}>
      <Box sx={{ width: theme.Layout.navWidth }}>
        <IconButton sx={{ color: 'white' }} >
          <MenuIcon />
        </IconButton>
      </Box>
      <Box sx={{ width: '100%', display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        <Box>
          <Paper
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
          >
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder='Tìm mã sinh viên'
              inputProps={{ 'aria-label': 'Tìm mã sinh viên' }}
            />
          </Paper>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          {
            mode === 'light' ?
              <IconButton
                onClick={() => setMode('dark')}
                sx={{ ml: 'auto', color: 'purple' }}
              >
                <DarkModeIcon />
              </IconButton>
              :
              <IconButton
                onClick={() => setMode('light')}
                sx={{ ml: 'auto', color: 'orange' }}
              >
                <LightModeIcon />
              </IconButton>
          }
          <Typography sx={{ ml: 2, color: 'text.default', fontSize: '20px', whiteSpace: 'none' }}>
            Nguyễn Minh Toàn
          </Typography>
          <Avatar sx={{ ml: 2 }} />
        </Box>
      </Box>
    </Box >
  )
}
export default Header