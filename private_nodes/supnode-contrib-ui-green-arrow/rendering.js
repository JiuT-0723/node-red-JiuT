"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTML = exports.controlClassTemplate = exports.composeGreenArrowElementIdTemplate = void 0;
const rendering_1 = require("./shared/rendering");
// TODO: switch from _ to - to ensure we don't ever collide with any class and to make more readable as different than a description (led_container vs led-31343, etc)
const composeGreenArrowElementIdTemplate = () => {
    return String.raw `green_arrow_{{$id}}`;
};
exports.composeGreenArrowElementIdTemplate = composeGreenArrowElementIdTemplate;
exports.controlClassTemplate = String.raw `green_arrow_{{$id}}`;
/**
 * Generate our dashboard HTML code
 * @param {object} config - The node's config instance
 * @param {object} ledStyle - Style attribute of our LED span in in-line CSS format
 */
const HTML = (config, color, glow, sizeMultiplier) => {
    // text-align: ` + config.labelAlignment + `
    return rendering_1.control(exports.controlClassTemplate, exports.composeGreenArrowElementIdTemplate(), config.label, config.labelPlacement || 'left', config.labelAlignment || 'left', config.shape || 'circle', color, glow, sizeMultiplier);
};
exports.HTML = HTML;
//# sourceMappingURL=rendering.js.map