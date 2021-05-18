import {Knex} from "knex"

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("recipe_ingredients", (t) => {
    t.uuid("id").unique().primary()
    t.uuid("recipe_id").notNullable()
    t.string("ingredient").notNullable()
    t.timestamps(false, true)

    t.foreign("recipe_id").references("id").inTable("recipes")
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.raw("DROP TABLE recipe_ingredients CASCADE")
}
