import {createUnionType} from "type-graphql"
import EnviroMessage from "./enviro-message"
import SwitchMessage from "./switch-message"
import TemperatureMessage from "./temp-message"

const MqttMessageUnion = createUnionType({
  name: "Mqtt",
  types: () => [EnviroMessage, SwitchMessage, TemperatureMessage] as const,
  resolveType: (value) => {
    if (value.topic.includes("enviro")) {
      return EnviroMessage
    }
    if (value.topic.includes("switch")) {
      return SwitchMessage
    }
    if (value.topic.includes("temperature")) {
      return TemperatureMessage
    }

    return undefined
  },
})

export default MqttMessageUnion
