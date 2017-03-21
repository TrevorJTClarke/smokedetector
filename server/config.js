module.exports = {
  persistence: {
    // same as http://mcollina.github.io/mosca/docs/lib/persistence/mongo.js.html
    type: "mongo",
    url: "mongodb://localhost:27017/test"//27017
  },
  broker: {
    // same as https://github.com/mcollina/ascoltatori#mongodb
    type: 'mongo',
    url: 'mongodb://localhost:27017/test', //
    pubsubCollection: 'testing',
    mongo: {} // mongo specific options
  },
  logger: {
    level: 30, // or 20 or 40
    name: "MongoThingsSDK"
  }
};
