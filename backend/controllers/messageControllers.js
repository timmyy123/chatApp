const asyncHandler = require("express-async-handler");
const Chat = require('../models/chatModel')
const User = require('../models/userModel')
const Message = require('../models/messageModel')

const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body

  if (!content || !chatId) {
    res.status(400).send('No content or chatId')
  }

  const chat = await Chat.findById(chatId)

  if (!chat) {
    res.status(400).send('Chat not found')
  }

  const isSenderInChat = chat.users.some((user) => user.toString() === req.user._id.toString())

  if (!isSenderInChat) {
    res.status(403).send("You don't have permissions to send messages in this chat")
  }

  try {
    let message = await Message.create({
      sender: req.user._id,
      content: content,
      chat: chatId
    })

    message = await message.populate('sender', 'name')
    message = await message.populate('chat')
    message = await User.populate(message, {
      path: 'chat.users',
      select: 'name email'
    })

    await Chat.findByIdAndUpdate(chatId, {latestMessage: message})
    res.json(message)
  } catch (error) {
    res.status(400).send(error.message)
  }
})

const allMessages = asyncHandler(async(req, res) => {
  try{
    const messages = await Message.find({chat: req.params.chatId})
      .populate('sender', 'name email')
      .populate('chat')
    res.json(messages)
  } catch (error) {
    res.status(400).send(error.message)
  }
})

module.exports = {sendMessage, allMessages}