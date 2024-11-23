import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme.js'
import { ConfirmProvider } from 'material-ui-confirm'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { socket } from '~/socket'
import { Box, Button, Typography } from '@mui/material'
const id = 1
socket.emit('online', id)
createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <ConfirmProvider defaultOptions={
        {
          title: 'Thông báo',
          confirmationText: <Button variant='contained' color='primary'>Xác nhận</Button>,
          cancellationText: <Button variant='contained' color='error'>Hủy bỏ</Button>
        }
      }>
        <App />
        <ToastContainer />
      </ConfirmProvider>
    </BrowserRouter>
  </ThemeProvider>
)
