import {InputType, Field} from "type-graphql"

@InputType()
class FoodCategoryInput {
  @Field(() => String)
  name: string
}

export default FoodCategoryInput
