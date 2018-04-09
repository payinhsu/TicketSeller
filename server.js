const express = require('express')
const next = require('next')
const {NODE_ENV} = process.env
const config = require('./config')
const cors = require('cors')
const app = next({
  dev: config[NODE_ENV].NODE_ENV === 'production'
    ? false
    : true
})
const handle = app.getRequestHandler()
const {graphqlExpress, graphiqlExpress} = require('apollo-server-express')
const {makeExecutableSchema} = require('graphql-tools')
const typeDefs = require('./lib/graphql/typeDefs')
const resolvers = require('./lib/graphql/resolvers')

app.prepare().then(() => {
  const server = express()
  /* cross domain setting */
  server.use(cors({
    origin: config[NODE_ENV].CROSS_DOMAIN,
    credential: true,
  }))

  /* body parser */
  server.use(require('body-parser').json())

  /* graphql */
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  })
  const graphqlEndpoint = '/graphql'
  server.use(graphqlEndpoint, graphqlExpress((req, res) => {

    const authorizationHeader = req.headers['authorization']
      ? req.headers['authorization']
      : `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImNyZWF0ZWQiOjE1MTI0Mjk2MzU0NTAsImV4cCI6MTUxMzAzNDQzNX0.ckzT2dC8CnSs8OCDjxxbuDalR7hA7VsV5PPofh1Z731umyWcL86zqV76gqES913Y7yaFehG73rN5ISX2tbmN0w`

    req.headers['authorization'] = authorizationHeader
    return ({
      schema,
      context: {req, res}
    })
  }))
  server.use('/graphiql', graphiqlExpress({
    endpointURL: graphqlEndpoint,
  }))

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(process.env.PORT || 5000, (err) => { /* heroku can't using config[NODE_ENV].SERVER_PORT */
    if (err) throw err
    console.log(`> NODE_ENV: ${config[NODE_ENV].NODE_ENV}`)
    console.log(`> Server running on PORT: ${process.env.PORT}`)
    console.log(`> Server connecting to: ${config[NODE_ENV].API_HOST}`)
    console.log(`> Cross domain allow: ${config[NODE_ENV].CROSS_DOMAIN}`)

  })
}).catch((ex) => {
  console.error(`> Error stack: ${ex.stack}`)
  process.exit(1)
})
