import {Field, ID, ObjectType} from "type-graphql"
import RecipeIngredients from "./recipe-ingredients"
import RecipeSteps from "./recipe-steps"

@ObjectType()
class RecipeFull {
  @Field((type) => ID)
  id: string

  @Field({name: "name"})
  recipe_name: string

  @Field({name: "course"})
  food_course_name: string

  @Field(() => [String], {name: "categories"})
  food_category_names: [string]

  @Field({name: "description"})
  recipe_description: string

  @Field(() => [RecipeIngredients])
  ingredients: [RecipeIngredients]

  @Field(() => [RecipeSteps])
  steps: [RecipeSteps]

  @Field({name: "image"})
  recipe_image?: string

  @Field({name: "cookTime"})
  cook_time: number

  @Field({name: "prepTime"})
  prep_time: number

  @Field()
  serves: number

  @Field({name: "recipeUrl", nullable: true})
  recipe_url: string

  @Field({name: "createdAt"})
  created_at: Date

  @Field({name: "updatedAt"})
  updated_at: Date
}

export default RecipeFull
