import Box from '@mui/material/Box'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import AddReactionIcon from '@mui/icons-material/AddReaction'
import SendIcon from '@mui/icons-material/Send'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import { socket } from '~/socket'
import { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close'
import theme from '~/theme'
import Button from '@mui/material/Button'
import InputBase from '@mui/material/InputBase'

const Chat = () => {
  const profile = {
    _id: '1',
    profile_picture: 'https://i.pravatar.cc/300',
    name: 'Nguyễn Văn A'
  }
  const inputRef = useRef(null)
  const [key, setKey] = useState('')
  const [roomchat, setRoomchat] = useState({})
  const { id } = useParams()
  const navigate = useNavigate()
  const originChat = {
    _id: '1',
    room_name: 'Đồ án công nghệ phần',
    messages: [
      {
        _id: '1',
        message: 'hello here',
        sender_id: '1',
        sender: {
          _id: '1',
          profile_picture: 'https://i.pravatar.cc/300',
          name: 'Nguyễn Văn A'
        },
        status: 'sent'
      },
      {
        _id: '1',
        message: 'You grid Material ui CopilotMaterial- UI(MUI) is a popular React UI library that implements Googles Material Design1.Thegrid system in MUI is flexible and responsive, adapting to different screen sizes and orientations2',
        sender_id: '2',
        sender: {
          _id: '2',
          profile_picture: 'https://i.pravatar.cc/300',
          name: 'Nguyễn Văn A'
        },
        status: 'sent'
      }
    ]
  }
  const fetchRoomChat = async () => {
    setRoomchat(originChat)
  }
  useEffect(() => {
    fetchRoomChat()
  }, [])
  const handleSendMessage = () => {
    setKey('')
    inputRef.current.lastElementChild.focus()
    socket.emit('chat_message', { key })
  }
  useEffect(() => {
    socket.on('chat_message', (msg) => {
      setRoomchat((prev) => {
        return {
          ...prev,
          messages: [...prev.messages, {
            _id: '1',
            message: msg.key,
            sender_id: '1',
            sender: {
              _id: '1',
              profile_picture: 'https://i.pravatar.cc/300',
              name: 'Nguyễn Văn A'
            },
            status: 'sent'
          }]
        }
      })
    })
  }, [])
  const [loading, setLoading] = useState(false)
  const [openMenuRoom, setOpenMenuRoom] = useState(false)
  return (
    <>

      <Box sx={{
        paddingX: 1,
        paddingY: 1,
        backgroundColor: 'background.default',
        height: `calc(100vh - ${theme.Layout.headerHeight}px)`
      }}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'secondary.main',
          height: '100%',
          borderRadius: 3
        }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: 60,
              padding: 1
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'center',
                gap: 1,
                backgroundColor: 'background.primary'
              }}
            >
              <Tooltip title='back'>
                <IconButton onClick={() => navigate('/roomchats')} color='error'>
                  <ArrowBackIcon />
                </IconButton>
              </Tooltip>
              <Button startIcon={<Avatar sx={{ width: 36, height: 36 }} />}>
                <Typography sx={{ color: 'text.main' }}>
                  {roomchat?.room_name}
                </Typography>
              </Button>
            </Box>
            <Tooltip title='menu'>
              <IconButton onClick={() => setOpenMenuRoom(true)}>
                <MoreHorizIcon sx={{ color: 'text.primary' }} />
              </IconButton>
            </Tooltip>
          </Box>
          <Divider />
          <Box sx={{ overflowY: 'auto', overflowX: 'hidden', height: '100%', padding: 1 }}>
            {
              roomchat?.messages?.map((data, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    justifyContent:
                      data.sender._id === profile._id ? 'row-reverse' : 'row',
                    alignItems: 'start',
                    maxWidth: '100%',
                    flexDirection: data.sender._id === profile._id ? 'row-reverse' : 'row',
                    gap: 1,
                    padding: '5px',
                    ':hover .more': { opacity: 1, visibility: 'visible' }
                  }}
                >
                  {data.sender._id !== profile._id && (
                    <Avatar
                      src={data.sender.profile_picture}
                      sx={{ width: 36, height: 36 }}
                    />
                  )}
                  <Box sx={{
                    maxWidth: '70%',
                    backgroundColor:
                      data.sender._id === profile._id
                        ? 'messages.bg_primary'
                        : 'messages.bg_secondary',
                    borderRadius: 5,
                    padding: '0.75rem 1.25rem',
                    height: 'fit-content',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 0.5
                  }}>
                    {
                      data.sender._id !== profile._id && (
                        <Typography
                          sx={{
                            color: 'black',
                            fontWeight: 500,
                            fontSize: '1.0625rem',
                            lineHeight: '1.625rem',
                            whiteSpace: 'pre-wrap',
                            overflowWrap: 'break-word'
                          }}
                        >
                          {data.sender.name}
                        </Typography>
                      )
                    }
                    <Typography
                      sx={{
                        color:
                          data.sender._id === profile._id
                            ? 'messages.text_primary'
                            : 'messages.text_secondary',
                        fontWeight: 500,
                        fontSize: '1.0625rem',
                        lineHeight: '1.625rem',
                        whiteSpace: 'pre-wrap',
                        overflowWrap: 'break-word'
                      }}
                    >
                      {data.message}
                    </Typography>
                  </Box>
                </Box>
              ))
            }
          </Box>
          <Divider />
          <Box sx={{
            height: 60,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            padding: 1
          }}>

            <Tooltip title="Add reaction">
              <IconButton color="error">
                <AddReactionIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Attach file">
              <IconButton color="warning" component="label">
                <AttachFileIcon />
                <input type="file" style={{ display: 'none' }} />
              </IconButton>
            </Tooltip>
            <InputBase
              ref={inputRef}
              onChange={(e) => setKey(e.target.value)}
              value={key}
              component='textarea'
              placeholder="Aa"
              sx={{
                backgroundColor: 'background.default',
                border: 'none',
                width: '100%',
                height: '100%',
                outline: 'none',
                color: 'text.main',
                fontSize: '1rem',
                borderRadius: 3,
                padding: 3
              }}
            />
            <IconButton color="info" onClick={() => setKey('')}
              sx={{
                display: key ? 'flex' : 'none'
              }}>
              <CloseIcon />
            </IconButton>
            <Tooltip title='Send'>
              <IconButton color='info' onClick={handleSendMessage}>
                <SendIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box >
    </>
  )
}

export default Chat
