const express = require('express')
const dotenv = require('dotenv')
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')
const messageRoutes = require('./routes/messageRoutes')
const connectDB = require('./config/db')

dotenv.config()
connectDB()

const app = express()

app.use(express.json())

app.use('/api/user', userRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/message', messageRoutes)
const PORT = process.env.PORT || 5001

app.listen(PORT, console.log(`Server Started on Port ${PORT}`))