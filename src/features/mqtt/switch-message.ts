import {Field, ID, ObjectType} from "type-graphql"

@ObjectType()
class Switch {
  @Field()
  state: boolean
}

@ObjectType()
class SwitchMessage {
  @Field((type) => ID)
  id: string

  @Field()
  topic: string

  @Field()
  message: Switch

  @Field({name: "createdAt"})
  created_at: Date

  @Field({name: "updatedAt"})
  updated_at: Date
}

export default SwitchMessage
