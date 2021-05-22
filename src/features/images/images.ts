import {ObjectType, Field, Int} from "type-graphql"

@ObjectType()
class ImageSignature {
  @Field((_type) => String)
  signature!: string

  @Field((_type) => Int)
  timestamp!: number
}

export default ImageSignature
