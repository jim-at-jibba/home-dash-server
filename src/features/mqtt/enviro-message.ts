import {Field, ObjectType} from "type-graphql"

@ObjectType()
class EnviroMessage {
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
  serial?: string
}

export default EnviroMessage
