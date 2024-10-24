import React from 'react'
import Box from '@mui/material/Box'
import Dashboard from '~/components/menu/Dashboard'
import Profile from '~/components/menu/Profile'
import Subject from '~/components/menu/Subject'
import Resource from '~/components/menu/Resource'
import Chat from '~/components/menu/Chat'
import theme from '../theme'
import { NavLink } from 'react-router-dom'
const Nav = () => {
  return (
    <Box
      sx={{
        width: theme.Layout.navWidth,
        backgroundColor: 'secondary.main',
        minHeight: '100vh',
        padding: 1,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: ' rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;',
        gap: 1

      }}
    >
      <NavLink to='/' className='navLink'>
        <Dashboard />
      </NavLink>
      <NavLink to='/profile' className='navLink'>
        <Profile />
      </NavLink>
      <NavLink to='/subjects' className='navLink'>
        <Subject />
      </NavLink>
      <NavLink to='/resources' className='navLink'>
        <Resource />
      </NavLink>
      <NavLink to='/roomchats' className='navLink'>
        <Chat />
      </NavLink>
    </Box>
  )
}

export default Nav
