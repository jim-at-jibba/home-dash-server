import {Arg, Ctx, Query, Resolver} from "type-graphql"
import {MyContext} from "../../types/my-context"
import LatestAirQualityOutput from "./air-quality-output"
import EnviroMessage from "./enviro-message"
import LatestMessageInput from "./latest-message-input"
import MqttMessageUnion from "./mqtt-message"

@Resolver()
class MqttResolver {
  @Query((returns) => MqttMessageUnion)
  async getLatestMessage(
    @Arg("input") input: LatestMessageInput,
    @Ctx() ctx: MyContext,
  ): Promise<typeof MqttMessageUnion> {
    const {db} = ctx
    const latest = await db("messages").first("*").where("topic", "=", input.topic).orderBy("created_at", "desc")

    const result = {
      ...latest,
      message: JSON.parse(latest.message),
    }
    console.log("latest", result)
    return result
  }

  @Query((returns) => LatestAirQualityOutput)
  async getLatestAirQuality(
    @Arg("input") input: LatestMessageInput,
    @Ctx() ctx: MyContext,
  ): Promise<LatestAirQualityOutput> {
    const {db} = ctx
    const latest = await db("messages")
      .select("message")
      .where("topic", "=", input.topic)
      .andWhere(db.raw("created_at::date = current_date - 1"))

    const avg = Array.from(
      latest
        .map((item) => {
          const i = JSON.parse(item.message)
          return {
            pm1: i.pm1,
            pm25: i.pm25,
            pm10: i.pm10,
          }
        })
        .reduce(
          (acc, obj: Record<string, number>) =>
            Object.keys(obj).reduce(
              (acc, key) => (typeof obj[key] === "number" ? acc.set(key, (acc.get(key) || []).concat(obj[key])) : acc),
              acc,
            ),
          new Map(),
        ),
      ([name, values]): {name: string; average: number} => ({
        name,
        average: values.reduce((a: number, b: number) => a + b) / values.length,
      }),
    )
    // avg.reduce((acc, cur) => ({...acc, [cur.name]: cur.average}), {}),
    const result = {
      topic: input.topic,
      message: {
        pm1: avg[0].average,
        pm25: avg[1].average,
        pm10: avg[2].average,
      },
    }

    return result
  }
}

export default MqttResolver
