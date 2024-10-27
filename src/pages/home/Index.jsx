import Box from '@mui/material/Box'
import Nav from '~/components/Nav'
import { Outlet } from 'react-router-dom'
import Header from '~/components/Header'
import theme from '~/theme'
import { useState } from 'react'
const Index = () => {
  const widthNavLocal = localStorage.getItem('widthNav')
  const [widthNav, setWidthNav] = useState(widthNavLocal ? parseInt(widthNavLocal) : theme.Layout.navWidth)
  const toggleNav = () => {
    localStorage.setItem('widthNav', widthNav === 85 ? theme.Layout.navWidth : 85)
    setWidthNav(widthNav === 85 ? theme.Layout.navWidth : 85)
  }
  return (
    <>
      <Header toggleNav={toggleNav} widthNav={widthNav} />
      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
        <Nav widthNav={widthNav} />
        <Box sx={{ width: '100%' }}>
          <Outlet />
        </Box>
      </Box>
    </>
  )
}
export default Index