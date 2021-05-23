import {Knex} from "knex"

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("recipes", (t) => {
    t.string("recipe_url", 1000).defaultTo("NULL")
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("recipes", (t) => {
    t.dropColumn("recipe_url")
  })
}
