import "reflect-metadata"
import {MQTT} from "./mqtt"
import db from "./db/connection"
import createServer from "./server"

const startServer = async ({port = process.env.PORT} = {}) => {
  const server = await createServer()

  server.listen().then(({port}) => {
    console.log(`🚀 Listening on port http://localhost:${port}/graphql`)
  })

  MQTT(db).init()
}

export {startServer}
