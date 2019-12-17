import { createError } from 'apollo-errors'
import { baseResolver } from './baseResolver'

export const ForbiddenError = createError('ForbiddenError', { message: 'Role error' })

export const AuthenticationRequiredError = createError('AuthenticationRequiredError', { message: 'Authentication error' })

export const isAuth = baseResolver.createResolver( async (root, args, { models: { user }, user_loged: { user_loged_id } }, info) => {

  try {

    if (!user_loged_id) throw new AuthenticationRequiredError()

    if(!await user.findOne({ _id: user_loged_id })) throw new AuthenticationRequiredError()

  } catch (e) { return [{ ok: false, message: e.message, data: e.name }] }
})

export const isAdmin = isAuth.createResolver( (root, args, { user_loged: { role } }, info) => {

  try {

    if (role !== 'ADMIN') throw new ForbiddenError()

  } catch (e) { return [{ ok: false, message: e.message, data: e.name }] }
})
