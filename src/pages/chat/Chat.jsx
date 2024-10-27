import Box from '@mui/material/Box'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import AddReactionIcon from '@mui/icons-material/AddReaction'
import SendIcon from '@mui/icons-material/Send'
import Chip from '@mui/material/Chip'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import { socket } from '~/socket'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close'
import theme from '~/theme'
import { InputBase } from '@mui/material'
const Chat = () => {
  const profile = {
    _id: '1',
    profile_picture: 'https://i.pravatar.cc/300',
    name: 'Nguyễn Văn A'
  }
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
        paddingX: 2,
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
              height: '60px',
              padding: '10px'
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
              <Tooltip title="Back">
                <IconButton onClick={() => navigate('/roomchats')} sx={{ color: 'error.main' }}>
                  <ArrowBackIcon />
                </IconButton>
              </Tooltip>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
                <Avatar />
                <Typography >{roomchat?.room_name}</Typography>
              </Box>
            </Box>
            <Tooltip title="More">
              <IconButton onClick={() => setOpenMenuRoom(true)}>
                <MoreHorizIcon sx={{ color: 'text.primary' }} />
              </IconButton>
            </Tooltip>
          </Box>
          <Divider />
          <Box sx={{ overflowY: 'auto', overflowX: 'hidden', height: '100%', padding: 1 }}>
            {loading && <LoadingArea />}
            {roomchat?.messages?.error ? (
              <Divider sx={{ margin: 1 }}>
                <Typography variant='body1' sx={{ color: 'red', fontWeight: 'bold' }}>{roomchat.messages.error}
                </Typography>
              </Divider>
            ) : (
              roomchat?.messages?.length === 0 ?
                <Divider sx={{ margin: 1 }}>
                  <Chip label={`Try chatting with ${roomchat?.room_name} now`} color='success' />
                </Divider>
                : roomchat?.messages?.map((data, index) => (
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
                    <Typography
                      sx={{
                        maxWidth: '70%',
                        backgroundColor:
                          data.sender._id === profile._id
                            ? 'messages.bg_primary'
                            : 'messages.bg_secondary',
                        color:
                          data.sender._id === profile._id
                            ? 'messages.text_primary'
                            : 'messages.text_secondary',
                        fontWeight: 500,
                        fontSize: '1.0625rem',
                        lineHeight: '1.625rem',
                        borderRadius: 5,
                        padding: '0.75rem 1.25rem',
                        whiteSpace: 'pre-wrap',
                        overflowWrap: 'break-word',
                        height: 'fit-content'
                      }}
                    >
                      {data.message}
                    </Typography>


                    {/* <Box className='more' sx={{
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                      visibility: 'hidden',
                      height: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 1,
                      flexDirection: profile._id === data.sender._id ? 'row' : 'row-reverse'
                    }}>
                      {
                        data.status !== 'deleted' && (
                          <>
                            <IconButton
                              onClick={() => setOpenMenuMessage({ status: true, data: { ...data, roomId: id } })}
                              sx={{ width: '30px', height: '30px' }}>
                              <MoreVertIcon sx={{ with: '20px', height: '20px' }} />
                            </IconButton>

                            <IconButton sx={{ width: '30px', height: '30px' }}>
                              <ReplyIcon sx={{ with: '20px', height: '20px', color: 'red' }} />
                            </IconButton>
                            <IconButton sx={{ width: '30px', height: '30px' }}>
                              <SentimentSatisfiedAltIcon sx={{ with: '20px', height: '20px' }} />
                            </IconButton>
                          </>
                        )
                      }
                    </Box> */}
                  </Box>
                ))
            )}


          </Box>
          <Divider />
          <Box sx={{ display: 'flex', gap: 1, padding: 1 }}>
            <Box sx={{ display: 'flex' }}>
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
            </Box>
            <Box
              sx={{
                height: '45px',
                width: '100%',
                borderRadius: '50px',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <InputBase
                onBlur={() => handleUnTyping()}
                onFocus={() => handleTyping()}
                onChange={(e) => setKey(e.target.value)}
                value={key}
                autoFocus
                placeholder="Aa"
                sx={{
                  backgroundColor: 'background.default',
                  border: 'none',
                  width: '100%',
                  height: '100%',
                  outline: 'none',
                  color: 'text.main',
                  fontSize: '1rem',
                  borderRadius: '50px',
                  paddingLeft: 2
                }}
              />
              {
                key !== '' &&
                (
                  <IconButton color="info" onClick={() => setKey('')}>
                    <CloseIcon />
                  </IconButton>
                )
              }
              <Tooltip title='Send'>
                <IconButton color='info' onClick={handleSendMessage}>
                  <SendIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Box >
      </Box>
    </>
  )
}

export default Chat
