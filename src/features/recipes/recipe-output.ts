import {Field, ObjectType} from "type-graphql"

@ObjectType()
class CreateRecipeOutput {
  @Field()
  id: string
}

export default CreateRecipeOutput
