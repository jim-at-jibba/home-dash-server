import path from "path"
import {buildSchema} from "type-graphql"

export const createSchema = () =>
  buildSchema({
    resolvers: [path.join(__dirname, "/../features/**/resolver.ts")],
  })
