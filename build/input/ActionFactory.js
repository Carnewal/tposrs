"use strict";
exports.__esModule = true;
var MouseMoveClick_1 = require("./types/MouseMoveClick");
var Tap_1 = require("./types/Tap");
var ActionFactory = /** @class */ (function () {
    function ActionFactory(screenClientPosition, blockedClientRegions) {
        var _this = this;
        this.actionCreators = {
            'click': function (user, args) { return new MouseMoveClick_1.MouseMoveClick(user, {
                x: parseInt(args[1]),
                y: parseInt(args[2]),
                screenClientPosition: _this.screenClientPosition,
                blockedClientRegions: _this.blockedClientRegions,
                button: 'left'
            }); },
            'rclick': function (user, args) { return new MouseMoveClick_1.MouseMoveClick(user, {
                x: parseInt(args[1]),
                y: parseInt(args[2]),
                screenClientPosition: _this.screenClientPosition,
                blockedClientRegions: _this.blockedClientRegions,
                button: 'right'
            }); },
            'tap': function (user, args) { return new Tap_1.Tap(user, {
                key: args[1]
            }); }
        };
        this.screenClientPosition = screenClientPosition;
        this.blockedClientRegions = blockedClientRegions;
    }
    ActionFactory.prototype.create = function (username, message) {
        var args = message.split(' ');
        if (args.length <= 1 || args.length > 5) {
            return null;
        }
        var type = args[0];
        var actionCreator = this.actionCreators[type];
        if (actionCreator) {
            return actionCreator(username, args);
        }
        return null;
    };
    return ActionFactory;
}());
exports.ActionFactory = ActionFactory;
