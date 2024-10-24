import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
const Subject = () => {
  return (
    <Button
      variant='text'
      startIcon={<DriveFileRenameOutlineOutlinedIcon sx={{ width: 27, height: 27, mr: 2 }} />}
      color='primary'
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 3,
        borderRadius: 2,
        width: '100%',
        color: 'text.main',
        ':hover': {
          backgroundColor: 'primary.more'
        }
      }}
    >
      <Typography sx={{ fontWeight: 600, fontSize: '17px' }}>Đăng kí đò án</Typography>
    </Button>
  )
}
export default Subject