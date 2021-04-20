import "reflect-metadata"
import express, {NextFunction, Request, Response} from "express"
import "express-async-errors"
import {logger} from "./utils/logger"
import {MQTT} from "./mqtt"

import {getRoutes} from "./routes"
import {ApolloServer} from "apollo-server-express"
import {createSchema} from "./utils/createSchema"

const startServer = async ({port = process.env.PORT} = {}) => {
  const gqlServer = new ApolloServer({
    schema: await createSchema(),
    context: ({req, res}) => ({
      req,
      res,
    }),
  })
  await gqlServer.start()

  const app = express()
  gqlServer.applyMiddleware({app})

  app.use("/api", getRoutes())

  app.use(errorMiddleware)

  MQTT().init()

  return new Promise((resolve) => {
    const server = app.listen(process.env.PORT || 4000, () => {
      // @ts-ignore
      logger.info(`Listening on port ${server.address().port}`)
      logger.info(`🚀 Server ready at http://localhost:4000${gqlServer.graphqlPath}`)
      const originalClose = server.close.bind(server)
      // @ts-ignore
      server.close = () => {
        return new Promise((resolve) => {
          originalClose(resolve)
        })
      }

      // setupCloseOnExit(server)

      resolve(server)
    })
  })
}

function errorMiddleware(error: Error, req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) {
    next(error)
  } else {
    logger.error(error)
    res.status(500)
    res.json({
      message: error.message,
      // we only add a `stack` property in non-production environments
      ...(process.env.NODE_ENV === "production" ? null : {stack: error.stack}),
    })
  }
}

// function setupCloseOnExit(server) {
//   async function exitHandler(options = {}) {
//     await server
//       .close()
//       .then(() => {
//         logger.info("Server successfully closed")
//       })
//       .catch((e) => {
//         logger.warn("Something went wrong closing the server", e.stack)
//       })
//     if (options.exit) process.exit()
//   }
//   // do something when app is closing
//   process.on("exit", exitHandler)
//   // catches ctrl+c event
//   process.on("SIGINT", exitHandler.bind(null, {exit: true}))
//   // catches "kill pid" (for example: nodemon restart)
//   process.on("SIGUSR1", exitHandler.bind(null, {exit: true}))
//   process.on("SIGUSR2", exitHandler.bind(null, {exit: true}))
//   // catches uncaught exceptions
//   process.on("uncaughtException", exitHandler.bind(null, {exit: true}))
// }
export {startServer}
