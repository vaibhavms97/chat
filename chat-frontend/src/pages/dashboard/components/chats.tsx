import { Typography } from "@mui/material"
import { TextField } from "@mui/material"
import { IconButton } from "@mui/material"
import { InputAdornment } from "@mui/material"
import { Box } from "@mui/material"
import { useEffect, useState } from "react"
import { getMessages, sendMessage } from "service/messageService"
import SendIcon from '@mui/icons-material/Send';
import OutlinedInput from '@mui/material/OutlinedInput';
import io, { Socket } from 'socket.io-client';
import { DefaultEventsMap } from "@socket.io/component-emitter"

interface GroupListInterface {
  _id: string,
  name: string,
  users: string[]
}

interface ChatProps {
  selectedGroup: GroupListInterface | null
}

interface UserInterface {
  _id: string,
  name: string,
  email: string
}

interface MessageInterface {
  _id: string,
  userId: UserInterface,
  message: string,
  groupId: GroupListInterface
}

const BACKEND_ENDPOINT = "http://localhost:5000"
var socket: Socket<DefaultEventsMap, DefaultEventsMap>, selectedGroupForSocket: GroupListInterface

const Chats = ({selectedGroup}: ChatProps) => {

  const [messages, setMessages] = useState<MessageInterface[]>([])
  const userId = localStorage.getItem('id') || ''
  const [inputMessage, setInputMessage] = useState<string>('')
  const [socketConnected, setSocketConnected] = useState<boolean>(false)

  useEffect(() => {
    socket = io(BACKEND_ENDPOINT)
    socket.emit('setup', userId);
    socket.on('connected', () => {
      setSocketConnected(true)
    })
  },[])

  useEffect(() => {
    if(selectedGroup) {
      getMessages({groupId: selectedGroup._id})
      .then((res) => {
        setMessages(res.data.messages || []);
        socket.emit('join chat', selectedGroup._id);
      })
      selectedGroupForSocket = selectedGroup
    }
  }, [selectedGroup])

  useEffect(() => {
    socket.on('message received', (newMessageReceived: MessageInterface) => {
      if(!selectedGroupForSocket || userId !== newMessageReceived.userId._id) {
        setMessages([...messages, newMessageReceived])
      }
    })
  })

  const sendMessageToDb = () => {
    const data = {
      message: inputMessage,
      groupId: selectedGroup?._id || '',
      userId: userId
    }
    sendMessage(data)
    .then((res) => {
      if(selectedGroup) {
        const messageData: MessageInterface = res.data.result
        socket.emit("new message", messageData)
        setMessages([...messages, messageData])
        setInputMessage('')
      }
    })
    .catch((err) => console.error(err))
  }

  return(
    <Box className='chat'>
      <Box display='flex' flexDirection='column'>
        {messages?.map(message => (
          <Box key={message._id} className={`message ${message.userId._id === userId ? 'myChat' : 'othersChat'}`}>
            {message.userId._id !== userId && <Box className='userName'>{message.userId.name}</Box>}
            <Typography className='userMessage'>{message.message}</Typography>
          </Box>
        ))}
      </Box>
      <Box my={2} mx={4} >
        <OutlinedInput 
          fullWidth
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={sendMessageToDb}>
                <SendIcon sx={{color:'#5046e5'}}/>
              </IconButton>
            </InputAdornment>
          }
        />
      </Box>
    </Box>
  )
}

export default Chats