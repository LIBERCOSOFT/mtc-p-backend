import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const SuperAdminSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})

SuperAdminSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

SuperAdminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const SuperAdmin = mongoose.model('SuperAdmin', SuperAdminSchema)

export default SuperAdmin
