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
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ReplyIcon from '@mui/icons-material/Reply'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt'
import { InputBase } from '@mui/material'
const Chat = () => {
  const profile = {
    _id: '1',
    profile_picture: 'https://i.pravatar.cc/300',
    name: 'Nguyễn Văn A'
  }
  const [key, setKey] = useState('')
  const { id } = useParams()
  const navigate = useNavigate()
  const roomchat = {
    _id: '1',
    room_name: 'Đồ án công nghệ phần',
    messages: [
      {
        _id: '1',
        message: 'hello',
        sender_id: '1',
        sender: {
          _id: '1',
          profile_picture: 'https://i.pravatar.cc/300',
          name: 'Nguyễn Văn A'
        },
        status: 'sent'
      },
      {
        _id: '2',
        message: 'hi there',
        sender_id: '2',
        sender: {
          _id: '2',
          profile_picture: 'https://i.pravatar.cc/300',
          name: 'Nguyễn Văn A'
        },
        status: 'sent'
      },
    ]
  }
  const [chat, setChat] = useState('')
  const [loading, setLoading] = useState(false)
  const [openMenuRoom, setOpenMenuRoom] = useState(false)

  return (
    <>

      <Box sx={{ paddingX: 2, paddingY: 1, backgroundColor: 'background.default', height: '100vh' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', backgroundColor: 'secondary.main', height: '100%', borderRadius: 3 }}>
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
                <Typography variant="body1">{roomchat?.room_name}</Typography>
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
                        sx={{ width: '36px', height: '36px' }}
                      />
                    )}
                    <Typography
                      variant='body1'
                      sx={{
                        wordBreak: 'break-word',
                        lineHeight: '1.5',
                        letterSpacing: '0.6px',
                        maxWidth: '70%',
                        backgroundColor:
                          data.status === 'deleted' ? 'error.light' : data.sender._id === profile._id ? 'messages.bg_primary' : 'messages.bg_secondary',
                        color:
                          data.status === 'deleted' ? 'messages.text_primary' :
                            data.sender._id === profile._id ? 'messages.text_primary' : 'messages.text_secondary',
                        borderRadius: 6,
                        padding: '10px 15px',
                        fontSize: '15px',
                        fontweight: '50'
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
              <Tooltip title="Send">
                <IconButton color="info" >
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
