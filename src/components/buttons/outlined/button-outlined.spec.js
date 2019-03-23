import { setUp, tearDown } from '../../../../test/helpers/fixture.js';
import { capture3x } from '../../../../test/helpers/capture.js';

const SPACING = 4;

// transparent
const tp = { a: 0 };

describe('Outlined Button', () => {

    [
        {
            label: 'normal',
            states: {},
            textColor: { r: 33, g: 150, b: 243, a: 255 },
            bodyColor: { a: 0 },
            outlineColor: { r: 0, g: 0, b: 0, a: [60, 61] }
        },
        {
            label: 'hover',
            states: {
                '#xmas.matter-button-outlined': [ 'hover' ]
            },
            textColor: { r: 33, g: 150, b: 243, a: 255 },
            bodyColor: { r: [25, 26], g: 153, b: 255, a: 10 },
            outlineColor: { r: 0, g: 0, b: 0, a: [60, 61] }
        },
        {
            label: 'focus',
            states: {
                '#xmas.matter-button-outlined': [ 'focus' ]
            },
            textColor: { r: 33, g: 150, b: 243, a: 255 },
            bodyColor: { r: [26, 34], g: [148, 153], b: [246, 247], a: [30, 31] },
            outlineColor: { r: 0, g: 0, b: 0, a: [60, 61] }
        },
        {
            label: 'active',
            states: {
                '#xmas.matter-button-outlined': [ 'active' ]
            },
            textColor: { r: 33, g: 150, b: 243, a: 255 },
            bodyColor: { a: 0 },
            outlineColor: { r: 0, g: 0, b: 0, a: 61 }
        },
        {
            label: 'hover & focus',
            states: {
                '#xmas.matter-button-outlined': [ 'hover', 'focus' ]
            },
            textColor: { r: 33, g: 150, b: 243, a: 255 },
            bodyColor: { r: [31, 32], g: [149, 153], b: [242, 243], a: [40, 41] },
            outlineColor: { r: 0, g: 0, b: 0, a: [60, 61] }
        },
        {
            label: 'hover & active',
            states: {
                '#xmas.matter-button-outlined': [ 'hover', 'active' ]
            },
            textColor: { r: 33, g: 150, b: 243, a: 255 },
            bodyColor: { r: [25, 26], g: 153, b: 255, a: 10 },
            outlineColor: { r: 0, g: 0, b: 0, a: [60, 61] }
        },
        {
            label: 'focus & active',
            states: {
                '#xmas.matter-button-outlined': [ 'focus', 'active' ]
            },
            textColor: { r: 33, g: 150, b: 243, a: 255 },
            bodyColor: { r: [26, 34], g: [148, 153], b: [246, 247], a: [30, 31] },
            outlineColor: { r: 0, g: 0, b: 0, a: [60, 61] }
        },
        {
            label: 'hover, focus & active',
            states: {
                '#xmas.matter-button-outlined': [ 'hover', 'focus', 'active' ]
            },
            textColor: { r: 33, g: 150, b: 243, a: 255 },
            bodyColor: { r: [31, 32], g: [149, 153], b: [242, 243], a: [40, 41] },
            outlineColor: { r: 0, g: 0, b: 0, a: [60, 61] }
        },
        {
            label: 'disabled',
            states: {
                '#xmas.matter-button-outlined': [ 'disabled' ]
            },
            textColor: { r: 0, g: 0, b: 0, a: 97 },
            bodyColor: { a: 0 },
            outlineColor: { r: 0, g: 0, b: 0, a: [60, 61] }
        },
        {
            label: 'customized',
            states: {
                '#xmas.matter-button-outlined': {
                    style: '--matter-primary-rgb: 255, 0, 0;--matter-onsurface-rgb: 255, 255, 255;width: 120px'
                }
            },
            textColor: { r: 255, g: 0, b: 0, a: 255 },
            bodyColor: { a: 0 },
            outlineColor: { r: 255, g: 255, b: 255, a: [60, 61] }
        }
    ].forEach((suite) => {

        describe(`in ${suite.label} state`, () => {

            let style;
            let button;
            let width;
            let height;
            let context;

            beforeAll(async () => {
                style = setUp('src/components/buttons/outlined/button-outlined', suite.states);

                button = document.querySelector('#xmas');
                const rect = button.getBoundingClientRect();
                width = rect.width;
                height = rect.height;
                context = await capture3x(button, style, SPACING);
            });

            afterAll(() => {
                tearDown();
            });

            it(`should have dominant ${JSON.stringify(suite.bodyColor).replace(/"/g, '')} color`, () => {
                const component = context.getImageData3x(0, 0, width, height);

                expect(component).toResembleColor(suite.bodyColor);
            });

            it('should have caption text', () => {
                const caption = context.getImageData3x(4, 4, width - 8, height - 8);

                expect(button.innerText).toBe('XMAS TREE');
                expect(caption).toResembleText('XMAS TREE', suite.textColor, suite.bodyColor);
            });

            it(`should have 4px round outlined corners`, () => {
                // intermediate
                const im = { a: [ 0, 61 ] };
                // outline
                const ol = suite.outlineColor;

                // body
                const bd = suite.bodyColor;

                const corner = [
                    [ tp, tp, tp, tp, tp, tp, tp, im, im, im, im, im],
                    [ tp, tp, tp, tp, tp, im, im, im, ol, ol, ol, ol],
                    [ tp, tp, tp, tp, im, im, ol, ol, ol, ol, ol, ol],
                    [ tp, tp, tp, im, im, ol, ol, ol, im, im, im, im],
                    [ tp, tp, im, im, ol, ol, im, im, im, bd, bd, bd],
                    [ tp, im, im, ol, ol, im, im, bd, bd, bd, bd, bd],
                    [ tp, im, ol, ol, im, im, bd, bd, bd, bd, bd, bd],
                    [ im, im, ol, ol, im, bd, bd, bd, bd, bd, bd, bd],
                    [ im, ol, ol, im, im, bd, bd, bd, bd, bd, bd, bd],
                    [ im, ol, ol, im, bd, bd, bd, bd, bd, bd, bd, bd],
                    [ im, ol, ol, im, bd, bd, bd, bd, bd, bd, bd, bd],
                    [ im, ol, ol, im, bd, bd, bd, bd, bd, bd, bd, bd]
                ];

                const topLeft = context.getImageData3x(0, 0, 4, 4);
                const topRight = context.getImageData3x(width - 4, 0, 4, 4);
                const bottomRight = context.getImageData3x(width - 4, height - 4, 4, 4);
                const bottomLeft = context.getImageData3x(0, height - 4, 4, 4);

                expect(topLeft).toResembleShape(corner, 0);
                expect(topRight).toResembleShape(corner, 90);
                expect(bottomRight).toResembleShape(corner, 180);
                expect(bottomLeft).toResembleShape(corner, 270);
            });

            it('should have 1px outline', () => {
                // outline
                const ol = suite.outlineColor;

                // body
                const bd = suite.bodyColor;

                const edge = [ ol, ol, ol, bd, bd, bd, bd, bd, bd, bd, bd, bd ];

                const top = context.getImageData3x(4, 0, width - 8, 4);
                const right = context.getImageData3x(width - 4, 4, 4, height - 8);
                const bottom = context.getImageData3x(4, height - 4, width - 8, 4);
                const left = context.getImageData3x(0, 4, 4, height - 8);

                expect(top).toResembleOblongShape(edge, 0);
                expect(right).toResembleOblongShape(edge, 90);
                expect(bottom).toResembleOblongShape(edge, 180);
                expect(left).toResembleOblongShape(edge, 270);
            });

            it('should have no shadow', () => {
                const shadow = [ tp, tp, tp, tp, tp, tp, tp, tp, tp, tp, tp, tp ];

                const topShadow = context.getImageData3x(-SPACING, -SPACING, width + SPACING, SPACING);
                const rightShadow = context.getImageData3x(width, -SPACING, SPACING, height + SPACING);
                const bottomShadow = context.getImageData3x(0, height, width + SPACING, SPACING);
                const leftShadow = context.getImageData3x(-SPACING, 0, SPACING, height + SPACING);

                expect(topShadow).toResembleOblongShape(shadow, 0);
                expect(rightShadow).toResembleOblongShape(shadow, 90);
                expect(bottomShadow).toResembleOblongShape(shadow, 180);
                expect(leftShadow).toResembleOblongShape(shadow, 270);
            });

        });

    });

    describe('in normal state', () => {

        beforeAll(() => {
            setUp('src/components/buttons/outlined/button-outlined');
        });

        afterAll(() => {
            tearDown();
        });

        it('should have a height of 36px', () => {
            const { height } = document.querySelector('#normal').getBoundingClientRect();

            expect(height).toBe(36);
        });

        it('should have a minimum width of 64px', () => {
            const { width } = document.querySelector('#min').getBoundingClientRect();

            expect(width).toBe(64);
        });

        it('should have variable-width', () => {
            const { width } = document.querySelector('#sized').getBoundingClientRect();

            expect(width).toBe(120);
        });

    });

});
