import Container from '@mui/material/Container'
import AppRouter from './routers/AppRouter'
import './App.css'
const App = () => {
  return (
    <Container disableGutters maxWidth={false} sx={{ backgroundColor: 'background.default' }}>
      <AppRouter />
    </Container>
  )
}
export default App