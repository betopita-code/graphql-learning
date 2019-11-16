import express from 'express'
import mongo from 'mongoose'
import { checkToken } from './middleware/auth'
import { server } from './apollo'
import { execute, subscribe } from 'graphql'
import { createServer } from 'http'
import { SubscriptionServer } from 'subscriptions-transport-ws'
import { schema } from '../graphql'
import 'dotenv/config'

const app = express()

app.use(checkToken) // Middleware for validate tokens
server.applyMiddleware({ app, path: '/graphql' })

// Create webSocketServer
const ws = createServer(app)

// Configure params for mongoConnection
const options = { 
  autoReconnect:true,
  
  poolSize: 20,
  socketTimeoutMS: 480000,
  keepAlive: true,

  keepAliveInitialDelay : 300000,
  connectTimeoutMS: 30000,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 1000,

  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
}
mongo.connect(process.env.URI, options).then(() => {

  // If connected, then start server

  ws.listen(process.env.PORT, () => {
    console.log('Server on port', process.env.PORT)
    console.log('Mongo on port: ', process.env.DB_PORT)
  
    // Set up the WebSocket for handling GraphQL subscriptions
    new SubscriptionServer({
      execute,
      subscribe,
      schema
    }, {
      server: ws,
      path: '/subscriptions',
    })
  })

}).catch(err => {
  console.log(err)
})