"use strict";
exports.__esModule = true;
var Action = /** @class */ (function () {
    function Action(user) {
        this.executed = false;
        this.user = user;
    }
    Action.prototype.isValid = function () {
        console.log('Default isvalid called!');
        return true;
    };
    Action.prototype.execute = function () { };
    Action.prototype.toString = function () {
        return this.user + ": input";
    };
    return Action;
}());
exports.Action = Action;
