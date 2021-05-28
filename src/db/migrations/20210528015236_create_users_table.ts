import {Knex} from "knex"

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("users", (t) => {
    t.uuid("id")
    t.string("username").notNullable().unique()
    t.string("email").notNullable().unique()
    t.string("password").notNullable()
    t.string("display_name").notNullable()
    t.string("avatar")

    t.timestamps(false, true)
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.raw("DROP TABLE users CASCADE")
}
