import { ApolloServer, AuthenticationRequiredError, ForbiddenError } from 'apollo-server-express'
import { PubSub } from 'graphql-subscriptions'
import { schema } from '../graphql'
import { processUpload } from '../utils/upload'
import models from '../models'

export const pubsub = new PubSub()

export const server = new ApolloServer({

  schema,

  context({ req }) {
    console.log('apollo<<req<<', req.user, req.role)

    return {
      models,
      user_loged: { user_loged_id: req.user_loged, role: req.role, name: req.name },
      utils: { processUpload }
    }
  },

  playground: {
    endpoint: '/graphql',
    settings: { 'editor.theme': 'dark' },
    subscriptionEndpoint: 'ws://localhost:4000/subscriptions'
  },

  engine: {
    rewriteError(e) {

      if (e instanceof AuthenticationRequiredError) {
        return e.message
      }

      if (e instanceof ForbiddenError) {
        return e.message
      }

      return e
    }
  }
})
