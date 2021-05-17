import {Knex} from "knex"

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("food_categories", (t) => {
    t.uuid("id").unique().primary()
    t.string("food_category_name").notNullable()
    t.timestamps(false, true)
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.raw("DROP TABLE food_categories CASCADE")
}
