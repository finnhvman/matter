import { setUp, tearDown } from '../../../../test/helpers/fixture.js';
import { capture3x } from '../../../../test/helpers/capture.js';

const SPACING = 10;

// transparent
const tp = { a: 0 };

describe('Switch', () => {

    [
        {
            label: 'normal',
            states: {},
            textColor: { r: 0, g: 0, b: 0, a: 222},
            thumbColor: { r: 255, g: 255, b: 255, a: 255 },
            trackColor: { r: 0, g: 0, b: 0, a: [95, 97] },
            highlightColor: tp
        },
        {
            label: 'hover',
            states: {
                '#xmas': [ 'hover' ]
            },
            textColor: { r: 0, g: 0, b: 0, a: 222},
            thumbColor: { r: 255, g: 255, b: 255, a: 255 },
            trackColor: { r: 0, g: 0, b: 0, a: [95, 97] },
            highlightColor: { r: 0, g: 0, b: 0, a: 10 }
        },
        {
            label: 'focus',
            states: {
                '#xmas > input': [ 'focus' ]
            },
            textColor: { r: 0, g: 0, b: 0, a: 222},
            thumbColor: { r: 255, g: 255, b: 255, a: 255 },
            trackColor: { r: 0, g: 0, b: 0, a: [95, 97] },
            highlightColor: { r: 0, g: 0, b: 0, a: [30, 31] }
        },
        {
            label: 'focus & active',
            states: {
                '#xmas': [ 'active' ],
                '#xmas > input': [ 'focus' ]
            },
            textColor: { r: 0, g: 0, b: 0, a: 222},
            thumbColor: { r: 255, g: 255, b: 255, a: 255 },
            trackColor: { r: [31, 33], g: [149, 150], b: 243, a: 153 },
            highlightColor: tp
        },
        {
            label: 'checked',
            states: {
                '#xmas > input': [ 'checked' ]
            },
            checked: true,
            textColor: { r: 0, g: 0, b: 0, a: 222},
            thumbColor: { r: 33, g: 150, b: 243, a: 255 },
            trackColor: { r: [31, 33], g: [149, 150], b: 243, a: 153 },
            highlightColor: tp
        },
        {
            label: 'hover & focus',
            states: {
                '#xmas': [ 'hover' ],
                '#xmas > input': [ 'focus' ]
            },
            textColor: { r: 0, g: 0, b: 0, a: 222},
            thumbColor: { r: 255, g: 255, b: 255, a: 255 },
            trackColor: { r: 0, g: 0, b: 0, a: [95, 97] },
            highlightColor: { r: 0, g: 0, b: 0, a: [40, 41] }
        },
        {
            label: 'hover, focus & active',
            states: {
                '#xmas': [ 'active', 'hover' ],
                '#xmas > input': [ 'focus' ]
            },
            textColor: { r: 0, g: 0, b: 0, a: 222 },
            thumbColor: { r: 255, g: 255, b: 255, a: 255 },
            trackColor: { r: [31, 33], g: [149, 150], b: 243, a: 153 },
            highlightColor: tp
        },
        {
            label: 'hover & checked',
            states: {
                '#xmas': [ 'hover' ],
                '#xmas > input': [ 'checked' ]
            },
            checked: true,
            textColor: { r: 0, g: 0, b: 0, a: 222},
            thumbColor: { r: 33, g: 150, b: 243, a: 255 },
            trackColor: { r: [31, 33], g: [149, 150], b: 243, a: 153 },
            highlightColor: { r: [25, 26], g: 153, b: 255, a: 10 }
        },
        {
            label: 'focus & checked',
            states: {
                '#xmas > input': [ 'checked', 'focus' ]
            },
            checked: true,
            textColor: { r: 0, g: 0, b: 0, a: 222},
            thumbColor: { r: 33, g: 150, b: 243, a: 255 },
            trackColor: { r: [31, 33], g: [149, 150], b: 243, a: 153 },
            highlightColor: { r: [26, 34], g: [148, 153], b: [246, 247], a: [30, 31] }
        },
        {
            label: 'focus, active & checked',
            states: {
                '#xmas': [ 'active' ],
                '#xmas > input': [ 'focus', 'checked' ]
            },
            checked: true,
            textColor: { r: 0, g: 0, b: 0, a: 222},
            thumbColor: { r: 33, g: 150, b: 243, a: 255 },
            trackColor: { r: 0, g: 0, b: 0, a: [95, 97] },
            highlightColor: tp
        },
        {
            label: 'hover, focus & checked',
            states: {
                '#xmas': [ 'hover' ],
                '#xmas > input': [ 'checked', 'focus' ]
            },
            checked: true,
            textColor: { r: 0, g: 0, b: 0, a: 222},
            thumbColor: { r: 33, g: 150, b: 243, a: 255 },
            trackColor: { r: [31, 33], g: [149, 150], b: 243, a: 153 },
            highlightColor: { r: [31, 32], g: [149, 153], b: [242, 243], a: [ 40, 41] }
        },
        {
            label: 'hover, focus, active & checked',
            states: {
                '#xmas': [ 'active', 'hover' ],
                '#xmas > input': [ 'checked', 'focus' ]
            },
            checked: true,
            textColor: { r: 0, g: 0, b: 0, a: 222},
            thumbColor: { r: 33, g: 150, b: 243, a: 255 },
            trackColor: { r: 0, g: 0, b: 0, a: [95, 97] },
            highlightColor: tp
        },
        {
            label: 'disabled',
            states: {
                '#xmas > input': [ 'disabled' ]
            },
            textColor: { r: 0, g: 0, b: 0, a: 97 },
            thumbColor: { r: 255, g: 255, b: 255, a: 255 },
            trackColor: { r: 0, g: 0, b: 0, a: 37 },
            highlightColor: tp
        },
        {
            label: 'disabled & checked',
            states: {
                '#xmas > input': [ 'checked', 'disabled' ]
            },
            checked: true,
            textColor: { r: 0, g: 0, b: 0, a: 97},
            thumbColor: { r: [170, 171], g: 215, b: [250, 251], a: 255 },
            trackColor: { r: [30, 35], g: 149, b: [241, 246], a: 58 },
            highlightColor: tp
        },
        {
            label: 'customized',
            states: {
                '#xmas': {
                    style: '--matter-primary-rgb: 255, 0, 0;--matter-surface-rgb: 0, 0, 0;--matter-onsurface-rgb: 255, 255, 255;width: 150px;'
                }
            },
            textColor: { r: 255, g: 255, b: 255, a: 222},
            thumbColor: { r: 0, g: 0, b: 0, a: 255 },
            trackColor: { r: 255, g: 255, b: 255, a: [95, 97] },
            highlightColor: tp
        },
        {
            label: 'customized & checked',
            states: {
                '#xmas': {
                    style: '--matter-primary-rgb: 255, 0, 0;--matter-surface-rgb: 0, 0, 0;--matter-onsurface-rgb: 255, 255, 255;width: 150px;'
                },
                '#xmas > input': [ 'checked' ]
            },
            checked: true,
            textColor: { r: 255, g: 255, b: 255, a: 222},
            thumbColor: { r: 255, g: 0, b: 0, a: 255 },
            trackColor: { r: [254, 255], g: 0, b: 0, a: 153 },
            highlightColor: tp
        }
    ].forEach((suite) => {
        describe(`in ${suite.label} state`, () => {

            let style;
            let toggle;
            let width;
            let height;
            let context;

            beforeAll(async () => {
                style = setUp('src/components/selection/switch/switch', suite.states);

                // Remove box-shadow to help testing
                style += '.matter-switch > input + span::after { box-shadow: none !important; }';

                toggle = document.querySelector('#xmas');
                const rect = toggle.getBoundingClientRect();
                width = rect.width;
                height = rect.height;
                context = await capture3x(toggle, style, SPACING);
            });

            afterAll(() => {
                tearDown();
            });

            it('should have dominant transparent color', () => {
                const component = context.getImageData3x(0, 0, width, height);

                expect(component).toResembleColor(tp);
            });

            it('should have text', () => {
                const caption = context.getImageData3x(0, 0, width - 51, height);

                expect(toggle.innerText).toBe('Xmas Tree');
                expect(caption).toResembleText('Xmas Tree', suite.textColor, tp);
            });

            it('should have thumb', () => {
                // thumb
                const th = suite.thumbColor;

                // intermediate
                const im = {};

                const thumb = suite.checked
                    ? context.getImageData3x(width - 25, 2, 20, 20)
                    : context.getImageData3x(width - 41, 2, 20, 20);

                const slice = [
                    th, th, th, th, th, th, th, th, th, th,
                    th, th, th, th, th, th, th, th, th, th,
                    th, th, th, th, th, th, th, th, th, im,
                    im, im, im, im, im, im, im, im, im, im,
                    im, im, im
                ];

                expect(thumb).toResembleCircularShape(slice);
            });

            it('should have track', () => {
                // track
                const tr = suite.trackColor;

                // intermediate
                const im = {};

                const track = suite.checked
                    ? context.getImageData3x(width - 41, 5, 14, 14)
                    : context.getImageData3x(width - 19, 5, 14, 14);

                const slice = [
                    im, im, im, im, im, im, tr, tr, tr, tr,
                    tr, tr, tr, tr, tr, tr, tr, tr, tr, tr,
                    im, im, im, im, im, im, im, im, im, im,
                ];

                expect(track).toResembleCircularShape(slice, suite.checked ? 205 : 25, suite.checked ? 335 : 155);
            });

            it('should have a circular highlight representing state', () => {
                // highlight
                const hl = suite.highlightColor;

                // intermediate
                const im = {};

                const highlight = suite.checked
                    ? context.getImageData3x(width - 35, -8, 40, 40)
                    : context.getImageData3x(width - 51, -8, 40, 40);

                const slice = [
                    im, im, im, im, im, im, im, im, im, im,
                    im, im, im, im, im, im, im, im, im, im,
                    im, im, im, im, im, im, im, im, im, im,
                    im, im, hl, hl, hl, hl, hl, hl, hl, hl,
                    hl, hl, hl, hl, hl, hl, hl, hl, hl, hl,
                    hl, hl, hl, hl, hl, hl, hl, hl, hl, im,
                    im, im, tp, tp, tp, tp, tp, tp, tp, tp,
                    tp, tp, tp, tp, tp, tp, tp, tp, tp, tp,
                    tp, tp, tp, tp, tp
                ];

                expect(highlight).toResembleCircularShape(slice, suite.checked ? 310 : 130, suite.checked ? 230 : 50);
            });

        });
    });

    describe('in normal state', () => {

        beforeAll(() => {
            setUp('src/components/selection/switch/switch');
        });

        afterAll(() => {
            tearDown();
        });

        it('should have variable-width', () => {
            const { width } = document.querySelector('#sized').getBoundingClientRect();

            expect(width).toBe(200);
        });

    });

});
