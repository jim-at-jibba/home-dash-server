import {Field, ID, ObjectType} from "type-graphql"
import RecipeIngredients from "./recipe-ingredients"
import RecipeSteps from "./recipe-steps"

@ObjectType()
class Recipes {
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

  @Field(() => [RecipeIngredients])
  ingredients: [RecipeIngredients]

  @Field(() => [RecipeSteps])
  steps: [RecipeSteps]

  @Field({name: "image", nullable: true})
  recipe_image: string

  @Field({name: "cookTime"})
  cook_time: number

  @Field({name: "prepTime"})
  prep_time: number

  @Field()
  serves: number
}

export default Recipes
