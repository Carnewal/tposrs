"use strict";
exports.__esModule = true;
exports.isPointInRegion = function (x, y, region) {
    return x >= region.tl.x && x <= region.br.x
        && y >= region.tl.y && y <= region.br.y;
};
