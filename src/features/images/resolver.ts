import {Resolver, Mutation} from "type-graphql"
import ImageSignature from "./images"
const cloudinary = require("cloudinary").v2

@Resolver()
export class ImageResolver {
  @Mutation((_returns) => ImageSignature)
  createImageSignature(): ImageSignature {
    console.log("process.env.CLOUDINARY_SECRET", process.env.CLOUDINARY_SECRET)

    const timestamp = Math.round(new Date().getTime() / 1000)
    const signature: string = cloudinary.utils.api_sign_request(
      {
        timestamp,
      },
      process.env.CLOUDINARY_SECRET,
    )
    return {timestamp, signature}
  }
}
