import { setUp, tearDown } from '../../../../test/helpers/fixture.js';
import { capture3x } from '../../../../test/helpers/capture.js';

const SPACING = 10;

// transparent
const tp = { a: 0 };

describe('Radio', () => {

    [
        {
            label: 'normal',
            states: {},
            textColor: { r: 0, g: 0, b: 0, a: 222},
            radioColor: { r: 0, g: 0, b: 0, a: 153 },
            highlightColor: tp
        },
        {
            label: 'hover',
            states: {
                '#xmas': [ 'hover' ]
            },
            textColor: { r: 0, g: 0, b: 0, a: 222},
            radioColor: { r: 0, g: 0, b: 0, a: 157 },
            highlightColor: { r: 0, g: 0, b: 0, a: 10 }
        },
        {
            label: 'focus',
            states: {
                '#xmas > input': [ 'focus' ]
            },
            textColor: { r: 0, g: 0, b: 0, a: 222},
            radioColor: { r: 0, g: 0, b: 0, a: 165 },
            highlightColor: { r: 0, g: 0, b: 0, a: [30, 31] }
        },
        {
            label: 'focus & active',
            states: {
                '#xmas': [ 'active' ],
                '#xmas > input': [ 'focus' ]
            },
            textColor: { r: 0, g: 0, b: 0, a: 222},
            radioColor: { r: 33, g: 150, b: 243, a: 255 },
            highlightColor: tp
        },
        {
            label: 'checked',
            states: {
                '#xmas > input': [ 'checked' ]
            },
            checked: true,
            textColor: { r: 0, g: 0, b: 0, a: 222},
            radioColor: { r: 33, g: 150, b: 243, a: 255 },
            highlightColor: tp
        },
        {
            label: 'hover & focus',
            states: {
                '#xmas': [ 'hover' ],
                '#xmas > input': [ 'focus' ]
            },
            textColor: { r: 0, g: 0, b: 0, a: 222},
            radioColor: { r: 0, g: 0, b: 0, a: 169 },
            highlightColor: { r: 0, g: 0, b: 0, a: [40, 41] }
        },
        {
            label: 'hover, focus & active',
            states: {
                '#xmas': [ 'active', 'hover' ],
                '#xmas > input': [ 'focus' ]
            },
            textColor: { r: 0, g: 0, b: 0, a: 222 },
            radioColor: { r: 33, g: 150, b: 243, a: 255 },
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
            radioColor: { r: 33, g: 150, b: 243, a: 255 },
            highlightColor: { r: [25, 26], g: 153, b: 255, a: 10 }
        },
        {
            label: 'focus & checked',
            states: {
                '#xmas > input': [ 'checked', 'focus' ]
            },
            checked: true,
            textColor: { r: 0, g: 0, b: 0, a: 222},
            radioColor: { r: 33, g: 150, b: 243, a: 255 },
            highlightColor: { r: [26, 33], g: [148, 153], b: [246, 247], a: [30, 31] }
        },
        {
            label: 'focus, active & checked',
            states: {
                '#xmas': [ 'active' ],
                '#xmas > input': [ 'focus', 'checked' ]
            },
            checked: true,
            textColor: { r: 0, g: 0, b: 0, a: 222},
            radioColor: { r: 33, g: 150, b: 243, a: 255 },
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
            radioColor: { r: 33, g: 150, b: 243, a: 255 },
            highlightColor: { r: [31, 32], g: [149, 153], b: [242, 243], a: [ 40, 41] },
        },
        {
            label: 'hover, focus, active & checked',
            states: {
                '#xmas': [ 'active', 'hover' ],
                '#xmas > input': [ 'checked', 'focus' ]
            },
            checked: true,
            textColor: { r: 0, g: 0, b: 0, a: 222},
            radioColor: { r: 33, g: 150, b: 243, a: 255 },
            highlightColor: tp
        },
        {
            label: 'disabled',
            states: {
                '#xmas > input': [ 'disabled' ]
            },
            textColor: { r: 0, g: 0, b: 0, a: 97},
            radioColor: { r: 0, g: 0, b: 0, a: 97},
            highlightColor: tp
        },
        {
            label: 'disabled & checked',
            states: {
                '#xmas > input': [ 'checked', 'disabled' ]
            },
            checked: true,
            textColor: { r: 0, g: 0, b: 0, a: 97},
            radioColor: { r: 0, g: 0, b: 0, a: 97},
            highlightColor: tp
        },
        {
            label: 'customized',
            states: {
                '#xmas': {
                    style: '--matter-primary-rgb: 255, 0, 0;--matter-onsurface-rgb: 255, 255, 255;'
                }
            },
            textColor: { r: 255, g: 255, b: 255, a: 222},
            radioColor: { r: [254, 255], g: [254, 255], b: [254, 255], a: 153 },
            highlightColor: tp
        },
        {
            label: 'customized & checked',
            states: {
                '#xmas': {
                    style: '--matter-primary-rgb: 255, 0, 0;--matter-onsurface-rgb: 255, 255, 255;'
                },
                '#xmas > input': [ 'checked' ]
            },
            checked: true,
            textColor: { r: 255, g: 255, b: 255, a: 222},
            radioColor: { r: 255, g: 0, b: 0, a: 255 },
            highlightColor: tp
        }
    ].forEach((suite) => {

        describe(`in ${suite.label} state`, () => {

            let style;
            let radio;
            let width;
            let height;
            let context;

            beforeAll(async () => {
                style = setUp('src/components/selection/radio/radio', suite.states);

                radio = document.querySelector('#xmas');
                const rect = radio.getBoundingClientRect();
                width = rect.width;
                height = rect.height;
                context = await capture3x(radio, style, SPACING);
            });

            afterAll(() => {
                tearDown();
            });

            it('should have dominant transparent color', () => {
                const component = context.getImageData3x(0, 0, width, height);

                expect(component).toResembleColor(tp);
            });

            it('should have text', () => {
                const caption = context.getImageData3x(30, 0, width - 30, height);

                expect(radio.innerText).toBe('Xmas Tree');
                expect(caption).toResembleText('Xmas Tree', suite.textColor, tp);
            });

            it('should have a circular indicator representing state', () => {
                // radio
                const rd = suite.radioColor;

                // highlight
                const hl = suite.highlightColor;

                // check
                const ch = suite.checked ? rd : hl;

                // intermediate
                const im = { a: [ 0, rd.a ] };

                const slice = [
                    ch, ch, ch, ch, ch, ch, ch, ch, ch, ch,
                    ch, ch, ch, ch, im, im, im, hl, hl, hl,
                    hl, hl, hl, im, im, im, rd, rd, rd, im,
                    im, im, hl, hl, hl, hl, hl, hl, hl, hl,
                    hl, hl, hl, hl, hl, hl, hl, hl, hl, hl,
                    hl, hl, hl, hl, hl, hl, hl, hl, hl, im,
                    im, im, tp, tp, tp, tp, tp, tp, tp, tp,
                    tp, tp, tp, tp, tp, tp, tp, tp, tp, tp,
                    tp, tp, tp, tp, tp
                ];

                const indicator = context.getImageData3x(-10, -8, 40, 40);

                expect(indicator).toResembleCircularShape(slice);
            });

        });

    });

});
