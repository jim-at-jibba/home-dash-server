import "reflect-metadata"
import {ApolloServer} from "apollo-server"
import {buildSchema} from "type-graphql"
import db from "./db/connection"
import MqttResolver from "./features/mqtt/resolver"
import RecipesResolver from "./features/recipes/resolver"
import {ImageResolver} from "./features/images/resolver"

const createServer = async () => {
  return new ApolloServer({
    schema: await buildSchema({
      resolvers: [MqttResolver, RecipesResolver, ImageResolver],
    }),
    playground: true,
    introspection: true,
    context: ({req, res}) => {
      return {
        req,
        res,
        db,
      }
    },
  })
}

export default createServer
