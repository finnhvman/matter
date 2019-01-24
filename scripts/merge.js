/* Utility to create cross-browser shape verification matrices, first arg is colors.json the rest are pngs */
const fs  = require('fs');
const { PNG } = require('pngjs');

const [ node, script, json, ...pngs ] = process.argv;

const match = (expected, actual) => {
    if (typeof expected === 'number') {
        return expected === actual;
    } else if (expected instanceof Array) {
        return expected[0] <= actual && actual <= expected[1];
    } else {
        return true;
    }
};

const matchPixel = (expected, r, g, b, a) => {
    return match(expected.a, a) && match(expected.r, r) && match(expected.g, g) && match(expected.b, b);
};


const colors = JSON.parse(fs.readFileSync(json, 'utf8'));

const images = pngs.map((png) => {
    const file = fs.readFileSync(png);
    return PNG.sync.read(file);
});

const { width, height } = images[0];

const matrix = new Array(height).fill(null).map(() => new Array(width).fill(null));

colors.forEach((color, colorIndex) => {
    // use and logical operator
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const index = width * y * 4 + x * 4;

            const matched = images.reduce((accu, image) => {
                return accu && matchPixel(color, image.data[index], image.data[index + 1], image.data[index + 2], image.data[index + 3]);
            }, true);

            if (matched) {
                matrix[y][x] = colorIndex;
            }
        }
    }
});

matrix.forEach((row) => console.log(JSON.stringify(row) + ','));
