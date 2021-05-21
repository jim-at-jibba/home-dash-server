import {InputType, Field} from "type-graphql"

@InputType()
class FoodCourseInput {
  @Field()
  name: string
}

export default FoodCourseInput
