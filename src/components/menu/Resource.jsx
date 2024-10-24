import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { Button, Typography } from '@mui/material';
const Resource = () => {
  return (
    <Button
      variant='text'
      startIcon={<DescriptionOutlinedIcon sx={{ width: 27, height: 27, mr: 2 }} />}
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
      <Typography sx={{ fontWeight: 600, fontSize: '17px' }}>Tài liệu</Typography>
    </Button>
  )
}
export default Resource;