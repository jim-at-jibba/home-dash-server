import {Field, ObjectType} from "type-graphql"
import User from "../users/user"

@ObjectType()
class AuthResponse {
  @Field()
  token: string

  @Field(() => User)
  user: User
}

export default AuthResponse
