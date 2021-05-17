import {Knex} from "knex"

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("recipe_steps", (t) => {
    t.uuid("id").unique().primary()
    t.uuid("recipe_id").notNullable()
    t.integer("step_number").notNullable()
    t.string("step_description").notNullable()
    t.timestamps(false, true)

    t.unique(["recipe_id"])

    t.foreign("recipe_id").references("id").inTable("recipes")
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.raw("DROP TABLE recipe_steps CASCADE")
}
