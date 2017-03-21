var client = new Paho.MQTT.Client("localhost", 3000, "WebAppDashboard");
var connection = document.getElementById('connection');

client.connect({
  onSuccess: function() {
    console.log("connected");
    connection = document.getElementById('connection');
    connection.textContent = 'online';
    client.subscribe("makershed/sensors/#");
  },
  onFailure: function(err) {
    connection = document.getElementById('connection');
    connection.textContent = 'offline';
    console.log(err);
  }
});

client.onMessageArrived = function(message) {
  console.log('message:', message);
  var tF = document.getElementById("tempFarenheit");
  var tC = document.getElementById("tempCelsius");
  var rH = document.getElementById("relHum");
  var data = JSON.parse(message.payloadString);
  connection = document.getElementById('connection');
  connection.textContent = 'online';

  tF.textContent = '' + data.f;
  tC.textContent = '' + data.c;
  rH.textContent = '' + data.rh;
};

client.onConnectionLost = function (responseObject) {
  if (responseObject.errorCode !== 0) {
    connection.textContent = 'offline';
    console.log("onConnectionLost:" + responseObject.errorMessage);
  }
}
