import Box from '@mui/material/Box'
import Nav from '~/components/Nav'
import { Outlet } from 'react-router-dom'
import Header from '~/components/Header'
const Index = () => {
  return (
    <>
      <Header />
      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
        <Nav />
        <Box sx={{ width: '100%' }}>
          <Outlet />
        </Box>
      </Box>
    </>
  )
}
export default Index