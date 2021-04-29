import {Field, ID, ObjectType} from "type-graphql"

@ObjectType()
class Temperature {
  @Field()
  temperature: number

  @Field()
  humidity: number
}

@ObjectType()
class TemperatureMessage {
  @Field((type) => ID)
  id: string

  @Field()
  topic: string

  @Field()
  message: Temperature

  @Field({name: "createdAt"})
  created_at: Date

  @Field({name: "updatedAt"})
  updated_at: Date
}

export default TemperatureMessage
