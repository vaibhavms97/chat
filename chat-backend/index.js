const app = require("./server/server");
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, (req, res) => {
  console.log(`Server started on port 5000`)
})

const io = require('socket.io')(server, {
  pingTimeOut: 60000,
  cors: {
    origin: "http://localhost:3000"
  }
})

io.on('connection', (socket) => {
  socket.on('setup', (userId) => {
    socket.join(userId);
    socket.emit('connected')
  })

  socket.on('join chat', (room) => {
    socket.join(room);
  })

  socket.on('new message', (newMessage) => {
    var group = newMessage.groupId
    if(!group.users) return
    group.users.forEach(user => {
      if(user == newMessage.userId._id) return
      else {
        socket.in(user).emit('message received', newMessage)
      }
    });
  })
})