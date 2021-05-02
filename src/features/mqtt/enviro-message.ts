import {Field, ID, ObjectType} from "type-graphql"

@ObjectType()
class Enviro {
  @Field()
  temperature: number

  @Field()
  pressure: number

  @Field()
  humidity: number

  @Field({nullable: true})
  oxidised?: number

  @Field({nullable: true})
  reduced?: number

  @Field({nullable: true})
  nh3?: number

  @Field({nullable: true})
  lux?: number

  @Field({nullable: true})
  pm1?: number

  @Field({nullable: true})
  pm25?: number

  @Field({nullable: true})
  pm10?: number

  @Field({nullable: true})
  serial?: string
}

@ObjectType()
class EnviroMessage {
  @Field((type) => ID)
  id: string

  @Field()
  topic: string

  @Field()
  message: Enviro

  @Field({name: "createdAt"})
  created_at: Date

  @Field({name: "updatedAt"})
  updated_at: Date
}

export default EnviroMessage
