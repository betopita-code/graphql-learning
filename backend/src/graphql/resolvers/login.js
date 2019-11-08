import bcrypt from 'bcrypt'
import { getToken } from '../../config/middleware/auth'

export default {
  Mutation: {
    async login(root, { email, pw_login }, { models: { user } }) {
      try {
        let User = await user.findOne({ email }, 'name pw_login role')

        if (User && bcrypt.compareSync(pw_login, User.pw_login)) {
          return {
            ok: true,
            message: 'Authenticated',
            token: getToken({ user: User.id, role: User.role })
          }

        } else return {
          ok: false,
          message: 'Incorrect email or pw_login'
        }

      } catch (err) {
        return {
          ok: false,
          message: err.message
        }
      }
    }
  }
}