import {Field, InputType} from "type-graphql"

@InputType()
class CreateRecipeUrlInput {
  @Field()
  url: string
}

export default CreateRecipeUrlInput
