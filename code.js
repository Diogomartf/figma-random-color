// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs such as the network by creating a UI which contains
// a full browser environment (see documentation).
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function clone(val) {
    return JSON.parse(JSON.stringify(val));
}
function fillColor(fills) {
    fills[0].color.r = Math.random();
    fills[0].color.g = Math.random();
    fills[0].color.b = Math.random();
    return fills;
}
function fillFrameColor(fills) {
    console.log("fills:", fills);
    fills[0].color.r = Math.random();
    fills[0].color.g = Math.random();
    fills[0].color.b = Math.random();
    return fills;
}
function randomColorIfApplicable(node) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("YO", node);
        // Look for fills on node types that have fills.
        // An alternative would be to do `if ('fills' in node) { ... }
        switch (node.type) {
            case "FRAME": {
                const fills = clone(node.backgrounds);
                node.backgrounds = fillColor(fills);
                break;
            }
            case "RECTANGLE":
            case "ELLIPSE":
            case "POLYGON":
            case "STAR":
            case "VECTOR":
            case "TEXT": {
                // Create a new array of fills, because we can't directly modify the old one
                const fills = clone(node.fills);
                node.fills = fillColor(fills);
                break;
            }
            default: {
                // not supported, silently do nothing
            }
        }
    });
}
const selectedNodes = figma.currentPage.selection;
// Make sure to close the plugin when you're done. Otherwise the plugin will
// keep running, which shows the cancel button at the bottom of the screen.
// figma.closePlugin();
Promise.all(selectedNodes.map(selected => randomColorIfApplicable(selected))).then(() => figma.closePlugin());
