"use strict";
exports.__esModule = true;
var timers_1 = require("timers");
var ActionFactory_1 = require("./ActionFactory");
var Constants = require("../util/Constants");
var InputHandler = /** @class */ (function () {
    function InputHandler(screenClientPosition, blockedClientRegions) {
        this.executedActions = [];
        this.actionQueue = [];
        this.lastExecution = Date.now();
        this.strategy = 'ALL';
        this.actionFactory = new ActionFactory_1.ActionFactory(screenClientPosition, blockedClientRegions);
        this.tick();
    }
    InputHandler.prototype.onMessage = function (channel, userstate, message, self) {
        if (self) {
            return;
        }
        var input = this.actionFactory.create(userstate.username, message);
        if (input) {
            console.log('Pushing ', input.toString());
            this.actionQueue.push(input);
        }
    };
    InputHandler.prototype.tick = function () {
        this.execute();
        timers_1.setTimeout(this.tick.bind(this), this.getSleepTime());
    };
    /**
     * Executes all queued actions using the defined strategy.
     */
    InputHandler.prototype.execute = function () {
        if (this.actionQueue.length === 0) {
            this.keepLoggedIn();
            return;
        }
        /*if(this.strategy === 'AVG') {
            const nonClickActions= this.actionQueue.filter((a: Action) => (a instanceof MouseClick || a instanceof MouseMoveClick))
            const clickActions = this.actionQueue.filter((a: Action) => !(a instanceof MouseClick || a instanceof MouseMoveClick))
            const avgClickAction= this.actionFactory.averageClickAction(clickActions)
            
            this.actionQueue = [...nonClickActions, avgClickAction]
        }*/
        this.actionQueue.forEach(function (a) { a.execute(); });
        (_a = this.executedActions).push.apply(_a, this.actionQueue);
        this.actionQueue = [];
        this.lastExecution = Date.now();
        var _a;
    };
    InputHandler.prototype.keepLoggedIn = function () {
        if ((Date.now() - this.lastExecution) > Constants.KEEP_ALIVE_CLICK_INTERVAL) {
            var tapMessage = "tap " + Constants.VALID_KEYS[Math.floor(Math.random() * Constants.VALID_KEYS.length)];
            this.onMessage(Constants.CHAT_CHANNEL, { username: '$system-keepalive$' }, tapMessage, false);
        }
    };
    InputHandler.prototype.getSleepTime = function () {
        var min = Math.ceil(600);
        var max = Math.floor(3000);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    };
    return InputHandler;
}());
exports.InputHandler = InputHandler;
