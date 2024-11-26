import {
  Box,
  TextField,
  Typography,
  Button,
  IconButton,
  Container
} from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import CloseIcon from '@mui/icons-material/Close'
import TagIcon from '@mui/icons-material/Tag'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { useState } from 'react'
import { toast } from 'react-toastify'

const CreateResource = () => {
  const profile = { _id: '123' }
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [mediaPrev, setMediaPrev] = useState([])
  const [mediaUpload, setMediaUpload] = useState([])
  const [hastag, setHastag] = useState([])
  const [loading, setLoading] = useState(false)

  const handleUploadFile = (e) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const newMediaUpload = Array.from(files)
    const newMediaPrev = newMediaUpload.map((file) => URL.createObjectURL(file))

    setMediaUpload((prev) => [...prev, ...newMediaUpload])
    setMediaPrev((prev) => [...prev, ...newMediaPrev])
  }

  const handlerRemoveMedia = (index) => () => {
    if (index < 0 || index >= mediaPrev.length) return

    setMediaUpload((prev) => prev.filter((_, i) => i !== index))
    setMediaPrev((prev) => {
      const updatedPrev = prev.filter((_, i) => i !== index)
      URL.revokeObjectURL(prev[index]) // Free memory
      return updatedPrev
    })
  }

  const handleChangeHastag = (e) => {
    const value = e.target.value.trim()
    if (!value) return setHastag([])
    setHastag(value.split(/[ ,]+/))
  }

  const handleSubmit = async () => {
    if (!title || !content || mediaUpload.length === 0) {
      toast.error('Please fill all fields and upload media.')
      return
    }

    setLoading(true)
    try {
      const data = new FormData()
      data.append('', title)
      data.append('content', content)
      data.append('author_id', profile._id)
      data.append('hastag', JSON.stringify(hastag)) // Convert array to string
      mediaUpload.forEach((file) => data.append('media', file))

      // Simulate API request
      await new Promise((resolve) => setTimeout(resolve, 2000)) // Replace with actual API call
      toast.success('Post created successfully!')

      // Reset form
      setTitle('')
      setContent('')
      setMediaPrev([])
      setMediaUpload([])
      setHastag([])
    } catch (error) {
      console.error(error)
      toast.error('Failed to create post.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container
      maxWidth="md"
      sx={{ backgroundColor: 'secondary.main', p: 4 }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        Create Resource
      </Typography>

      <TextField
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
        label="Tiêu đề"
      />

      <TextField
        value={content}
        onChange={(e) => setContent(e.target.value)}
        fullWidth
        margin="normal"
        label="Nội dung"
        multiline
        rows={5}
      />
      <TextField
        onChange={handleChangeHastag}
        fullWidth
        margin="normal"
        label="Hashtags (comma or space separated)"
        InputProps={{ startAdornment: <TagIcon sx={{ mr: 1 }} /> }}
      />
      <Button
        sx={{ display: 'block', mb: 2 }}
        component="label"
        htmlFor="upload-file"
        variant="contained"
        color="primary"
        startIcon={<CloudUploadIcon />}
      >
        Upload Media
      </Button>
      <input
        type="file"
        id="upload-file"
        style={{ display: 'none' }}
        multiple
        onChange={handleUploadFile}
      />

      {mediaPrev.length > 0 && (
        <Box
          sx={{
            mt: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            backgroundColor: 'third.more',
            p: 3,
            borderRadius: 1
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            Media Preview
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              backgroundColor: 'secondary.main',
              borderRadius: 1,
              padding: 2,
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}
          >
            {mediaPrev.map((file, index) => (
              <Box key={index} sx={{ position: 'relative' }}>
                <img
                  src={file}
                  alt="Preview"
                  style={{
                    width: '150px',
                    height: '150px',
                    objectFit: 'cover'
                  }}
                />
                <IconButton
                  color='primary'
                  sx={{
                    position: 'absolute',
                    top: '-10px',
                    backgroundColor: 'secondary.main',
                    right: '-10px',
                    color: 'white',
                    height: '25px',
                    width: '25px'
                  }}
                  onClick={handlerRemoveMedia(index)}
                >
                  <CloseIcon color='error' />
                </IconButton>
              </Box>
            ))}
          </Box>
        </Box>
      )}

      <Button
        startIcon={<CheckCircleOutlineIcon />}
        sx={{ mt: 3, width: '100%', p: 2, color: 'third.main', fontWeight: 'bold' }}
        variant="contained"
        color="success"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? 'Posting...' : 'Post Now'}
      </Button>
    </Container>
  )
}

export default CreateResource
