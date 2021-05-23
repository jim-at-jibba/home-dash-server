import {Field, InputType} from "type-graphql"

@InputType()
class CreateBBCRecipeInput {
  @Field()
  url: string

  @Field()
  courseId: string

  @Field()
  categoryId: string

  @Field()
  recipeImage: string
}

export default CreateBBCRecipeInput
