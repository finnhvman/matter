import { isBrowser } from './browser.js';

const IS_SAFARI = isBrowser('Safari');

const capture = (element, style, spacing = 0, pixelDensity) => {
    const { width, height } = element.getBoundingClientRect();
    const xhtml = new XMLSerializer().serializeToString(element);

    const svg = svgify(xhtml, style, width, height, spacing, pixelDensity);

    const canvas = createCanvas(width + 2 * spacing, height + 2 * spacing, pixelDensity);
    const context = canvas.getContext('2d');


    if (pixelDensity === 1) {
        context.getImageData1x =
            (sx, sy, sw, sh) => context.getImageData(spacing + sx, spacing + sy, sw, sh);
    } else if (pixelDensity === 2) {
        context.getImageData2x =
            (sx, sy, sw, sh) => context.getImageData(2 * (spacing + sx), 2 * (spacing + sy), 2 * sw, 2 * sh);
    } else if (pixelDensity === 3) {
        context.getImageData3x =
            (sx, sy, sw, sh) => context.getImageData(3 * (spacing + sx), 3 * (spacing + sy), 3 * sw, 3 * sh);
    }

    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => {
            context.drawImage(image, 0, 0);
            resolve(context);
        };
        image.onerror = (event) => {
            reject(event);
        };

        image.src = `data:image/svg+xml;utf8,${encodeURI(svg)}`;
    });
};

const svgify = (xhtml, style, width, height, spacing, pixelDensity) => {
    const svgWidth = (width + 2 * spacing) * pixelDensity;
    const svgHeight = (height + 2 * spacing) * pixelDensity;

    const svgViewBox = IS_SAFARI ? `0 0 ${svgWidth} ${svgHeight}` : `0 0 ${width + 2 * spacing} ${height + 2 * spacing}`;
    const divPadding = IS_SAFARI ? spacing * pixelDensity : spacing;

    if (IS_SAFARI) {
        style = style.replace(/(\d+)px/g, (match, number) => `${number * pixelDensity}px`);
        xhtml = xhtml.replace(/(\d+)px/g, (match, number) => `${number * pixelDensity}px`);
    }

    return `<svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}" viewBox="${svgViewBox}">
              <style>
                ${style}
              </style>
              <foreignObject width="100%" height="100%">
                <div xmlns="http://www.w3.org/1999/xhtml" style="padding: ${divPadding}px;">
                  ${xhtml}
                </div>
              </foreignObject>
            </svg>`;
};

const createCanvas = (width, height, pixelDensity) => {
    const canvas = document.createElement('canvas');
    canvas.width = width * pixelDensity;
    canvas.height = height * pixelDensity;
    return canvas;
};

export const capture1x = (element, style, spacing) => capture(element, style, spacing, 1);
export const capture2x = (element, style, spacing) => capture(element, style, spacing, 2);
export const capture3x = (element, style, spacing) => capture(element, style, spacing, 3);
