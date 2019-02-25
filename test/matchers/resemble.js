beforeEach(() => {
    const TEXT_TOLERANCE = 25;
    const ERROR_LIMIT = 20;

    const match = (expected, actual) => {
        if (typeof expected === 'number') {
            return expected === actual;
        } else if (expected instanceof Array) {
            return expected[0] <= actual && actual <= expected[1];
        } else {
            return true;
        }
    };

    /**
     * @return
     *   - (space) match
     *
     * r - red mismatch
     * g - green mismatch
     * b - blue mismatch
     * a - alpha mismatch
     *
     * c - at least two of r, g, or b
     * x - at least one of r, g, or b and a
     */
    const matchPixel = (expected, r, g, b, a) => {
        let errors = match(expected.a, a) ? '' : 'a';
        errors += match(expected.r, r) ? '' : 'r';
        errors += match(expected.g, g) ? '' : 'g';
        errors += match(expected.b, b) ? '' : 'b';
        if (errors === '') {
            return ' ';
        } else if (errors.length === 1) {
            return errors;
        } else {
            return errors.includes('a') ? 'x' : 'c';
        }
    };

    const tolerate = (value, tolerance) => {
        if (typeof value === 'number') {
            return [ value - tolerance, value + tolerance ];
        } else if (value instanceof Array) {
            return [ value[0] - tolerance, value[1] + tolerance ];
        }
    };

    const tolerateColor = (color, tolerance) => {
        return Object.keys(color).reduce((toleratedColor, channel) => {
            toleratedColor[channel] = tolerate(color[channel], tolerance);
            return toleratedColor;
        }, {});
    };

    const segment = (data, width, height, bodyColor) => {
        const segments = new Array(height).fill(0).map(() => new Array(width));
        const regions = [];
        let index = 0;
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                const pixelIndex = width * y * 4 + x * 4;
                const current = matchPixel(bodyColor,
                    data[pixelIndex], data[pixelIndex + 1], data[pixelIndex + 2], data[pixelIndex + 3]);
                if (current === ' ') {
                    segments[y][x] = 0;
                } else {
                    const neighbours = [];
                    if (0 < y) {
                        if (segments[y - 1][x]) { // check top
                            neighbours.push(segments[y - 1][x]);
                        }
                    }
                    if (0 < x) {
                        if (segments[y][x - 1]) { // check left
                            neighbours.push(segments[y][x - 1]);
                        }
                    }

                    if (neighbours.length) {
                        neighbours.sort();
                        segments[y][x] = neighbours[0];
                        if (1 < neighbours.length) {
                            neighbours.forEach(neighbour => { // connect regions
                                if (neighbour !== neighbours[0]) {
                                    const foundReference = regions.find(region => region.includes(neighbours[0]));
                                    const foundCurrent = regions.find(region => region.includes(neighbour));
                                    if (foundCurrent === foundReference) {
                                        // Nothing to do
                                    } else if (foundReference && foundCurrent) {
                                        regions.push(foundReference.concat(foundCurrent));
                                        foundReference.length = 0;
                                        foundCurrent.length = 0;
                                    } else {
                                        foundReference.push(neighbour);
                                    }
                                }
                            });
                        }
                    } else {
                        index++;
                        segments[y][x] = index;
                        regions.push([index]);
                    }
                }
            }
        }

        return regions.filter(region => region.length).length;
    };

    jasmine.addMatchers({
        toResembleColor: () => ({
            compare: (actual, expected) => {
                const { data, width, height } = actual;
                const area = width * height;

                let count = 0;
                for (let x = 0; x < width; x++) {
                    for (let y = 0; y < height; y++) {
                        const pixelIndex = width * y * 4 + x * 4;
                        const currentPassing = ' ' === matchPixel(expected,
                            data[pixelIndex], data[pixelIndex + 1], data[pixelIndex + 2], data[pixelIndex + 3]);
                        if (currentPassing) {
                            count++;
                        }
                    }
                }

                const passing = area / 2 < count;

                return {
                    pass: passing,
                    message: `Matched ${count} out of ${area}`
                };
            }
        }),
        toResembleText: () => ({
            compare: (actual, expected, textColor, bodyColor) => {
                const { data, width, height } = actual;

                const segments = segment(data, width, height, bodyColor);

                const words = expected.replace(/\s/g, '').length;

                let passing = segments === words;

                const toleratedColor = tolerateColor(textColor, TEXT_TOLERANCE);

                const colors = {
                    body: 0,
                    text: 0,
                    misc: 0
                };
                for (let x = 0; x < width; x++) {
                    for (let y = 0; y < height; y++) {
                        const pixelIndex = width * y * 4 + x * 4;
                        if (' ' === matchPixel(bodyColor,
                                data[pixelIndex], data[pixelIndex + 1], data[pixelIndex + 2], data[pixelIndex + 3])) {
                            colors.body++;
                        } else if (' ' === matchPixel(toleratedColor,
                                data[pixelIndex], data[pixelIndex + 1], data[pixelIndex + 2], data[pixelIndex + 3])) {
                            colors.text++;
                        } else {
                            colors.misc++
                        }
                    }
                }

                passing = passing && colors.misc <= colors.text && colors.text <= colors.body;

                return {
                    pass: passing,
                    message: `Expected: ${words} characters (${expected}), Actual: ${segments} characters. Colors: ${colors.misc}, ${colors.text}, ${colors.body}`
                }
            }
        }),
        toResembleShape: () => ({
            compare: (actual, expected, rotateCW) => {
                const { data, width, height } = actual;
                let passing = true;
                let matrix = `|${'-'.repeat(width)}|\n|`;
                let errors = '';
                let errorCount = 0;

                for (let y = 0; y < height; y++) {
                    for (let x = 0; x < width; x++) {
                        const pixelIndex = width * y * 4 + x * 4;
                        let mappedX;
                        let mappedY;
                        switch (rotateCW) {
                            case 90:
                                mappedX = y;
                                mappedY = width - x - 1;
                                break;
                            case 180:
                                mappedX = width - x - 1;
                                mappedY = height - y - 1;
                                break;
                            case 270:
                                mappedX = height - y - 1;
                                mappedY = x;
                                break;
                            default:
                                mappedX = x;
                                mappedY = y;
                                break;
                        }

                        const current = matchPixel(expected[mappedY][mappedX],
                            data[pixelIndex], data[pixelIndex + 1], data[pixelIndex + 2], data[pixelIndex + 3]);
                        matrix += current;
                        passing = passing && current === ' ';

                        if (current !== ' ') {
                            if (errorCount < ERROR_LIMIT) {
                                errors += `(${mappedX}, ${mappedY}): ${data[pixelIndex]}, ${data[pixelIndex + 1]}, ${data[pixelIndex + 2]}, ${data[pixelIndex + 3]})}\n`;
                            }
                            errorCount++;
                        }
                    }
                    matrix += '|\n|';
                }
                matrix += `${'-'.repeat(width)}|`;

                return {
                    pass: passing,
                    message: `Problems at ${rotateCW}deg:\n${matrix}\n${errors}\n${errorCount - ERROR_LIMIT} more errors.`
                };
            }
        }),
        toResembleOblongShape: () => ({
            compare: (actual, expected, rotateCW) => {
                const { data, width, height } = actual;
                let passing = true;
                let errors = '';
                let errorCount = 0;

                for (let x = 0; x < width; x++) {
                    for (let y = 0; y < height; y++) {
                        const pixelIndex = width * y * 4 + x * 4;
                        let mapped;
                        if (rotateCW === 90 || rotateCW === 270) {
                            mapped = rotateCW === 90 ? width - x - 1 : x;
                        } else {
                            mapped = rotateCW === 180 ? height - y - 1 : y;
                        }

                        const current = matchPixel(expected[mapped],
                            data[pixelIndex], data[pixelIndex + 1], data[pixelIndex + 2], data[pixelIndex + 3]);
                        passing = passing && (current === ' ');

                        if (current !== ' ') {
                            if (errorCount < ERROR_LIMIT) {
                                errors += `(${x}, ${y}): ${data[pixelIndex]}, ${data[pixelIndex + 1]}, ${data[pixelIndex + 2]}, ${data[pixelIndex + 3]})}\n`;
                            }
                            errorCount++;
                        }
                    }
                }

                return {
                    pass: passing,
                    message: `Problems at ${rotateCW}deg (first ${ERROR_LIMIT}):\n${errors}\n${errorCount - ERROR_LIMIT} more errors.`
                };
            }
        }),
        toResembleCircularShape: () => ({
            compare: (actual, expected, from = 0, to = 360) => {
                const { data, width, height } = actual;
                let passing = true;
                let errors = '';
                let errorCount = 0;

                const center = {
                    x: width / 2,
                    y: height / 2
                };

                for (let x = 0; x < width; x++) {
                    for (let y = 0; y < height; y++) {
                        const pixelIndex = width * y * 4 + x * 4;
                        const dx = x - center.x + 0.5;
                        const dy = y - center.y + 0.5;
                        const mapped = Math.round(Math.sqrt(dx ** 2 + dy ** 2));
                        const angle = Math.atan(dy / dx) / Math.PI * 180 + (0 < dx ? 90 : 270);

                        const inSector = from < to ? (from <= angle && angle <= to) : (from <= angle || angle <= to);
                        const current = !inSector ? ' ' : matchPixel(expected[mapped],
                            data[pixelIndex], data[pixelIndex + 1], data[pixelIndex + 2], data[pixelIndex + 3]);
                        passing = passing && (current === ' ');

                        if (current !== ' ') {
                            if (errorCount < ERROR_LIMIT) {
                                errors += `(${x}, ${y}), mapped (${mapped}, ${angle.toFixed(2)}°): ${data[pixelIndex]}, ${data[pixelIndex + 1]}, ${data[pixelIndex + 2]}, ${data[pixelIndex + 3]}}\n`;
                            }
                            errorCount++;
                        }
                    }
                }

                return {
                    pass: passing,
                    message: `Problems (first ${ERROR_LIMIT}):\n${errors}\n${errorCount - ERROR_LIMIT} more errors.`
                };
            }
        })
    });
});
