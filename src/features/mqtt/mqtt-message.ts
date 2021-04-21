import {Field, ID, ObjectType} from "type-graphql"
import EnviroMessage from "./enviro-message"

@ObjectType()
class MqttMessage {
  @Field((type) => ID)
  id: string

  @Field()
  topic: string

  @Field()
  message: EnviroMessage

  @Field({name: "createdAt"})
  created_at: Date

  @Field({name: "updatedAt"})
  updated_at: Date
}

export default MqttMessage
