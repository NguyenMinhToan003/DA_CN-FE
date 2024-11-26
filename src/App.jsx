import Container from '@mui/material/Container'
import AppRouter from './routers/AppRouter'
import './App.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useColorScheme } from '@mui/material/styles'

const App = () => {
  const { mode, setMode } = useColorScheme()
  return (
    <>
      <Container disableGutters maxWidth={false} sx={{ backgroundColor: 'background.default' }}>
        <AppRouter />
      </Container>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme={mode === 'light' ? 'light' : 'dark'}
        pauseOnHover
      />
    </>
  )
}
export default App