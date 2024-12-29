const asyncHandler = require('express-async-handler')
const Chat = require('../models/chatModel')
const User = require('../models/userModel')

const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body

  if (!userId) {
    console.log('UserId not sent')
    return res.sendStatus(400)
  }

  let isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } }
    ]
  }).populate('users', '-password')
    .populate('latestMessage')


  if (isChat.length > 0) {
    isChat = await User.populate(isChat[0], {
      path: 'latestMessage.sender',
      select: 'name email'
    })
    res.send(isChat)
  } else {
    let chatData = {
      chatName: req.user.name,
      isGroupChat: false,
      users: [req.user._id, userId]
    }

    try {
      const createdChat = await Chat.create(chatData)
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        'users',
        '-password'
      )
      res.status(200).json(FullChat)
    } catch (error) {
      res.status(400).json({ message: error.message })

    }
  }
})

const fetchChats = asyncHandler(async (req, res) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate('users', '-password')
      .populate('Admin', '-password')
      .populate('latestMessage')
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: 'latestMessage.sender',
          select: 'name email'
        })
        res.status(200).send(results)
      })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

const createGroupChat = asyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: 'Please enter all the fields' })
  }

  let users = JSON.parse(req.body.users)

  
  if (users.length < 2) {
    return res.status(400).send('Group chats require at least 3 users')
  }
  
  users.push(req.user)
  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user
    })

    const filledGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate('users', '-password')
      .populate('Admin', '-password')

    res.status(200).json(filledGroupChat)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

const renameGroup = asyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName: chatName
    },
    {
      new: true
    }
  )
    .populate('users', '-password')
    .populate('Admin', '-password')

  if (!updatedChat) {
    res.status(404).send('Chat not found')
  } else {
    res.json(updatedChat)
  }
})

const removeFromGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body

  const chat = await Chat.findById(chatId)

  if (!chat) {
    res.status(404).send('Chat not found')
  }

  if ((req.user._id.toString() === userId.toString()) == (chat.Admin.toString() === req.user._id.toString())) {
    res.status(403).send("Admin can't leave the group, non-admins can't remove others")
  }

  await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId }
    },
    {
      new: true
    }
  )
    .populate('users', '-password')
    .populate('Admin', '-password')
    .then((removed) => {
      res.json(removed)
    }).catch((error) => {
      res.status(500).send(error.message)
    })
})

const addToGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body

  const chat = await Chat.findById(chatId)

  if (!chat) {
    res.status(404).send('Chat not found')
  }

  if (chat.Admin.toString() !== req.user._id.toString()) {
    res.status(403).send("You don't have authority to add a user")
  }

  await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId }
    },
    {
      new: true
    }
  )
    .populate('users', '-password')
    .populate('Admin', '-password')
    .then((added) => {
      res.json(added)
    }).catch((error) => {
      res.status(500).send(error.message)
    })
})

module.exports = {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup
}