import {Field, ObjectType} from "type-graphql"

@ObjectType()
export class AirQuality {
  @Field()
  pm1: number

  @Field()
  pm25: number

  @Field()
  pm10: number
}

@ObjectType()
class LatestAirQualityOutput {
  @Field()
  topic: string

  @Field()
  message: AirQuality
}

export default LatestAirQualityOutput
