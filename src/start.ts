import "reflect-metadata"
import {MQTT} from "./mqtt"
import db from "./db/connection"
import createServer from "./server"
require("dotenv").config()

const startServer = async ({port = process.env.PORT} = {}) => {
  db.migrate.latest({loadExtensions: [".js", ".ts"]})
  const server = await createServer()

  server.listen().then(({port}) => {
    console.log(`🚀 Listening on port http://localhost:${port}/graphql`)
  })

  MQTT(db).init()
}

export {startServer}
