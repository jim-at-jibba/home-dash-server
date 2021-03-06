import {Resolver, Mutation} from "type-graphql"
import ImageSignature from "./images"
import {CLOUDINARY_SECRET} from "../../config/config"
const cloudinary = require("cloudinary").v2

@Resolver()
export class ImageResolver {
  @Mutation((_returns) => ImageSignature)
  createImageSignature(): ImageSignature {
    const timestamp = Math.round(new Date().getTime() / 1000)
    const signature: string = cloudinary.utils.api_sign_request(
      {
        timestamp,
      },
      CLOUDINARY_SECRET,
    )
    return {timestamp, signature}
  }
}
