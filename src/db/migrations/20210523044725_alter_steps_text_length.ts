import {Knex} from "knex"

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("recipe_steps", (t) => {
    t.string("step_description", 1000).notNullable().alter()
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("recipe_steps", (t) => {
    t.string("step_description").notNullable().alter()
  })
}
