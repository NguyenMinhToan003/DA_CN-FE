import { Grid, Box } from '@mui/material'
import Roomchat from './Roomchat'
const Roomchats = () => {
  return <>
    <Box>
      <Grid container spacing={3} sx={{ padding: 2 }} >
        <Grid item xs={12} md={6} lg={4} xl={3} >
          <Roomchat />
        </Grid>
        <Grid item xs={12} md={6} lg={4} xl={3} >
          <Roomchat />
        </Grid>
        <Grid item xs={12} md={6} lg={4} xl={3} >
          <Roomchat />
        </Grid>
        <Grid item xs={12} md={6} lg={4} xl={3} >
          <Roomchat />
        </Grid>
        <Grid item xs={12} md={6} lg={4} xl={3} >
          <Roomchat />
        </Grid>
        <Grid item xs={12} md={6} lg={4} xl={3} >
          <Roomchat />
        </Grid>

      </Grid>
    </Box>
  </>
}
export default Roomchats