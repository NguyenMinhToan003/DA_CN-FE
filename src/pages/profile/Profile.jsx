import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'

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
          gap: 1,

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
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'secondary.main',
          width: '100%',
          gap: 3,
          paddingBottom: 2,
          borderRadius: 3,

        }}>
          <Typography sx={{ paddingY: 2, paddingX: 2, marginX: 3, fontWeight: 'bold', fontSize: '1rem' }}>Thông tin cá nhân</Typography>
          <Divider />
          <TextField sx={{ marginX: 3 }} label='Họ và tên' />
          <TextField sx={{ marginX: 3 }} label='Mã sinh viên' />
          <TextField sx={{ marginX: 3 }} label='Email' />
          <TextField sx={{ marginX: 3 }} label='Địa chỉ' />
          <Box sx={{ display: 'flex', gap: 1, marginX: 3 }}>
            <TextField sx={{ width: '100%' }} label='Số điện thoại' />
            <TextField sx={{ width: '100%' }} label='Ngày sinh' />
          </Box>
          <Button sx={{ width: 'fit-content', marginX: 3 }}>Lưu thay đổi</Button>
        </Box>
      </Box>
    </>
  )
}
export default Profile