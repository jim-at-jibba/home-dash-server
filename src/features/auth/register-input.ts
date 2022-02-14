import {IsEmail, Matches, MinLength} from "class-validator"
import {Field, InputType} from "type-graphql"
import {Unique} from "../../validators/Unique"

@InputType()
class RegisterInput {
  @Field()
  @Matches(/^[a-zA-Z0-9_]{2,30}$/, {
    message: "The username should only contain alphanumeric characters",
  })
  @Unique("users", {message: "This username is already taken"})
  username: string

  @Field()
  @MinLength(2)
  displayName: string

  @Field()
  @IsEmail()
  @Unique("users", {message: "This email is already taken"})
  email: string

  @Field()
  @MinLength(8)
  password: string
}

export default RegisterInput
