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
var Functions_1 = require("../../util/Functions");
var MouseMoveClick = /** @class */ (function (_super) {
    __extends(MouseMoveClick, _super);
    function MouseMoveClick(user, action) {
        var _this = _super.call(this, user) || this;
        _this.x = action.x;
        _this.y = action.y;
        _this.screenClientPosition = action.screenClientPosition,
            _this.blockedClientRegions = action.blockedClientRegions;
        _this.button = action.button;
        return _this;
    }
    MouseMoveClick.prototype.isValid = function () {
        return (this.button === 'left' || this.button === 'right')
            && Functions_1.isPointInRegion(this.x, this.y, Constants_1.CLIENT_REGION)
            && !this.isInsideBlockedRegion();
    };
    MouseMoveClick.prototype.isInsideBlockedRegion = function () {
        var _this = this;
        return this.blockedClientRegions.some(function (region) { return Functions_1.isPointInRegion(_this.x, _this.y, region); });
    };
    MouseMoveClick.prototype.execute = function () {
        if (this.isValid()) {
            RobotJS.moveMouse(this.screenClientPosition.x + this.x, this.screenClientPosition.y + this.y);
            RobotJS.mouseClick(this.button);
        }
        this.executed = true;
    };
    MouseMoveClick.prototype.toString = function () {
        return this.user + ": click(" + this.x + "," + this.y + ")";
    };
    return MouseMoveClick;
}(Action_1.Action));
exports.MouseMoveClick = MouseMoveClick;
