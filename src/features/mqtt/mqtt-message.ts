import {createUnionType} from "type-graphql"
import EnviroMessage from "./enviro-message"
import SwitchMessage from "./switch-message"
import TemperatureMessage from "./temp-message"

const MqttMessageUnion = createUnionType({
  name: "Mqtt",
  types: () => [EnviroMessage, SwitchMessage, TemperatureMessage] as const,
  resolveType: (value) => {
    if (value.topic === "enviro") {
      return EnviroMessage
    }
    if (value.topic === "switch") {
      return SwitchMessage
    }
    if (value.topic === "temperature") {
      return TemperatureMessage
    }
    return undefined
  },
})

export default MqttMessageUnion
