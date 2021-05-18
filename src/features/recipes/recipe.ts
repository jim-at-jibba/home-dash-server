import {Field, ID, ObjectType} from "type-graphql"
import RecipeIngredients from "./recipe-ingredients"
import RecipeSteps from "./recipe-steps"

@ObjectType()
class Recipes {
  @Field((type) => ID)
  id: string

  @Field()
  name: string

  @Field()
  course: string

  @Field()
  category: string

  @Field()
  description: string

  @Field(() => [RecipeIngredients])
  ingredients: [RecipeIngredients]

  @Field(() => [RecipeSteps])
  steps: [RecipeSteps]

  @Field({nullable: true})
  image: string

  @Field()
  cookTime: number

  @Field()
  prepTime: number

  @Field()
  serves: number
}

export default Recipes
