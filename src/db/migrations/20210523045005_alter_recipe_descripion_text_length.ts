import {Knex} from "knex"

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("recipes", (t) => {
    t.string("recipe_description", 1000).notNullable().alter()
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("recipes", (t) => {
    t.string("recipe_description").notNullable().alter()
  })
}
