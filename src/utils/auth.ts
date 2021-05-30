import User from "../features/users/user"
import jwt from "jsonwebtoken"
import {JWT_SECRET} from "../config/config"

console.log("WHAT", JWT_SECRET)
export const generateToken = (user: User) => {
  const token = jwt.sign(
    {
      data: {
        id: user.id,
        username: user.username,
        displayName: user.display_name,
      },
    },
    JWT_SECRET as string,
    {expiresIn: "7d"},
  )

  return token
}
