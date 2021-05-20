import {Field, ID, ObjectType} from "type-graphql"

@ObjectType()
class RecipeDetails {
  @Field((type) => ID)
  id: string

  @Field({name: "name"})
  recipe_name: string

  @Field({name: "course"})
  food_course_name: string

  @Field({name: "category"})
  food_category_name: string

  @Field({name: "description"})
  recipe_description: string

  @Field({name: "image"})
  recipe_image?: string

  @Field({name: "cookTime"})
  cook_time: number

  @Field({name: "prepTime"})
  prep_time: number

  @Field()
  serves: number

  @Field({name: "createdAt"})
  created_at: Date

  @Field({name: "updatedAt"})
  updated_at: Date
}

export default RecipeDetails
