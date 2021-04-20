import {Request, Response} from "express"
import {Knex} from "knex"

export type MyContext = {
  req: Request
  res: Response
  db: Knex
}
