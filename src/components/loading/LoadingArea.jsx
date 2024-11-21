import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

const LoadingArea = ({ loading = false, color = 'inherit' }) => {
  return <>
    {
      loading &&
      <Box sx={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100000, backgroundColor: '#00' }}>
        <CircularProgress color={color} />
      </Box>
    }
  </>
}
export default LoadingArea