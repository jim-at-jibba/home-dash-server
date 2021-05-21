import {Knex} from "knex"

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("food_courses", (t) => {
    t.string("food_course_name").notNullable().unique().alter()
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.raw("ALTER TABLE food_course_name DROP CONSTRAINT food_categories_food_course_name_unique")
}
