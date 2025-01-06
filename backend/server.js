const express = require('express')
const dotenv = require('dotenv')
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')
const messageRoutes = require('./routes/messageRoutes')
const connectDB = require('./config/db')
const path = require('path')
const axios = require('axios');
const cron = require('node-cron');


dotenv.config()
connectDB()

const app = express()

app.use(express.json())

app.use('/api/user', userRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/message', messageRoutes)

// ---------Deployment-----------
const dirname = path.resolve()
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(dirname, '/frontend/build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(dirname, 'frontend', 'build', 'index.html'))
  })

}
// ---------Deployment-----------
const PORT = process.env.PORT || 5001

const server = app.listen(PORT, console.log(`Server Started on Port ${PORT}`))

cron.schedule('*/10 * * * *', async () => {
  try {
    await axios.get('https://ti-talk.onrender.com');
    console.log('Pinged self successfully.');
  } catch (error) {
    console.error('Failed to ping self:', error.message);
  }
});

console.log('Cron job started. Pinging every 10 minutes.');

const io = require('socket.io')(server, {
  pingTimeout: 60000,
  cors: {
    origin: 'http://localhost:3000'
  }
})

io.on('connection', (socket) => {
  console.log(`Socket connected: ${socket.id}`)
  socket.on('setup', (userId) => {
    socket.join(userId)
    socket.emit('connected')
  })

  socket.on('join chat', (room) => {
    socket.join(room)
    console.log(`user joined room ${room}`)
  })

  socket.on('new message', (newMessageReceived) => {
    let chat = newMessageReceived.chat
    if (!chat.users) return console.log('chat.users not defined')
    chat.users.forEach(user => {
      if (user._id !== newMessageReceived.sender._id) {
        socket.in(user._id).emit('message received', newMessageReceived)
      }
    });
  })

  socket.on('typing', (room, typingUser) => socket.in(room).emit('typing', typingUser))
  socket.on('stop typing', (room) => socket.in(room).emit('stop typing'))



})