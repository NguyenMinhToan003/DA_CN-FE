import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Container from '@mui/material/Container'

const Profile = () => {
  return (
    <>
      <Box sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 5,
        gap: 3
      }}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          minWidth: 400,
          maxWidth: 400,
          height: 300,
          borderRadius: 3,
          backgroundColor: 'secondary.main',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: 2,
          gap: 1
        }}>
          <Typography sx={{ paddingY: 3, paddingX: 2 }}>Profile Picture</Typography>
          <Divider />
          <Avatar sx={{ width: 120, height: 120 }} />
          <Typography>
            Upload/Change Avartar của bạn
          </Typography>
          <input type='file' hidden name='uploadAvartar' id='uploadAvartar' />
          <Button
            component='label'
            forHtml='uploadAvartar'
            sx={{
              paddingX: 2,
              paddingY: 1
            }}>
            Upload new image
          </Button>
        </Box>
        <Container maxWidth='sm'>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'secondary.main',
            width: '100%',
            borderRadius: 3,
            padding: 2
          }}>
            <Typography sx={{ paddingY: 2, paddingX: 2, marginX: 3, fontWeight: 'bold', fontSize: '1rem' }}>Thông tin cá nhân</Typography>
            <Divider />
            <TextField label='Họ và tên' margin='normal' />
            <TextField label='Mã sinh viên' margin='normal' />
            <TextField label='Email' margin='normal' />
            <TextField label='Địa chỉ' margin='normal' />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField sx={{ width: '100%' }} label='Số điện thoại' margin='normal' />
              <TextField sx={{ width: '100%' }} label='Ngày sinh' margin='normal' />
            </Box>
            <Button sx={{ width: 'fit-content', marginX: 3 }}>Lưu thay đổi</Button>
          </Box>
        </Container>
      </Box>
    </>
  )
}
export default Profile