import {IsEmail, Matches, MinLength} from "class-validator"
import {Field, InputType} from "type-graphql"

@InputType()
class RegisterInput {
  @Field()
  @Matches(/^[a-zA-Z0-9_]{2,30}$/, {
    message: "The username should only contain alphanumeric characters",
  })
  username: string

  @Field()
  @MinLength(2)
  displayName: string

  @Field()
  @IsEmail()
  email: string

  @Field()
  @MinLength(8)
  password: string
}

export default RegisterInput
