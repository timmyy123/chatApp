const express = require('express')
const dotenv = require('dotenv')
const userRoutes = require('./routes/userRoutes')
const connectDB = require('./config/db')

dotenv.config()
connectDB()

const app = express()

app.use(express.json())

// app.get('/api', (req, res) => {
//   console.log('server')
//   res.send('Hello from the backend!')
// })

app.use('/api/user', userRoutes)
const PORT = process.env.PORT || 5001

app.listen(PORT, console.log(`Server Started on Port ${PORT}`))