import {InputType, Field} from "type-graphql"

@InputType()
class FoodCategoryInput {
  @Field()
  name: string
}

export default FoodCategoryInput
