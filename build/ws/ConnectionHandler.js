"use strict";
exports.__esModule = true;
var url = require("url");
var ConnectionHandler = /** @class */ (function () {
    function ConnectionHandler() {
    }
    ConnectionHandler.prototype.newClient = function (ws, req) {
        // You might use location.query.access_token to authenticate or share sessions
        // or req.headers.cookie (see http://stackoverflow.com/a/16395220/151312)
        var location = url.parse(req.url, true);
        ws.on('message', this.handleMessage);
        ws.send('Connected');
    };
    ConnectionHandler.prototype.handleMessage = function (message) {
        console.log(message);
    };
    return ConnectionHandler;
}());
exports["default"] = ConnectionHandler;
