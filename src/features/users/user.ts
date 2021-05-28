import {Field, ID, ObjectType} from "type-graphql"

@ObjectType()
class User {
  @Field((type) => ID)
  id: string

  @Field()
  username: string

  @Field()
  email: string

  password: string

  @Field({name: "createdAt"})
  created_at: Date

  @Field({name: "updatedAt"})
  updated_at: Date
}

export default User
