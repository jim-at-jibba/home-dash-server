import {Field, InputType} from "type-graphql"

@InputType()
class LatestMessageInput {
  @Field()
  topic: string
}

export default LatestMessageInput
