var ponte = require("ponte");
var opts = require('./config.js');
var server = ponte(opts);

server.on("updated", function(resource, buffer) {
  console.log("Resource Updated---", resource, JSON.parse(buffer.toString()));
});

// Stop the server after 1 minute
// setTimeout(function() {
//   server.close(function() {
//     console.log("server stopped");
//   });
// }, 60 * 1000);
