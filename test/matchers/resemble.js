beforeEach(() => {
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
        return match(expected.r, r)
            && match(expected.g, g)
            && match(expected.b, b)
            && match(expected.a, a);
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
                        const currentPassing = matchPixel(expected,
                            data[pixelIndex], data[pixelIndex + 1], data[pixelIndex + 2], data[pixelIndex + 3]);
                        if (currentPassing) {
                            count++;
                        }
                    }
                }

                const passing = area / 2 < count;

                const result = {
                    pass: passing
                };

                if (!passing) {
                    result.message = `Matched ${count} out of ${area}`;
                }

                return result;
            }
        }),
        toResembleText: () => ({
            compare: (actual, expected, textColor, bodyColor) => {
                const { data, width, height } = actual;

                let bounds;
                for (let x = 0; x < width; x++) {
                    let empty = true;
                    for (let y = 0; y < height; y++) {
                        const pixelIndex = width * y * 4 + x * 4;
                        const currentPassing = !matchPixel(bodyColor,
                            data[pixelIndex], data[pixelIndex + 1], data[pixelIndex + 2], data[pixelIndex + 3]);

                        if (currentPassing) {
                            empty = false;
                            if (bounds === undefined) {
                                bounds = { left: x, top: y, right: x + 1, bottom: y + 1 };
                            } else {
                                bounds.top = Math.min(bounds.top, y + 1);
                                bounds.right = Math.max(bounds.right, x + 1);
                                bounds.bottom = Math.max(bounds.bottom, y + 1);
                            }
                        }
                    }
                }

                const colors = {
                    body: 0,
                    text: 0,
                    misc: 0
                };
                for (let x = bounds.left; x < bounds.right; x++) {
                    for (let y = bounds.top; y < bounds.bottom; y++) {
                        const pixelIndex = width * y * 4 + x * 4;
                        if (matchPixel(bodyColor,
                                data[pixelIndex], data[pixelIndex + 1], data[pixelIndex + 2], data[pixelIndex + 3])) {
                            colors.body++;
                        } else if (matchPixel(textColor,
                                data[pixelIndex], data[pixelIndex + 1], data[pixelIndex + 2], data[pixelIndex + 3])) {
                            colors.text++;
                        } else {
                            colors.misc++;
                        }
                    }
                }

                let passing = matchRect(expected, {
                    x: bounds.left,
                    y: bounds.top,
                    width: bounds.right - bounds.left,
                    height: bounds.bottom - bounds.top
                });

                passing = passing && colors.misc < colors.text && colors.text < colors.body;

                const result = {
                    pass: passing
                };

                return result;
            }
        }),
        toResembleShape: () => ({
            compare: (actual, expected, rotateCW) => {
                const { data, width, height } = actual;
                let passing = true;
                const errors = [];

                for (let x = 0; x < width; x++) {
                    for (let y = 0; y < height; y++) {
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

                        const currentPassing = matchPixel(expected[mappedY][mappedX],
                            data[pixelIndex], data[pixelIndex + 1], data[pixelIndex + 2], data[pixelIndex + 3]);
                        passing = passing && currentPassing;

                        if (!currentPassing) {
                            errors.push({ pixelIndex, mappedX, mappedY, value: [
                                data[pixelIndex], data[pixelIndex + 1], data[pixelIndex + 2], data[pixelIndex + 3]
                            ]});
                        }
                    }
                }

                const result = {
                    pass: passing
                };

                if (!passing) {
                    result.message = `Problems ${errors.length}, ${JSON.stringify(errors)}`;
                }

                return result;
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

                const result = {
                    pass: passing
                };

                return result;
            }
        })
    });
});
