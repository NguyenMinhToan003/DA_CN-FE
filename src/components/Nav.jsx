import React from 'react'
import Box from '@mui/material/Box'
import Dashboard from '~/components/menu/Dashboard'
import Profile from '~/components/menu/Profile'
import Subject from '~/components/menu/Subject'
import Resource from '~/components/menu/Resource'
import Chat from '~/components/menu/Chat'
import theme from '~/theme'
import { NavLink } from 'react-router-dom'

const Nav = ({ widthNav, isMobile }) => {


  return (

    <>
      <Box
        sx={{
          width: widthNav,
          backgroundColor: 'secondary.main',
          minHeight: `calc(100vh - ${theme.Layout.headerHeight}px)`,
          padding: 1,
          position: 'sticky',
          top: theme.Layout.headerHeight,
          transition: 'width 0.3s ease',
          display: 'flex',
          flexDirection: 'column',
          gap: 1
        }}
      >

        <NavLink to='/' className='navLink' >
          <Dashboard widthNav={widthNav} />
        </NavLink>
        <NavLink to='/profile' className='navLink' >
          <Profile widthNav={widthNav} />
        </NavLink>
        <NavLink to='/subjects' className='navLink' >
          <Subject widthNav={widthNav} />
        </NavLink>
        <NavLink to='/resources' className='navLink' >
          <Resource widthNav={widthNav} />
        </NavLink>
        <NavLink to='/roomchats' className='navLink' >
          <Chat widthNav={widthNav} />
        </NavLink>

      </Box>

    </>
  )
}

export default Nav