import {Knex} from "knex"

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("recipes", (t) => {
    t.string("recipe_notes", 10000).nullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("recipes", (t) => {
    t.string("recipe_notes").nullable()
  })
}
