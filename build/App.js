"use strict";
exports.__esModule = true;
var http = require("http");
var express = require("express");
var Constants = require("./util/Constants");
var tmi = require("tmi.js");
var InputHandler_1 = require("./input/InputHandler");
var app = express();
app.use(function (req, res) {
    res.send({ msg: "hello" });
});
var server = http.createServer(app);
//const connectionHandler = new ConnectionHandler()
//const wss = new WebSocket.Server({ server });
//wss.on('connection', connectionHandler.newClient);
var client = new tmi.client({
    options: {
        debug: true
    },
    connection: {
        reconnect: true
    },
    channels: [Constants.CHAT_CHANNEL]
});
client.connect();
var inputHandler = new InputHandler_1.InputHandler(Constants.SCREEN_CLIENT_POSITION.right1050, Constants.BLOCKED_CLIENT_REGIONS);
client.on("chat", function (channel, userstate, message, self) {
    return inputHandler.onMessage(channel, userstate, message, self);
});
server.listen(8080, function listening() {
    console.log('Listening on %d', server.address().port);
});
