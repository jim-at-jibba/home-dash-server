import {Knex} from "knex"

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("recipes", (t) => {
    t.uuid("id").unique().primary()
    t.uuid("food_course_id").notNullable()
    t.uuid("food_category_id").notNullable()
    t.string("recipe_name").notNullable()
    t.string("recipe_description").notNullable()
    t.string("recipe_image")
    t.integer("prep_time").notNullable()
    t.integer("cook_time").notNullable()
    t.integer("serves").notNullable()
    t.timestamps(false, true)

    t.foreign("food_course_id").references("id").inTable("food_courses")
    t.foreign("food_category_id").references("id").inTable("food_categories")
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.raw("DROP TABLE recipes CASCADE")
}
