const express = require('express'); //Line 1
const app = express()
const port = process.env.PORT || 5500;
const users = {}
const http = require('http').Server(app);
const io = require('socket.io')(http)

//server
http.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

io.on('connection', socket => {
  socket.on('new-user', name => {
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
  })
  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
  })
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
})
