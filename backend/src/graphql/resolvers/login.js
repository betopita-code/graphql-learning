import bcrypt from 'bcrypt'
import { getToken } from '../../config/middleware/auth'

export default {

  Mutation: {

    async login(root, { email, pw_login }, { models: { user } }) {

      try {

        let User = await user.findOne({ email }, 'name pw_login role')

        if (User && bcrypt.compareSync(pw_login, User.pw_login))
          return { ok: true, message: 'Authenticated', token: getToken({ user_loged: User.id, role: User.role, name: User.name }) }

        return { ok: false, message: 'Incorrect email or pw_login' }

      } catch (e) { return { ok: false, message: e.message, data: e.name } }
    }
  }
}
