// Configure SSD/PASS
export default function () {

  return {
    SSID: 'Mozilla Guest',
    PASS: '',
    TYPE: 'SENSOR',
    LEVEL: 4,

    // See: https://github.com/eclipse/ponte
    MQTTHOST: '192.168.1.0', // Your ponte server IP (probably your computer IP if hosting local)
    MQTT: { // all optional - the defaults are below
      // the client ID sent to MQTT
      // it's a good idea to define your own static one based on `getSerial()`
      // client_id : "random",
      keep_alive: 60, // keep alive time in seconds
      port: 1883, // port number
      // clean_session: true,
      // username: "", // default is undefined
      // password: "",  // default is undefined
      protocol_name: "MQTT", // or MQIsdp, etc..
      protocol_level: 4, // protocol level
    }
  }

}
