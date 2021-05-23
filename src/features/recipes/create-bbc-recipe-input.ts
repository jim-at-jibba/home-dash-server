import {Field, InputType} from "type-graphql"

@InputType()
class CreateBBCRecipeInput {
  @Field()
  url: string

  @Field()
  courseId: string

  @Field(() => [String])
  categoryIds: [string]

  @Field()
  recipeImage: string
}

export default CreateBBCRecipeInput
