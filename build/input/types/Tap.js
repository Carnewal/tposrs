"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var RobotJS = require("robotjs");
var Action_1 = require("./Action");
var Constants_1 = require("../../util/Constants");
var Tap = /** @class */ (function (_super) {
    __extends(Tap, _super);
    function Tap(user, action) {
        var _this = _super.call(this, user) || this;
        _this.key = action.key.toLowerCase();
        return _this;
    }
    Tap.prototype.isValid = function () {
        return Constants_1.VALID_KEYS.indexOf(this.key) >= 0;
    };
    Tap.prototype.execute = function () {
        if (this.isValid()) {
            RobotJS.keyTap(this.key);
        }
        this.executed = true;
    };
    Tap.prototype.toString = function () {
        return this.user + ": tap(" + this.key + ")";
    };
    return Tap;
}(Action_1.Action));
exports.Tap = Tap;
