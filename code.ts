// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs such as the network by creating a UI which contains
// a full browser environment (see documentation).

function clone(val) {
  return JSON.parse(JSON.stringify(val));
}

function fillColor(fills) {
  console.log("fills:", fills);
  fills[0].color.r = Math.random();
  fills[0].color.g = Math.random();
  fills[0].color.b = Math.random();
  return fills;
}

async function randomColorIfApplicable(node) {
  // Look for fills on node types that have fills.
  // An alternative would be to do `if ('fills' in node) { ... }
  switch (node.type) {
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
}

const selectedNodes = figma.currentPage.selection;

// Make sure to close the plugin when you're done. Otherwise the plugin will
// keep running, which shows the cancel button at the bottom of the screen.
// figma.closePlugin();

Promise.all(
  selectedNodes.map(selected => randomColorIfApplicable(selected))
).then(() => figma.closePlugin());
