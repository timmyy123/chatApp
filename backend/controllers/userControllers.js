const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const generateToken = require('../config/generateToken')

const registerUser = asyncHandler(async (req, res) => {
  const {name, email, password} = req.body

  if(!name || !email || !password) {
    res.status(400)
    throw new Error('Please fill all the fields')
  }
  const userExists = await User.findOne({email})

  if(userExists) {
    res.status(400)
    throw new Error("A user with this email already exists")
  }

  const user = await User.create({
    name,
    email,
    password
  })

  if(user){
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Failed to create user')
  }
})

const authUser = asyncHandler(async(req, res) => {
  const {email, password} = req.body
  
  const user = await User.findOne({email})
  
  console.log('yes')

  if(user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(401);
    throw new Error('Email or Password does not match')
  }
})

const searchUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
      $or: [
        {name: {$regex: req.query.search, $options: 'i'}},
        {email: req.query.search}
      ]
    }: {}

    const users = await User.find(keyword,{password: 0}).find({_id: {$ne: req.user._id}})
    res.send(users)
})

module.exports = {registerUser, authUser, searchUsers}