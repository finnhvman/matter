import { setUp, tearDown } from '../../../../test/helpers/fixture.js';
import { capture3x } from '../../../../test/helpers/capture.js';
import { isBrowserNot } from '../../../../test/helpers/browser.js';

const SPACING = 4;

// transparent
const tp = { a: 0 };

describe('Circular Progress', () => {

    const baseColor = { r: [31, 34], g: [145, 153], b: [241, 247] };

    [
        {
            label: 'indeterminate 0% animation',
            states: {
                '#xmas': {
                    indeterminate: '',
                    style: 'animation-delay: 0s; animation-play-state: paused;'
                }
            },
            fill: [ 346, 0 ],
            fillColor: { ...baseColor, a: 255}
        },
        {
            label: 'indeterminate 12.5% animation',
            states: {
                '#xmas': {
                    indeterminate: '',
                    style: 'animation-delay: -0.75s; animation-play-state: paused;'
                }
            },
            fill: [ 166, 75 ],
            fillColor: { ...baseColor, a: [192, 255]}
        },
        {
            label: 'indeterminate 25% animation',
            states: {
                '#xmas': {
                    indeterminate: '',
                    style: 'animation-delay: -1.5s; animation-play-state: paused;'
                }
            },
            fill: [ 256.5, 270 ],
            fillColor: { ...baseColor, a: 255}
        },
        {
            label: 'indeterminate 50% animation',
            states: {
                '#xmas': {
                    indeterminate: '',
                    style: 'animation-delay: -3s; animation-play-state: paused;'
                }
            },
            fill: [ 166, 180 ],
            fillColor: { ...baseColor, a: 255}
        },
        {
            label: 'indeterminate 75% animation',
            states: {
                '#xmas': {
                    indeterminate: '',
                    style: 'animation-delay: -4.5s; animation-play-state: paused;'
                }
            },
            fill: [ 76.5, 90 ],
            fillColor: { ...baseColor, a: 255}
        },
        {
            label: 'indeterminate 100% animation',
            states: {
                '#xmas': {
                    indeterminate: '',
                    style: 'animation-delay: -6s; animation-play-state: paused;'
                }
            },
            fill: [ 346, 0 ],
            fillColor: { ...baseColor, a: 255}
        },
        {
            label: 'customized & indeterminate 0% animation',
            states: {
                '#xmas': {
                    indeterminate: '',
                    style: '--matter-primary-rgb: 255, 0, 0;animation-delay: 0s; animation-play-state: paused;'
                }
            },
            fill: [ 346, 0 ],
            fillColor: {r: 255, g: 0, b: 0, a: 255}
        }
    ].forEach((suite) => {

        describe(`in ${suite.label} state`, () => {

            let style;
            let progress;
            let width;
            let height;
            let context;

            beforeAll(async () => {
                style = setUp('src/components/progress/circular/progress-circular', suite.states);

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
                // fill
                const fl = suite.fillColor;
                
                // intermediate
                const im = { };

                const slice = [
                    tp, tp, tp, tp, tp, tp, tp, tp, tp, tp,
                    tp, tp, tp, tp, tp, tp, tp, tp, tp, tp,
                    tp, tp, tp, tp, tp, tp, tp, tp, tp, tp,
                    tp, tp, tp, tp, tp, tp, tp, tp, tp, tp,
                    tp, tp, tp, tp, tp, tp, tp, im, im, fl,
                    fl, fl, fl, fl, fl, fl, fl, fl, fl, im,
                    im, im, tp, tp, tp, tp, tp, tp, tp, tp,
                    tp, tp, tp, tp, tp, tp, tp, tp, tp, tp,
                    tp, tp, tp, tp, tp, tp, tp, tp, tp, tp,
                    tp, tp, tp, tp, tp, tp, tp, tp, tp, tp,
                    tp, tp, tp, tp, tp, tp, tp, tp, tp, tp,
                    tp, tp, tp, tp, tp, tp, tp, tp, tp, tp
                ];

                const indicator = context.getImageData3x(-4, -4, 56, 56);

                isBrowserNot('Safari') && expect(indicator).toResembleCircularShape(slice, ...suite.fill);
            });

            it('should have no shadow', () => {
                // intermediate
                const im = { };

                const slice = [
                    tp, tp, tp, tp, tp, tp, tp, tp, tp, tp,
                    tp, tp, tp, tp, tp, tp, tp, tp, tp, tp,
                    tp, tp, tp, tp, tp, tp, tp, tp, tp, tp,
                    tp, tp, tp, tp, tp, tp, tp, tp, tp, tp,
                    tp, tp, tp, tp, tp, tp, tp, im, im, im,
                    im, im, im, im, im, im, im, im, im, im,
                    im, im, tp, tp, tp, tp, tp, tp, tp, tp,
                    tp, tp, tp, tp, tp, tp, tp, tp, tp, tp,
                    tp, tp, tp, tp, tp, tp, tp, tp, tp, tp,
                    tp, tp, tp, tp, tp, tp, tp, tp, tp, tp,
                    tp, tp, tp, tp, tp, tp, tp, tp, tp, tp,
                    tp, tp, tp, tp, tp, tp, tp, tp, tp, tp
                ];

                const indicator = context.getImageData3x(-4, -4, 56, 56);

                expect(indicator).toResembleCircularShape(slice);
            });

        });

    });

    describe('in smaller size', () => {

        let style;
        let progress;
        let width;
        let height;
        let context;

        beforeAll(async () => {
            style = setUp('src/components/progress/circular/progress-circular', {
                '#sized': {
                    indeterminate: '',
                    style: 'font-size: 12px; animation-delay: 0s; animation-play-state: paused;'
                }
            });

            progress = document.querySelector('#sized');
            const rect = progress.getBoundingClientRect();
            width = rect.width;
            height = rect.height;
            context = await capture3x(progress, style, SPACING);
        });

        afterAll(() => {
            tearDown();
        });

        it(`should have corresponding fill`, () => {
            // fill
            const fl = { ...baseColor, a: 255 };

            // intermediate
            const im = { };

            const slice = [
                tp, tp, tp, tp, tp, tp, tp, tp, tp, tp,
                tp, tp, tp, tp, tp, tp, tp, tp, tp, tp,
                tp, tp, tp, tp, tp, tp, tp, tp, tp, tp,
                tp, tp, tp, tp, tp, tp, im, im, fl, fl,
                fl, fl, fl, fl, fl, im, im, tp, tp, tp,
                tp, tp, tp, tp, tp, tp, tp, tp, tp, tp,
                tp, tp, tp, tp, tp, tp, tp, tp, tp, tp,
                tp, tp, tp, tp, tp, tp, tp, tp, tp, tp,
                tp, tp, tp, tp, tp, tp, tp, tp, tp, tp,
                tp, tp, tp, tp, tp, tp, tp, tp, tp, tp,
            ];

            const indicator = context.getImageData3x(-4, -4, 44, 44);

            isBrowserNot('Safari') && expect(indicator).toResembleCircularShape(slice, 346.5, 0);
        });

        it('should have no shadow', () => {
            // intermediate
            const im = { };

            const slice = [
                tp, tp, tp, tp, tp, tp, tp, tp, tp, tp,
                tp, tp, tp, tp, tp, tp, tp, tp, tp, tp,
                tp, tp, tp, tp, tp, tp, tp, tp, tp, tp,
                tp, tp, tp, tp, tp, tp, im, im, im, im,
                im, im, im, im, im, im, im, tp, tp, tp,
                tp, tp, tp, tp, tp, tp, tp, tp, tp, tp,
                tp, tp, tp, tp, tp, tp, tp, tp, tp, tp,
                tp, tp, tp, tp, tp, tp, tp, tp, tp, tp,
                tp, tp, tp, tp, tp, tp, tp, tp, tp, tp,
                tp, tp, tp, tp, tp, tp, tp, tp, tp, tp
            ];

            const indicator = context.getImageData3x(-4, -4, 44, 44);

            expect(indicator).toResembleCircularShape(slice);
        });

    });

});
