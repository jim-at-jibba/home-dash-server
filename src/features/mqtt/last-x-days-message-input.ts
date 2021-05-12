import {Field, InputType} from "type-graphql"

@InputType()
class LastXDaysMessageInput {
  @Field()
  topic: string

  @Field()
  numberDays: number
}

export default LastXDaysMessageInput
