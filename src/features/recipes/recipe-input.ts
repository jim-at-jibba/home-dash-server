import {Field, InputType} from "type-graphql"

@InputType()
class IngredientsInput {
  @Field()
  ingredient: string
}

@InputType()
class StepsInput {
  @Field()
  stepNumber: number

  @Field()
  stepDescription: string
}

@InputType()
class RecipeInput {
  @Field()
  name: string

  @Field()
  courseId: string

  @Field(() => [String])
  categoryIds: [string]

  @Field()
  description: string

  @Field(() => [IngredientsInput])
  ingredients: [IngredientsInput]

  @Field(() => [StepsInput])
  steps: [StepsInput]

  @Field()
  recipeImage: string

  @Field()
  cookTime: number

  @Field()
  prepTime: number

  @Field()
  serves: number
}

export default RecipeInput
