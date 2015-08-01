//
// Main app file that runs setup code and starts the server process.
// This code should be kept to a minimum. Any setup code that gets large should
// be abstracted into modules under /lib.
//

let NODE_ENV = require("./config").NODE_ENV;
let PORT = require("./config").PORT;

let express = require("express");
let setup = require("./lib/setup");

let app = module.exports = express();
setup(app);

//Start the server and send a message to IPC for the integration test helper to hook into.
app.listen(PORT, function() {
  console.log("Listening on port " + PORT);

  // TODO: checkout one line if
  if (process.send) {
    process.send("listening");
  }
});
