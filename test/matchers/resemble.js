beforeEach(() => {
    const SPACE_LIMIT = 6;
    const WEIGHT_LIMIT = 1;

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
        errors += match(expected.g, g) ? '' : 'b';
        if (errors === '') {
            return ' ';
        } else if (errors.length === 1) {
            return errors;
        } else {
            return errors.includes('a') ? 'x' : 'c';
        }
    };

    const matchRect = (expected, actual) => {
        return Object.keys(expected).reduce((passing, constraint) => {
            return passing && match(expected[constraint], actual[constraint]);
        }, true);
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
                const regions = [];
                let lastX = 0;

                const colors = {
                    body: 0,
                    text: 0,
                    misc: 0
                };
                for (let x = 0; x < width; x++) {
                    let weight = 0;
                    for (let y = 0; y < height; y++) {
                        const pixelIndex = width * y * 4 + x * 4;
                        if (' ' === matchPixel(bodyColor,
                                data[pixelIndex], data[pixelIndex + 1], data[pixelIndex + 2], data[pixelIndex + 3])) {
                            colors.body++;
                        } else if (' ' === matchPixel(textColor,
                                data[pixelIndex], data[pixelIndex + 1], data[pixelIndex + 2], data[pixelIndex + 3])) {
                            colors.text++;
                            weight += 1;
                        } else {
                            colors.misc++;
                            weight += 0.5;
                        }
                    }

                    if (x === 0 && WEIGHT_LIMIT < weight) {
                        regions.push(0);
                    }
                    if (weight < WEIGHT_LIMIT === !!(regions.length % 2)) {
                        regions.push(x - lastX);
                        lastX = x;
                    }
                }

                let actualText = '';
                regions.forEach((region, index) => actualText += index % 2 ? 'x' : SPACE_LIMIT < region ? ' ' : '');
                const expectedText = expected.replace(/\S/g, 'x');

                let passing = actualText.trim() === expectedText.trim();

                passing = passing && colors.misc < colors.text && colors.text < colors.body;

                return {
                    pass: passing,
                    message: `Mismatch\nExpected: ${expected}\n  Actual: ${actualText}`
                }
            }
        }),
        toResembleShape: () => ({
            compare: (actual, expected, rotateCW) => {
                const { data, width, height } = actual;
                let passing = true;
                let matrix = `|${'-'.repeat(width)}|\n|`;

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
                    }
                    matrix += '|\n|';
                }
                matrix += `${'-'.repeat(width)}|`;

                return {
                    pass: passing,
                    message: `Problems:\n${matrix}`
                };
            }
        }),
        toResembleOblongShape: () => ({
            compare: (actual, expected, rotateCW) => {
                const { data, width, height } = actual;
                let passing = true;
                const errors = [];

                for (let x = 0; x < width; x++) {
                    for (let y = 0; y < height; y++) {
                        const pixelIndex = width * y * 4 + x * 4;
                        let mapped;
                        if (rotateCW === 90 || rotateCW === 270) {
                            mapped = rotateCW === 90 ? width - x - 1 : x;
                        } else {
                            mapped = rotateCW === 180 ? height - y - 1 : y;
                        }

                        const currentPassing = matchPixel(expected[mapped],
                            data[pixelIndex], data[pixelIndex + 1], data[pixelIndex + 2], data[pixelIndex + 3]);
                        passing = passing && currentPassing;

                        if (!currentPassing) {
                            errors.push({ pixelIndex, mapped, value: [
                                data[pixelIndex], data[pixelIndex + 1], data[pixelIndex + 2], data[pixelIndex + 3]
                            ]});
                        }
                    }
                }

                return {
                    pass: passing,
                    message: `Problems:\n${errors}`
                };
            }
        })
    });
});
