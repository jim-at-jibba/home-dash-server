import {Arg, Ctx, Mutation, Query, Resolver} from "type-graphql"
import {MyContext} from "../../types/my-context"
import AuthResponse from "./auth-response"
import RegisterInput from "./register-input"
// import argon2 from "argon2"
import {generateToken} from "../../utils/auth"
import {v4 as uuidv4} from "uuid"

@Resolver()
class AuthResolver {
  @Query(() => String)
  async me(@Ctx() ctx: MyContext) {
    return "Hello"
  }

  @Mutation(() => AuthResponse)
  async register(@Arg("input") input: RegisterInput, @Ctx() ctx: MyContext) {
    const {db} = ctx

    // const hash = await argon2.hash(input.password)

    const {displayName, ...rest} = input
    const [user] = await db("users")
      .insert({...rest, id: uuidv4(), display_name: displayName, password: hash})
      .returning("*")

    const token = generateToken(user)
    return {token, user}
  }
}

export default AuthResolver
