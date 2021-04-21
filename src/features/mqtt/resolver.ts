import {Arg, Ctx, Query, Resolver} from "type-graphql"
import {MyContext} from "../../types/my-context"
import LatestMessageInput from "./latest-message-input"
import MqttMessage from "./mqtt-message"

@Resolver()
class MqttResolver {
  @Query(() => MqttMessage)
  async getLatestMessage(@Arg("input") input: LatestMessageInput, @Ctx() ctx: MyContext) {
    const {db} = ctx
    const latest = await db("messages").first("*").where("topic", "=", input.topic).orderBy("created_at", "desc")

    const result = {
      ...latest,
      message: JSON.parse(latest.message),
    }
    console.log("latest", result)
    return result
  }
}

export default MqttResolver
