import IconButton from '@mui/material/IconButton'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import Tooltip from '@mui/material/Tooltip'
import { useColorScheme } from '@mui/material/styles'
const ThemeMode = () => {
  const { mode, setMode } = useColorScheme()

  if (!mode) return null
  return (
    mode === 'light' ?
      <Tooltip title='Dark'>
        <IconButton
          onClick={() => setMode('dark')}
          sx={{ ml: 'auto', color: 'purple' }}
        >
          <DarkModeIcon />
        </IconButton>
      </Tooltip>
      :
      <Tooltip title='Light'>
        <IconButton
          onClick={() => setMode('light')}
          sx={{ ml: 'auto', color: 'orange' }}
        >
          <LightModeIcon />
        </IconButton>
      </Tooltip>

  )
}
export default ThemeMode