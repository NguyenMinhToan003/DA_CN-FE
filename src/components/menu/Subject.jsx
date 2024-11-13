import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import theme from '../../theme';
const Subject = ({ widthNav }) => {
  return (
    <Button
      variant='text'
      startIcon={<DriveFileRenameOutlineOutlinedIcon sx={{ width: 27, height: 27, mr: 2 }} />}
      color='primary'
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingX: 2.6,
        paddingY: 2,
        borderRadius: 1,
        '.active &': {
          color: 'secondary.more',
          backgroundColor: 'primary.more'
        },
        transition: 'width 0.3s ease',
        width: '100%',
        color: 'text.main',
        ':hover': {
          backgroundColor: 'primary.more'
        }
      }}
    >
      {
        widthNav === theme.Layout.navWidth && <Typography >Đề tài</Typography>
      }
    </Button>
  )
}
export default Subject