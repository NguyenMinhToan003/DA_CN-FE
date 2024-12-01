import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import CloseIcon from '@mui/icons-material/Close'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { useState } from 'react'
import { toast } from 'react-toastify'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { uploadResource } from '~/apis/resourceAPI'
import { useParams } from 'react-router-dom'
import AutorenewIcon from '@mui/icons-material/Autorenew'

const UploadResource = ({ open, onClose, setIsChange }) => {
  const param = useParams()
  const topicId = param.id
  const profile = JSON.parse(localStorage.getItem('user'))
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [mediaPrev, setMediaPrev] = useState([])
  const [mediaUpload, setMediaUpload] = useState([])
  const [loading, setLoading] = useState(false)

  const handleUploadFile = (e) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    const newMediaUpload = [...files]
    const newMediaPrev = newMediaUpload.map((file) => URL.createObjectURL(file))

    setMediaUpload((prev) => [...prev, ...newMediaUpload])
    setMediaPrev((prev) => [...prev, ...newMediaPrev])
  }

  const handlerRemoveMedia = (index) => () => {
    if (index < 0 || index >= mediaPrev.length) return
    setMediaUpload((prev) => prev.filter((_, i) => i !== index))
    setMediaPrev((prev) => {
      const updatedPrev = prev.filter((_, i) => i !== index)
      URL.revokeObjectURL(prev[index])
      return updatedPrev
    })
  }

  const handleClearInput = () => {
    setTitle('')
    setContent('')
    setMediaPrev([])
    setMediaUpload([])
  }

  const handleSubmit = async () => {
    if (!title || !content || mediaUpload.length === 0) {
      toast.error('Điền đầy đủ thông tin và upload media.')
      return
    }
    try {
      setLoading(true)
      const data = new FormData()
      data.append('name', title)
      data.append('description', content)
      data.append('topicId', topicId)
      data.append('studentId', profile._id)
      mediaUpload.forEach((file) => data.append('file', file))
      const response = await uploadResource(data)
      if (response.acknowledged) {
        toast.success(response.message)
        setIsChange(true)
      } else {
        toast.error(response.message)
      }
      handleClearInput()
      onClose()
    }
    catch (error) {
      toast.error(error.message)
    }
    finally {
      setLoading(false)
    }

  }
  return <>
    {
      open && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', top: 0, left: 0, right: 0, height: '100%', zIndex: 100, p: 3, backgroundColor: '#00000050' }}>
          <Container
            maxWidth="md"
            sx={{
              backgroundColor: 'secondary.main', p: 4, boxShadow: 24, borderRadius: 2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Create Resource
                </Typography>
                <IconButton onClick={onClose} disabled={loading}>
                  <HighlightOffIcon color='error' />
                </IconButton>
              </Box>
              <Divider sx={{ mb: 3 }} />
              <TextField
                value={title}
                autoFocus
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
              <Button
                sx={{ display: 'block', my: 2 }}
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
                    borderRadius: 1,
                    height: 200,
                    overflowY: 'auto'
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
            </Box>

            <Button
              startIcon={loading ? <AutorenewIcon /> : <CheckCircleOutlineIcon />}
              sx={{ mt: 3, width: '100%', p: 2, color: 'third.main', fontWeight: 'bold' }}
              variant="contained"
              color="success"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? 'Posting...' : 'Post Now'}
            </Button>
          </Container >
        </Box >
      )
    }
  </>
}

export default UploadResource