import {Field, ID, ObjectType} from "type-graphql"

@ObjectType()
class RecipeSteps {
  @Field((type) => ID)
  id: string

  @Field()
  recipeId: string

  @Field({name: "stepNumber"})
  step_number: number

  @Field({name: "stepDescription"})
  step_description: string

  @Field({name: "createdAt"})
  created_at: Date

  @Field({name: "updatedAt"})
  updated_at: Date
}

export default RecipeSteps
