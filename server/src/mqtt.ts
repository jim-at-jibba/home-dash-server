import mqtt from "mqtt"
import {logger} from "../src/utils/logger"

export function MQTT() {
  function init() {
    const client = mqtt.connect("mqtt://192.168.68.106", {clientId: "mqttjs01"})
    logger.info("connected flag  " + client.connected)
    // handle incoming messages
    client.on("message", function (topic, message, packet) {
      logger.info("message is " + message)
      logger.info("topic is " + topic)
    })

    client.on("connect", function () {
      logger.info("connected  " + client.connected)
    })
    // handle errors
    client.on("error", function (error) {
      logger.error("Can't connect" + error)
      process.exit(1)
    })

    client.subscribe("test", {qos: 1})

    return client
  }

  return {
    init,
  }
}
// publish
// function publish(topic, msg, options) {
//   console.log("publishing", msg)

//   if (client.connected == true) {
//     client.publish(topic, msg, options)
//   }
//   count += 1
//   if (count == 2) {
//     // ens script
//     clearTimeout(timer_id)
//   } // stop timer
//   client.end()
// }

/// ///////////

// const options = {
//   retain: true,
//   qos: 1,
// }
// const topic = "testtopic"
// const message = "test message"
// const topic_list = ["topic2", "topic3", "topic4"]
// const topic_o = {topic22: 0, topic33: 1, topic44: 1}
// console.log("subscribing to topics")
// client.subscribe(topic, {qos: 1}) // single topic
// client.subscribe(topic_list, {qos: 1}) // topic list
// client.subscribe(topic_o) // object
// const timer_id = setInterval(function () {
//   publish(topic, message, options)
// }, 5000)
// // notice this is printed even before we connect
console.log("end of script")
