import { setUp, tearDown } from '../../../../test/helpers/fixture.js';
import { capture3x } from '../../../../test/helpers/capture.js';

const SPACING = 4;

// transparent
const tp = { a: 0 };

describe('Linear Progress', () => {

    const baseColor = { r: [31, 34], g: [145, 153], b: [242, 247] };

    [
        {
            label: 'determinate 0% progress',
            states: {
                '#xmas': {
                    value: 0
                }
            },
            fill: [ 0, 480 ],
            barColor: { ...baseColor, a: [30, 31]},
            fillColor: { ...baseColor, a: 255}
        },
        {
            label: 'determinate 25% progress',
            states: {
                '#xmas': {
                    value: 25
                }
            },
            fill: [ 120, 360 ],
            barColor: { ...baseColor, a: [30, 31]},
            fillColor: { ...baseColor, a: 255}
        },
        {
            label: 'determinate 50% progress',
            states: {
                '#xmas': {
                    value: 50
                }
            },
            fill: [ 240, 240 ],
            barColor: { ...baseColor, a: [30, 31]},
            fillColor: { ...baseColor, a: 255}
        },
        {
            label: 'determinate 75% progress',
            states: {
                '#xmas': {
                    value: 75
                }
            },
            fill: [ 360, 120 ],
            barColor: { ...baseColor, a: [30, 31]},
            fillColor: { ...baseColor, a: 255}
        },
        {
            label: 'determinate 100% progress',
            states: {
                '#xmas': {
                    value: 100
                }
            },
            fill: [ 480, 0 ],
            barColor: { ...baseColor, a: [30, 31]},
            fillColor: { ...baseColor, a: 255}
        },
        {
            label: 'indeterminate 0% animation',
            states: {
                '#xmas': {
                    indeterminate: '',
                    style: 'animation-delay: 0s; animation-play-state: paused; vertical-align: top;'
                }
            },
            fill: [ 0, 480 ],
            barColor: { ...baseColor, a: [30, 31]},
            fillColor: { ...baseColor, a: 255}
        },
        {
            label: 'indeterminate 25% animation',
            states: {
                '#xmas': {
                    indeterminate: '',
                    style: 'animation-delay: -0.45s; animation-play-state: paused; vertical-align: top;'
                }
            },
            fill: [ 0, 24, 262, 194 ],
            barColor: { ...baseColor, a: [30, 31]},
            fillColor: { ...baseColor, a: 255}
        },
        {
            label: 'indeterminate 50% animation',
            states: {
                '#xmas': {
                    indeterminate: '',
                    style: 'animation-delay: -0.9s; animation-play-state: paused; vertical-align: top;'
                }
            },
            fill: [ 0, 221, 259 ],
            barColor: { ...baseColor, a: [30, 31]},
            fillColor: { ...baseColor, a: 255}
        },
        {
            label: 'indeterminate 75% animation',
            states: {
                '#xmas': {
                    indeterminate: '',
                    style: 'animation-delay: -1.35s; animation-play-state: paused; vertical-align: top;'
                }
            },
            fill: [ 0, 100, 260, 120 ],
            barColor: { ...baseColor, a: [30, 31]},
            fillColor: { ...baseColor, a: 255}
        },
        {
            label: 'indeterminate 100% animation',
            states: {
                '#xmas': {
                    indeterminate: '',
                    style: 'animation-delay: -1.8s; animation-play-state: paused; vertical-align: top;'
                }
            },
            fill: [ 0, 480 ],
            barColor: { ...baseColor, a: [30, 31]},
            fillColor: { ...baseColor, a: 255}
        },
        {
            label: 'customized & determinate 50% progress',
            states: {
                '#xmas': {
                    value: 50,
                    style: 'vertical-align: top;--matter-primary-rgb: 255, 0, 0;'
                }
            },
            fill: [ 240, 240 ],
            barColor: {r: [254, 255], g: 0, b: 0, a: [30, 31]},
            fillColor: {r: 255, g: 0, b: 0, a: 255}
        },

    ].forEach((suite) => {

        describe(`in ${suite.label} state`, () => {

            let style;
            let progress;
            let width;
            let height;
            let context;

            beforeAll(async () => {
                style = setUp('src/components/progress/linear/progress-linear', suite.states);

                progress = document.querySelector('#xmas');
                const rect = progress.getBoundingClientRect();
                width = rect.width;
                height = rect.height;
                context = await capture3x(progress, style, SPACING);
            });

            afterAll(() => {
                tearDown();
            });

            it(`should have corresponding fill`, () => {
                const im = { ...suite.barColor, a: [ suite.barColor.a[0], suite.fillColor.a ] };

                const row = suite.fill.reduce((array, length, index) => {
                    const segment = new Array(length).fill(index % 2 ? suite.barColor : suite.fillColor);
                    if (segment.length) {
                        segment[0] = im;
                        segment[length - 1] = im;
                    }

                    return array.concat(segment);
                }, []);

                const shape = context.getImageData3x(0, 0, width, 4);

                expect(shape).toResembleOblongShape(row, 270);
            });

            it('should have no shadow', () => {
                const shadow = [ tp, tp, tp, tp, tp, tp, tp, tp, tp, tp, tp, tp ];

                const topShadow = context.getImageData3x(-4, -4, width + 4, 4);
                const rightShadow = context.getImageData3x(width, -4, 4, height + 4);
                const bottomShadow = context.getImageData3x(0, 4, width + 4, 4);
                const leftShadow = context.getImageData3x(-4, 0, 4, height + 4);

                expect(topShadow).toResembleOblongShape(shadow, 0);
                expect(rightShadow).toResembleOblongShape(shadow, 90);
                expect(bottomShadow).toResembleOblongShape(shadow, 180);
                expect(leftShadow).toResembleOblongShape(shadow, 270);
            });

        });

    });

});
