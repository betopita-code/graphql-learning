import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import convertTime from '../helper/convertTime'

let roles = { values: ['ADMIN', 'USER'], message: '{VALUE} it is not a valid role' }

let userSchema = new mongoose.Schema({

  createdAt: { type: Date, default: convertTime.dateNow(Date.now) },

  updatedAt: { type: Date },

  name: { type: String, unique: true, required: [true, 'The name is required'] },

  email: { type: String, unique: true, required: [true, 'The email is required'] },

  pw_login: { type: String, required: [true, 'The password is required'] },

  role: { type: String, default: 'USER', enum: roles },

  status: { type: Boolean, default: true }

})

userSchema.methods.toJSON = function () {

  let user = this
  let userObject = user.toObject()
  delete userObject.pw_login

  return userObject
}

userSchema.plugin(uniqueValidator, { message: '{PATH} it must be unique' })

export default mongoose.model('user', userSchema)
