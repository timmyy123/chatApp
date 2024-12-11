const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema(
  {
    name: {type: 'String', required: true},
    email: {type: 'String', unique: true, required: true},
    password: {type: 'String', required: true},
  },
  {timestaps: true}
)

userSchema.methods.matchPassword = async function (enteredPassword) {
  console.log(enteredPassword, this.password)
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
  if(!this.isModified) {
    next()
  }
  console.log(`${this.password} fsbdfb`)
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

module.exports = mongoose.model('User', userSchema)