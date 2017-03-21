console.log('~~ Smart Smoke Detector ~~')
import config from './services/config'
const wifi = require('Wifi')
const http = require('http')
const TEMP = 2
const ALARM = 4
const dht = require('DHT11').connect(TEMP)
var connected = false
var mconfig = config().MQTT

// Update with the board serial and
mconfig.client_id = `${getSerial()}-${config().TYPE}-${config().LEVEL}`

// MQTT Connection
const Mqtt = require('MQTT').create(config().MQTTHOST, mconfig)

/**
 * Handles the connection for the wifi.connect call.
 */
var onConnect = function(err) {
  if(err) {
    connected = false
    console.log("An error has occured :( ", err.message)
  } else {
    connected = true
    console.log("Connected with IP : ", wifi.getIP().ip)
    Mqtt.connect()
  }
}

Mqtt.on('connected', function() {
  connected = true
  Mqtt.subscribe('makershed/sensors/#')

  // Get periodic readings
  setInterval(getTemp, 30000)
})

function cToF(temp) {
  return (temp * (9 / 5) + 32).toFixed(1)
}

function getTemp() {
  dht.read(function (a) {
    let cc = a.temp.toString()
    Mqtt.publish('makershed/sensors/temperature', `{\"f\":${cToF(cc)},\"c\":${cc},\"rh\":${a.rh.toString()}}`)
  })
}

// TODO: 
// Interrupt Upon Alarm Sound
setWatch((e) => {
  Mqtt.publish('makershed/sensors/alarm', `{\"type\":\"push\",\"priority\":5,\"title\":\"Smoke Alarm\",\"message\":\"Smoke is detected! Emergency!\"}`)
}, ALARM, { repeat: true, edge: "rising" })

function main() {
  console.log('Starting Wifi Connection')
  wifi.connect(config().SSID || '', {
    password: config().PASS || ''
  }, onConnect);
}
