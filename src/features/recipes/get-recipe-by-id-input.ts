import {Field, InputType} from "type-graphql"

@InputType()
class GetRecipeByIdInput {
  @Field()
  id: string
}

export default GetRecipeByIdInput