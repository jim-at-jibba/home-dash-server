import * as dotenv from "dotenv"
import path from "path"

const envPath = path.join(__dirname, `../../.env`)

dotenv.config({path: envPath})

export const JWT_SECRET = process.env.JWT_SECRET
export const CLOUDINARY_SECRET = process.env.CLOUDINARY_SECRET
