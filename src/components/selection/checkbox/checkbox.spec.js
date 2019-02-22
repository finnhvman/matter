import { setUp, tearDown } from '../../../../test/helpers/fixture.js';
import { capture3x } from '../../../../test/helpers/capture.js';

const SPACING = 10;

// transparent
const tp = { a: 0 };

describe('Checkbox', () => {

    [
        {
            label: 'normal',
            states: {},
            textColor: { r: 0, g: 0, b: 0, a: 222},
            boxColor: { r: 0, g: 0, b: 0, a: 153 },
            highlightColor: tp
        },
        {
            label: 'hover',
            states: {
                '#xmas': [ 'hover' ]
            },
            textColor: { r: 0, g: 0, b: 0, a: 222},
            boxColor: { r: 0, g: 0, b: 0, a: 157 },
            highlightColor: { r: 0, g: 0, b: 0, a: 10 }
        },
        {
            label: 'focus',
            states: {
                '#xmas > input': [ 'focus' ]
            },
            textColor: { r: 0, g: 0, b: 0, a: 222},
            boxColor: { r: 0, g: 0, b: 0, a: 165 },
            highlightColor: { r: 0, g: 0, b: 0, a: [30, 31] }
        },
        {
            label: 'focus & active',
            states: {
                '#xmas': [ 'active' ],
                '#xmas > input': [ 'focus' ]
            },
            textColor: { r: 0, g: 0, b: 0, a: 222},
            boxColor: { r: 33, g: 150, b: 243, a: 255 },
            highlightColor: tp
        },
        {
            label: 'checked',
            states: {
                '#xmas > input': [ 'checked' ]
            },
            checked: true,
            checkColor: { r: 255, g: 255, b: 255, a: 255 },
            textColor: { r: 0, g: 0, b: 0, a: 222},
            boxColor: { r: 33, g: 150, b: 243, a: 255 },
            highlightColor: tp
        },
        {
            label: 'indeterminate',
            states: {
                '#xmas > input': [ 'indeterminate' ]
            },
            indeterminate: true,
            checkColor: { r: 255, g: 255, b: 255, a: 255 },
            textColor: { r: 0, g: 0, b: 0, a: 222},
            boxColor: { r: 33, g: 150, b: 243, a: 255 },
            highlightColor: tp
        },
        {
            label: 'hover & focus',
            states: {
                '#xmas': [ 'hover' ],
                '#xmas > input': [ 'focus' ]
            },
            textColor: { r: 0, g: 0, b: 0, a: 222},
            boxColor: { r: 0, g: 0, b: 0, a: 169 },
            highlightColor: { r: 0, g: 0, b: 0, a: [40, 41] }
        },
        {
            label: 'hover, focus & active',
            states: {
                '#xmas': [ 'active', 'hover' ],
                '#xmas > input': [ 'focus' ]
            },
            textColor: { r: 0, g: 0, b: 0, a: 222 },
            boxColor: { r: 33, g: 150, b: 243, a: 255 },
            highlightColor: tp
        },
        {
            label: 'hover & checked',
            states: {
                '#xmas': [ 'hover' ],
                '#xmas > input': [ 'checked' ]
            },
            checked: true,
            checkColor: { r: 255, g: 255, b: 255, a: 255 },
            textColor: { r: 0, g: 0, b: 0, a: 222},
            boxColor: { r: 33, g: 150, b: 243, a: 255 },
            highlightColor: { r: [25, 26], g: 153, b: 255, a: 10 }
        },
        {
            label: 'hover & indeterminate',
            states: {
                '#xmas': [ 'hover' ],
                '#xmas > input': [ 'indeterminate' ]
            },
            indeterminate: true,
            checkColor: { r: 255, g: 255, b: 255, a: 255 },
            textColor: { r: 0, g: 0, b: 0, a: 222},
            boxColor: { r: 33, g: 150, b: 243, a: 255 },
            highlightColor: { r: [25, 26], g: 153, b: 255, a: 10 }
        },
        {
            label: 'focus & checked',
            states: {
                '#xmas > input': [ 'checked', 'focus' ]
            },
            checked: true,
            checkColor: { r: 255, g: 255, b: 255, a: 255 },
            textColor: { r: 0, g: 0, b: 0, a: 222},
            boxColor: { r: 33, g: 150, b: 243, a: 255 },
            highlightColor: { r: [26, 33], g: [148, 153], b: [246, 247], a: [30, 31] }
        },
        {
            label: 'focus & indeterminate',
            states: {
                '#xmas > input': [ 'indeterminate', 'focus' ]
            },
            indeterminate: true,
            checkColor: { r: 255, g: 255, b: 255, a: 255 },
            textColor: { r: 0, g: 0, b: 0, a: 222},
            boxColor: { r: 33, g: 150, b: 243, a: 255 },
            highlightColor: { r: [26, 33], g: [148, 153], b: [246, 247], a: [30, 31] }
        },
        {
            label: 'focus, active & checked',
            states: {
                '#xmas': [ 'active' ],
                '#xmas > input': [ 'focus', 'checked' ]
            },
            checked: true,
            checkColor: { r: 255, g: 255, b: 255, a: 255 },
            textColor: { r: 0, g: 0, b: 0, a: 222},
            boxColor: { r: 0, g: 0, b: 0, a: [149, 153] },
            highlightColor: tp
        },
        {
            label: 'focus, active & indeterminate',
            states: {
                '#xmas': [ 'active' ],
                '#xmas > input': [ 'focus', 'indeterminate' ]
            },
            indeterminate: true,
            checkColor: { r: 255, g: 255, b: 255, a: 255 },
            textColor: { r: 0, g: 0, b: 0, a: 222},
            boxColor: { r: 33, g: 150, b: 243, a: 255 },
            highlightColor: tp
        },
        {
            label: 'hover, focus & checked',
            states: {
                '#xmas': [ 'hover' ],
                '#xmas > input': [ 'checked', 'focus' ]
            },
            checked: true,
            checkColor: { r: 255, g: 255, b: 255, a: 255 },
            textColor: { r: 0, g: 0, b: 0, a: 222},
            boxColor: { r: 33, g: 150, b: 243, a: 255 },
            highlightColor: { r: [31, 32], g: [149, 153], b: [242, 243], a: [ 40, 41] },
        },
        {
            label: 'hover, focus & indeterminate',
            states: {
                '#xmas': [ 'hover' ],
                '#xmas > input': [ 'indeterminate', 'focus' ]
            },
            indeterminate: true,
            checkColor: { r: 255, g: 255, b: 255, a: 255 },
            textColor: { r: 0, g: 0, b: 0, a: 222},
            boxColor: { r: 33, g: 150, b: 243, a: 255 },
            highlightColor: { r: [31, 32], g: [149, 153], b: [242, 243], a: [ 40, 41] },
        },
        {
            label: 'hover, focus, active & checked',
            states: {
                '#xmas': [ 'active', 'hover' ],
                '#xmas > input': [ 'checked', 'focus' ]
            },
            checked: true,
            checkColor: { r: 255, g: 255, b: 255, a: 255 },
            textColor: { r: 0, g: 0, b: 0, a: 222},
            boxColor: { r: 0, g: 0, b: 0, a: [149, 153] },
            highlightColor: tp
        },
        {
            label: 'hover, focus, active & indeterminate',
            states: {
                '#xmas': [ 'active', 'hover' ],
                '#xmas > input': [ 'indeterminate', 'focus' ]
            },
            indeterminate: true,
            checkColor: { r: 255, g: 255, b: 255, a: 255 },
            textColor: { r: 0, g: 0, b: 0, a: 222},
            boxColor: { r: 33, g: 150, b: 243, a: 255 },
            highlightColor: tp
        },
        {
            label: 'disabled',
            states: {
                '#xmas > input': [ 'disabled' ]
            },
            textColor: { r: 0, g: 0, b: 0, a: 97},
            boxColor: { r: 0, g: 0, b: 0, a: 97},
            highlightColor: tp
        },
        {
            label: 'disabled & checked',
            states: {
                '#xmas > input': [ 'checked', 'disabled' ]
            },
            checked: true,
            checkColor: { r: 255, g: 255, b: 255, a: 255 },
            textColor: { r: 0, g: 0, b: 0, a: 97},
            boxColor: { r: 0, g: 0, b: 0, a: [94, 97]},
            highlightColor: tp
        },
        {
            label: 'disabled & indeterminate',
            states: {
                '#xmas > input': [ 'indeterminate', 'disabled' ]
            },
            indeterminate: true,
            checkColor: { r: 255, g: 255, b: 255, a: 255 },
            textColor: { r: 0, g: 0, b: 0, a: 97},
            boxColor: { r: 0, g: 0, b: 0, a: [94, 97]},
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
            boxColor: { r: [254, 255], g: [254, 255], b: [254, 255], a: 153 },
            highlightColor: tp
        },
        {
            label: 'customized & checked',
            states: {
                '#xmas': {
                    style: '--matter-primary-rgb: 255, 0, 0;--matter-onsurface-rgb: 255, 255, 255;--matter-onprimary-rgb: 0, 0, 0;'
                },
                '#xmas > input': [ 'checked' ]
            },
            checked: true,
            checkColor: { r: 0, g: 0, b: 0, a: 255 },
            textColor: { r: 255, g: 255, b: 255, a: 222},
            boxColor: { r: 255, g: 0, b: 0, a: 255 },
            highlightColor: tp
        },
        {
            label: 'customized & indeterminate',
            states: {
                '#xmas': {
                    style: '--matter-primary-rgb: 255, 0, 0;--matter-onsurface-rgb: 255, 255, 255;--matter-onprimary-rgb: 0, 0, 0;'
                },
                '#xmas > input': [ 'indeterminate' ]
            },
            indeterminate: true,
            checkColor: { r: 0, g: 0, b: 0, a: 255 },
            textColor: { r: 255, g: 255, b: 255, a: 222},
            boxColor: { r: 255, g: 0, b: 0, a: 255 },
            highlightColor: tp
        }
    ].forEach((suite) => {

        describe(`in ${suite.label} state`, () => {

            let style;
            let checkbox;
            let width;
            let height;
            let context;

            beforeAll(async () => {
                style = setUp('src/components/selection/checkbox/checkbox', suite.states);

                checkbox = document.querySelector('#xmas');
                const rect = checkbox.getBoundingClientRect();
                width = rect.width;
                height = rect.height;
                context = await capture3x(checkbox, style, SPACING);
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

                expect(checkbox.innerText).toBe('Xmas Tree');
                expect(caption).toResembleText('Xmas Tree', suite.textColor, tp);
            });

            it('should have a box indicator representing state', () => {
                // box
                const bx = suite.boxColor;
                
                // check
                const ch = suite.checkColor;

                // highlight
                const hl = suite.highlightColor;

                // intermediate
                const im = { a: [ typeof bx.a === 'number' ? bx.a : bx.a[0], 255 ] };

                const indicator = suite.checked ? [
                    [bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx],
                    [bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx],
                    [bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx],
                    [bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx],
                    [bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx],
                    [bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx],
                    [bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,im,bx,bx,bx,bx,bx],
                    [bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,im,im,im,bx,bx,bx,bx],
                    [bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,im,im,ch,im,im,bx,bx,bx],
                    [bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,im,im,ch,ch,ch,im,im,bx,bx],
                    [bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,im,im,ch,ch,ch,ch,ch,im,im,bx],
                    [bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,im,im,ch,ch,ch,ch,ch,ch,ch,im,im],
                    [bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,im,im,ch,ch,ch,ch,ch,ch,ch,im,im,bx],
                    [bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,im,im,ch,ch,ch,ch,ch,ch,ch,im,im,bx,bx],
                    [bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,im,im,ch,ch,ch,ch,ch,ch,ch,im,im,bx,bx,bx],
                    [bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,im,im,ch,ch,ch,ch,ch,ch,ch,im,im,bx,bx,bx,bx],
                    [bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,im,im,ch,ch,ch,ch,ch,ch,ch,im,im,bx,bx,bx,bx,bx],
                    [bx,bx,bx,bx,im,im,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,im,im,ch,ch,ch,ch,ch,ch,ch,im,im,bx,bx,bx,bx,bx,bx],
                    [bx,bx,bx,im,im,im,im,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,im,im,ch,ch,ch,ch,ch,ch,ch,im,im,bx,bx,bx,bx,bx,bx,bx],
                    [bx,bx,im,im,ch,ch,im,im,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,im,im,ch,ch,ch,ch,ch,ch,ch,im,im,bx,bx,bx,bx,bx,bx,bx,bx],
                    [bx,im,im,ch,ch,ch,ch,im,im,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,im,im,ch,ch,ch,ch,ch,ch,ch,im,im,bx,bx,bx,bx,bx,bx,bx,bx,bx],
                    [im,im,ch,ch,ch,ch,ch,ch,im,im,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,im,im,ch,ch,ch,ch,ch,ch,ch,im,im,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx],
                    [bx,im,im,ch,ch,ch,ch,ch,ch,im,im,bx,bx,bx,bx,bx,bx,bx,bx,bx,im,im,ch,ch,ch,ch,ch,ch,ch,im,im,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx],
                    [bx,bx,im,im,ch,ch,ch,ch,ch,ch,im,im,bx,bx,bx,bx,bx,bx,bx,im,im,ch,ch,ch,ch,ch,ch,ch,im,im,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx],
                    [bx,bx,bx,im,im,ch,ch,ch,ch,ch,ch,im,im,bx,bx,bx,bx,bx,im,im,ch,ch,ch,ch,ch,ch,ch,im,im,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx],
                    [bx,bx,bx,bx,im,im,ch,ch,ch,ch,ch,ch,im,im,bx,bx,bx,im,im,ch,ch,ch,ch,ch,ch,ch,im,im,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx],
                    [bx,bx,bx,bx,bx,im,im,ch,ch,ch,ch,ch,ch,im,im,bx,im,im,ch,ch,ch,ch,ch,ch,ch,im,im,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx],
                    [bx,bx,bx,bx,bx,bx,im,im,ch,ch,ch,ch,ch,ch,im,im,im,ch,ch,ch,ch,ch,ch,ch,im,im,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx],
                    [bx,bx,bx,bx,bx,bx,bx,im,im,ch,ch,ch,ch,ch,im,im,im,ch,ch,ch,ch,ch,ch,im,im,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx],
                    [bx,bx,bx,bx,bx,bx,bx,bx,im,im,ch,ch,ch,im,im,ch,im,im,ch,ch,ch,ch,im,im,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx],
                    [bx,bx,bx,bx,bx,bx,bx,bx,bx,im,im,ch,im,im,ch,ch,ch,im,im,ch,ch,im,im,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx],
                    [bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,im,im,im,ch,ch,ch,ch,ch,im,im,im,im,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx],
                    [bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,im,im,ch,ch,ch,ch,ch,ch,ch,im,im,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx],
                    [bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,im,im,ch,ch,ch,ch,ch,im,im,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx],
                    [bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,im,im,ch,ch,ch,im,im,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx],
                    [bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,im,im,ch,im,im,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx],
                    [bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,im,im,im,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx],
                    [bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx],
                    [bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx],
                    [bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx],
                    [bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx],
                    [bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx,bx],
                ] : suite.indeterminate ? [
                    ...(new Array(18).fill(new Array(42).fill(bx))),
                    [bx,bx,bx,bx,bx,bx,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,bx,bx,bx,bx,bx,bx],
                    [bx,bx,bx,bx,bx,bx,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,bx,bx,bx,bx,bx,bx],
                    [bx,bx,bx,bx,bx,bx,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,bx,bx,bx,bx,bx,bx],
                    [bx,bx,bx,bx,bx,bx,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,bx,bx,bx,bx,bx,bx],
                    [bx,bx,bx,bx,bx,bx,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,bx,bx,bx,bx,bx,bx],
                    [bx,bx,bx,bx,bx,bx,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,ch,bx,bx,bx,bx,bx,bx],
                    ...(new Array(18).fill(new Array(42).fill(bx))),
                ] : new Array(42).fill(new Array(42).fill(hl));

                const shape = context.getImageData3x(3, 5, 14, 14);

                expect(shape).toResembleShape(indicator, 0);
            });

            it(`should have 2px round corners on box indicator`, () => {
                // box
                const bx = suite.boxColor;
                // highlight
                const hl = suite.highlightColor;
                // intermediate
                const im = { a: [0, typeof bx.a === 'number' ? bx.a : bx.a[1] ] };

                const corner = [
                    [ hl, hl, im, im, im, im ],
                    [ hl, im, im, bx, bx, bx ],
                    [ im, im, bx, bx, bx, bx ],
                    [ im, bx, bx, bx, bx, bx ],
                    [ im, bx, bx, bx, bx, bx ],
                    [ im, bx, bx, bx, bx, bx ],
                ];

                const topLeft = context.getImageData3x(1, 3, 2, 2);
                const topRight = context.getImageData3x(17, 3, 2, 2);
                const bottomRight = context.getImageData3x(17, 19, 2, 2);
                const bottomLeft = context.getImageData3x(1, 19, 2, 2);

                expect(topLeft).toResembleShape(corner, 0);
                expect(topRight).toResembleShape(corner, 90);
                expect(bottomRight).toResembleShape(corner, 180);
                expect(bottomLeft).toResembleShape(corner, 270);
            });

            it('should have 2px border on box indicator', () => {
                // box
                const bx = suite.boxColor;

                const edge = [ bx, bx, bx, bx, bx, bx ];

                const top = context.getImageData3x(3, 3, 14, 2);
                const right = context.getImageData3x(17, 5, 2, 14);
                const bottom = context.getImageData3x(3, 19, 14, 2);
                const left = context.getImageData3x(1, 5, 2, 14);

                expect(top).toResembleOblongShape(edge, 0);
                expect(right).toResembleOblongShape(edge, 90);
                expect(bottom).toResembleOblongShape(edge, 180);
                expect(left).toResembleOblongShape(edge, 270);
            });

            it('should have a circular highlight representing state', () => {
                // highlight
                const hl = suite.highlightColor;

                // intermediate
                const im = { a: [ 0, typeof hl.a === 'number' ? hl.a : hl.a[1] ] };

                const slice = [
                    {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
                    {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
                    {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
                    {}, {}, {}, {}, {}, {}, {}, hl, hl, hl,
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
