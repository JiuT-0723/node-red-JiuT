"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.control = exports.redcrossElement = exports.redcrossStyle = void 0;
const glowSize = 7;
const redcrossStyle = (color, glow, sizeMultiplier) => {
    if (glow) {
        return `
      background-color: ${color};
      box-shadow:
        #0000009e 0 0px 1px 0px,
        ${color} 0 0px ${glowSize * sizeMultiplier}px ${Math.floor((glowSize * sizeMultiplier) / 3)}px,
    inset #00000017 0 -1px 1px 0px;`;
    }
    else {
        // TODO: duplicate code because of execution scope, fix this shit :|
        return `
      background-color: ${color}; 
      box-shadow:
        #0000009e 0 0px 1px 0px,
        inset #ffffff8c 0px 1px 2px,
        inset #00000033 0 -1px 1px 0px,
        inset ${color} 0 -1px 2px;`;
    }
};
exports.redcrossStyle = redcrossStyle;
// HACK: workaround because ratio trick isn't working consistently across browsers
const nodeRedDashboardUICardVerticalPadding = 3 * 2;
// const nodeRedDashboardUICardHorizontalPadding = 6 * 2
const nodeRedDashboardUICardHeight = (sizeMultiplier) => {
    let height = 48 + (sizeMultiplier - 1) * 54;
    if (height >= 4) {
        height -= 6; // For some reason the difference between 3 and 4 is 48
    }
    return height - nodeRedDashboardUICardVerticalPadding;
};
const redcrossElement = (controlClass, redcrossId, shape, color, glow, sizeMultiplier) => {
    const showCurveReflection = false; // TODO: Needs visual work and potentially make an option for poeple who like the old style better
    const redcrossContainerPadding = (glowSize + 4) * sizeMultiplier;
    const length = nodeRedDashboardUICardHeight(sizeMultiplier) - redcrossContainerPadding * 2;
    // TODO: if show glow is turned off we should not include this padding for the glow?
    const redcrossContentsStyle = String.raw `
    div.${controlClass}.red_cross_contents {
      min-height: ${length}px;
      min-width: ${length}px;
      height: ${length}px;
      width: ${length}px;
      max-height: ${length}px;
      max-width: ${length}px;
      text-align: center;
      margin: ${redcrossContainerPadding}px;
      clip-path: polygon(0 25%, 25% 0, 50% 25%, 75% 0%, 100% 25%, 75% 50%, 100% 75%, 75% 100%, 50% 75%, 25% 100%, 0 75%, 25% 50%);
      ${shape === 'circle' ? `border-radius: 5%;` : ''}
    }`;
    const redcrossCurveShineReflectionStyle = String.raw `
    .${controlClass}.curveShine {
      width: 70%; 
      height: 70%; 
      background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(0,255,31,0) 60%);'
    }`;
    const styles = String.raw `
        ${redcrossContentsStyle}
        ${redcrossCurveShineReflectionStyle}
    `;
    const redcrossCurveReflection = String.raw `
        <div class='${controlClass} curveShine'></div>`;
    const redcrossContentsElement = String.raw `
    <div 
      class='${controlClass} red_cross_contents' 
      id='${redcrossId}' 
      style='${exports.redcrossStyle(color, glow, sizeMultiplier)}'>
      ${showCurveReflection ? redcrossCurveReflection : ''}
    </div>`;
    return String.raw `
    <style>
        ${styles}
    </style>
    ${redcrossContentsElement}`;
};
exports.redcrossElement = redcrossElement;
const control = (controlClass, redcrossId, label, labelPlacement, labelAlignment, shape, color, glow, sizeMultiplier) => {
    const hasName = () => {
        return typeof label === 'string' && label !== '';
    };
    const name = () => {
        if (hasName()) {
            return `<span class=\"name\">` + label + `</span>`;
        }
        return '';
    };
    const optionalName = (display) => {
        if (display) {
            return name();
        }
        return '';
    };
    const controlStyle = String.raw `
    div.${controlClass}.control {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;

      justify-content: ${hasName() ? 'space-between' : 'center'};
      align-items: center;

      height: 100%;
      width: 100%;
      position: relative;

      overflow: hidden;
    }`;
    const labelStyle = String.raw `
    div.${controlClass} > span.name {
      text-align: ${labelAlignment};
      margin-left: 6px;
      margin-right: 6px;
      overflow-wrap: break-word;
      overflow: hidden;
      text-overflow: ellipsis;
      flex-grow: 1;
    }`;
    const style = String.raw `<style>
      ${controlStyle}
      ${labelStyle}
    </style>`;
    const allElements = String.raw `
    <div class="${controlClass} control">
      ${optionalName(labelPlacement !== 'right')}
      ${exports.redcrossElement(controlClass, redcrossId, shape, color, glow, sizeMultiplier)}
      ${optionalName(labelPlacement === 'right')}
    </div>`;
    return style + allElements;
};
exports.control = control;
//# sourceMappingURL=rendering.js.map