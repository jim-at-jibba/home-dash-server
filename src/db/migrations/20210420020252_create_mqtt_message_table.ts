import {Knex} from "knex"

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("messages", (t) => {
    t.uuid("id")
    t.string("topic").notNullable()
    t.jsonb("message").notNullable()
    t.timestamps(false, true)
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.raw("DROP TABLE users CASCADE")
}
