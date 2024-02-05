"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.control = exports.greenarrowElement = exports.greenarrowStyle = void 0;
const glowSize = 7;
const greenarrowStyle = (color, glow, sizeMultiplier) => {
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
exports.greenarrowStyle = greenarrowStyle;
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
const greenarrowElement = (controlClass, greenarrowId, shape, color, glow, sizeMultiplier) => {
    const showCurveReflection = false; // TODO: Needs visual work and potentially make an option for poeple who like the old style better
    const greenarrowContainerPadding = (glowSize + 4) * sizeMultiplier;
    const length = nodeRedDashboardUICardHeight(sizeMultiplier) - greenarrowContainerPadding * 2;
    // TODO: if show glow is turned off we should not include this padding for the glow?
    const greenarrowContentsStyle = String.raw `
    div.${controlClass}.green_arrow_contents {
      min-height: ${length}px;
      min-width: ${length}px;
      height: ${length}px;
      width: ${length}px;
      max-height: ${length}px;
      max-width: ${length}px;
      text-align: center;
      margin: ${greenarrowContainerPadding}px;
      clip-path: polygon(0 40%, 50% 0, 100% 40%, 100% 70%, 64% 44%, 64% 100%, 36% 100%, 36% 44%, 0 70%, 0 40%);
      ${shape === 'circle' ? `border-radius: 5%;` : ''}
    }`;
    const greenarrowCurveShineReflectionStyle = String.raw `
    .${controlClass}.curveShine {
      width: 70%; 
      height: 70%; 
      background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(0,255,31,0) 60%);'
    }`;
    const styles = String.raw `
        ${greenarrowContentsStyle}
        ${greenarrowCurveShineReflectionStyle}
    `;
    const greenarrowCurveReflection = String.raw `
        <div class='${controlClass} curveShine'></div>`;
    const greenarrowContentsElement = String.raw `
    <div 
      class='${controlClass} green_arrow_contents' 
      id='${greenarrowId}' 
      style='${exports.greenarrowStyle(color, glow, sizeMultiplier)}'>
      ${showCurveReflection ? greenarrowCurveReflection : ''}
    </div>`;
    return String.raw `
    <style>
        ${styles}
    </style>
    ${greenarrowContentsElement}`;
};
exports.greenarrowElement = greenarrowElement;
const control = (controlClass, greenarrowId, label, labelPlacement, labelAlignment, shape, color, glow, sizeMultiplier) => {
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
      ${exports.greenarrowElement(controlClass, greenarrowId, shape, color, glow, sizeMultiplier)}
      ${optionalName(labelPlacement === 'right')}
    </div>`;
    return style + allElements;
};
exports.control = control;
//# sourceMappingURL=rendering.js.map