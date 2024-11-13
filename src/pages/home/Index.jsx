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
    if (widthNav === 80) {
      setWidthNav(theme.Layout.navWidth)
      localStorage.setItem('widthNav', theme.Layout.navWidth)
    } else {
      setWidthNav(80)
      localStorage.setItem('widthNav', 80)
    }
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
