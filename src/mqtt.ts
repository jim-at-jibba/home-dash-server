import {Knex} from "knex"
import mqtt from "mqtt"
import {logger} from "../src/utils/logger"
import {v4 as uuidv4} from "uuid"

export function MQTT(db: Knex) {
  function init() {
    const client = mqtt.connect("mqtt://192.168.68.106", {clientId: "mqttjs01"})
    // handle incoming messages
    client.on("message", async function (topic, message, packet) {
      const x = JSON.parse(message.toString())
      logger.info("topic is " + topic)

      const latest = await db("messages")
        .first("id", "message")
        .where("topic", "=", topic)
        .orderBy("created_at", "desc")

      if (latest != null) {
        if (topic === "enviro") {
          const l = JSON.parse(latest.message)
          if (l.temperature !== x.temperature || l.humidity !== x.humidity) {
            const id = await db("messages")
              .insert({id: uuidv4(), topic, message: JSON.stringify(message.toString())})
              .returning("id")

            logger.info(`Added new message to the DB with ID: ${id}`)
          }
        }
      } else {
        const id = await db("messages")
          .insert({id: uuidv4(), topic, message: JSON.stringify(message.toString())})
          .returning("id")

        logger.info(`Added new message to the DB with ID: ${id}`)
      }
    })

    client.on("connect", function () {
      logger.info("connected  " + client.connected)
    })
    // handle errors
    client.on("error", function (error) {
      logger.error("Can't connect" + error)
      process.exit(1)
    })

    client.subscribe("enviro", {qos: 1})

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
