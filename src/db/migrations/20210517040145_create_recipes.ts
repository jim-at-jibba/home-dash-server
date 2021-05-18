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

    t.unique(["food_course_id", "food_category_id"])

    t.foreign("food_course_id").references("id").inTable("food_courses")
    t.foreign("food_category_id").references("id").inTable("food_categories")
  })
}

/**
 *
    t.increments('id')
    t.integer('user_id').unsigned().notNullable()
    t.integer('tweet_id').unsigned().notNullable()

    t.unique(['user_id', 'tweet_id'])

    t.foreign('user_id').references('id').inTable('users').onDelete('CASCADE')
    t.foreign('tweet_id').references('id').inTable('tweets').onDelete('CASCADE')
 */
export async function down(knex: Knex): Promise<void> {
  return knex.raw("DROP TABLE recipes CASCADE")
}