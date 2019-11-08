import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

let roles = {
    values: ['ADMIN', 'USER'],
    message: '{VALUE} it is not a valid role'
}

// let Schema = moongoose.Schema;

let userSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'The name is necessary']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'The email is necessary']
    },
    pw_login: {
        type: String,
        required: [true, 'The password is necessary']
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: roles
    },
    status: {
        type: Boolean,
        default: true
    }
})

// Remove the password when a query is made (for security).
userSchema.methods.toJSON = function () {
    let user = this
    let userObject = user.toObject()
    delete userObject.pw_login

    return userObject
}

userSchema.plugin(uniqueValidator, { message: '{PATH} it must be unique' })

export default mongoose.model('user', userSchema)
