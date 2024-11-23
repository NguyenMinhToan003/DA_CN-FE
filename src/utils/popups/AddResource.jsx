import TextField from '@mui/material/TextField'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { useState } from 'react'
const AddResource = ({ resourceName, setResourceName, resourceDescription, setResourceDescription,
  resourceLink, setResourceLink }) => {
  const [img, setImg] = useState('')
  const handleUpload = (e) => {
    const img = URL.createObjectURL(e.target.files[0])
    setImg(img)
  }
  return <>
    <TextField
      fullWidth
      label='Tên tài nguyên'
      variant='outlined'
      onChange={(e) => setResourceName(e.target.value)}
      margin='normal'
    />
    <TextField
      fullWidth
      label='Mô tả'
      variant='outlined'
      onChange={(e) => setResourceDescription(e.target.value)}
      multiline
      rows={4}
      margin='normal'
    />
    <input
      type='file' id='file' style={{ display: 'none' }}
      onChange={(e) => { setResourceLink(e.target.files[0]); handleUpload(e) }}
    />
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', my: 3 }} >
      <label htmlFor='file'>
        <Button component='span' startIcon={<AttachFileIcon />}>
          Upload
        </Button>
      </label>
    </Box>
    {
      img &&
      <Box fullWidth sx={{ borderRadius: 2, p: 1.5, backgroundColor: 'primary.more' }}>
        <IconButton color='error' onClick={() => { setResourceLink(''); setImg('') }} >
          <CloseIcon />
        </IconButton>
        <img style={{ width: '100%', objectFit: 'cover', borderRadius: 'inherit' }} src={img} />
      </Box>
    }
  </>
}
export default AddResource