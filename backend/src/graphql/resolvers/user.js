import bcrypt from 'bcrypt'
import { isAuth, isAdmin } from '../../config/errors/authentication'
import { pubsub } from '../../config/apollo'
import { trimmer } from '../../helper/trimObj'
import convertTime from '../../helper/convertTime'

export default {

  Subscription: {

    newUser: { subscribe: () => pubsub.asyncIterator('NEW_USER') }
  },

  Query: {

    readUser: isAuth.createResolver( async (root, { id, name }, { models: { user } }) => {

      try {

        const keys = [ 'id', 'name' ]

        let inputTrim = trimmer({ id, name }, keys)

        if(inputTrim.name)
          inputTrim.name = inputTrim.name.toUpperCase()

        let type
        let User
        
        if(id ? type = { status: true, _id: inputTrim.id } : type = { status: true, name: inputTrim.name })
          User = await user.findOne(type)

        if(!User)
          throw new Error('user_not_found')

        User.pw_login = 'hidden'

        return [{ ok: true, message: 'success', user: [ User ] }]

      } catch (e) { return [{ ok: false, message: e.message, data: e.name }] }
    }),

    readUsers: isAuth.createResolver( async (root, { since = 0, limit = 10 }, { models: { user }, user_loged }) => {

      try {

        const User = await user.find().skip(since).limit(limit)

        if(!User)
          throw new Error('users_not_found')

        User.map(item => item.pw_login = 'hidden')

        return [{ ok: true, message: 'success', user: User }]

      } catch (e) { return [{ ok: false, message: e.message, data: e.name }] }
    }),
  },

  Mutation: {

    createUser: async (root, { input }, { models: { user } }) => {

      try {

        const { pw_login, role } = input

        const keys = [ 'name', 'email' ]

        let inputTrim = trimmer(input, keys)

        inputTrim.name = inputTrim.name.toUpperCase()
        inputTrim.email = inputTrim.email.toLowerCase()
        inputTrim.pw_login = bcrypt.hashSync(pw_login, 10)
        inputTrim.role = role
        inputTrim.status = true

        let newUser = new user(inputTrim)

        const User = await newUser.save()

        if(!User)
          throw new Error('user_not_found')

        User.pw_login = 'hidden'

        pubsub.publish('NEW_USER', { newUser })

        return [{ ok: true, message: 'success', user: [ User ] }]

      } catch (e) { return [{ ok: false, message: e.message, data: e.name }] }
    },

    updateUser: isAdmin.createResolver(async (root, { id, input }, { models: { user }, user_loged }) => {

      try {

        id = id.trim()

        let { pw_login, role, status } = input

        const keys = [ 'name', 'email', 'registration' ]

        let inputTrim = trimmer(input, keys)

        inputTrim.updatedAt = convertTime.dateNow(Date.now)

        if(inputTrim.name)
          inputTrim.name = inputTrim.name.toUpperCase()

        if(inputTrim.email)
          inputTrim.email = inputTrim.email.toLowerCase()
        
        if(pw_login)
          inputTrim.pw_login = bcrypt.hashSync(pw_login, 10)
        
        if(role)
          inputTrim.role = role
        
        if(status)
          inputTrim.status = status

        const User = await user.findByIdAndUpdate({ _id: id }, inputTrim, { new: true, runValidators: true, context: 'query' } )

        if(!User)
          throw new Error('user_not_found')

        User.pw_login = 'hidden'

        return [{ ok: true, message: 'success', user: [ User ] }]

      } catch (e) { return [{ ok: false, message: e.message, data: e.name }] }
    }),

    destroyUser: isAdmin.createResolver(async (root, { id }, { models: { user } }) => {

      try {

        id = id.trim()

        const User = await user.findByIdAndRemove({ _id: id })

        if(!User)
          throw new Error('user_not_found')

        User.pw_login = 'hidden'

        return [{ ok: true, message: 'success', user: [ User ] }]

      } catch (e) { return [{ ok: false, message: e.message, data: e.name }] }
    })
  }
}
