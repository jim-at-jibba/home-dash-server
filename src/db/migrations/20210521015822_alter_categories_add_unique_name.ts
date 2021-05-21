import {Knex} from "knex"

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("food_categories", (t) => {
    t.string("food_category_name").notNullable().unique().alter()
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.raw("ALTER TABLE food_category_name DROP CONSTRAINT food_categories_food_category_name_unique")
}
