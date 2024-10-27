import Box from '@mui/material/Box'
import Nav from '~/components/Nav'
import { Outlet } from 'react-router-dom'
import Header from '~/components/Header'
import theme from '~/theme'
import { useState } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'

const Index = () => {
  const widthNavLocal = localStorage.getItem('widthNav')
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [widthNav, setWidthNav] = useState(widthNavLocal ? parseInt(widthNavLocal) : theme.Layout.navWidth)

  const toggleNav = () => {
    let width
    if (isMobile && widthNav === 0) {
      width = theme.Layout.navWidth
    }
    else if (isMobile && widthNav === theme.Layout.navWidth) {
      width = 0
    }
    else if (!isMobile) {
      width = widthNav === 85 ? theme.Layout.navWidth : 85
    }
    setWidthNav(width)
    localStorage.setItem('widthNav', width)
  }
  return (
    <>
      <Header toggleNav={toggleNav} widthNav={widthNav} />
      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
        <Nav widthNav={widthNav} isMobile={isMobile} />
        <Box sx={{ width: '100%' }}>
          <Outlet />
        </Box>
      </Box>
    </>
  )
}

export default Index
