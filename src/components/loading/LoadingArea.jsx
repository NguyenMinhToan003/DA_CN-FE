import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

export const LoadingArea = ({ color = 'inherit' }) => {
  return <>
    <Box sx={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 100000, backgroundColor: '#0004' }}>
      <CircularProgress color={color} />
    </Box>

  </>
}
