import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme.js'
import { ConfirmProvider } from 'material-ui-confirm'
import { socket } from '~/socket'
import Button from '@mui/material/Button'
import { Typography } from '@mui/material'

const id = 1
socket.emit('online', id)
createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <ConfirmProvider defaultOptions={
        {
          title: 'Thông báo',
          confirmationText: 'Xác nhận',
          cancellationText: <Typography color="error">Hủy</Typography>,
        }
      }>
        <App />
      </ConfirmProvider>
    </BrowserRouter>
  </ThemeProvider>
)
