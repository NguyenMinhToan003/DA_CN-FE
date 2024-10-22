import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
const App = () => {
  return (
    <Container disableGutters maxWidth={false} sx={{ backgroundColor: '#f0f2f5' }}>
      <Button variant="contained" color="primary">Hello World</Button>
    </Container>
  )
}
export default App;