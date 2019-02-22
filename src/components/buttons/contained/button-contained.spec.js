import { setUp, tearDown } from '../../../../test/helpers/fixture.js';
import { capture3x } from '../../../../test/helpers/capture.js';

const SPACING = 6;

const black = {
    r: 0,
    g: 0,
    b: 0
};

const shadow = (alphas) => {
    return alphas.map(alpha => ({...black, a: alpha}));
};

// shadows
const noShadow = new Array(18).fill({ a: 0 });
const sideShadow2 = shadow([0, 0, 0, 0, [0, 4], [0, 4], [0, 4], [0, 4], [0, 4], [0, 4], [4, 8], [4, 8], [4, 8], [8, 12], [12, 16], [16, 20], [20, 28], [24, 32]]);
const sideShadow4 = shadow([[0, 4], [0, 4], [0, 4], [0, 8], [0, 8], [4, 8], [4, 12], [4, 12], [4, 12], [8, 16], [8, 20], [12, 20], [12, 24], [16, 28], [20, 32], [24, 36], [28, 40], [32, 44]]);
const sideShadow8 = shadow([[8, 16], [8, 16], [8, 16], [12, 20], [12, 20], [12, 20], [16, 24], [16, 24], [20, 24], [20, 28], [20, 28], [24, 32], [24, 32], [24, 36], [28, 36], [28, 40], [32, 44], [32, 48]]);

describe('Contained Button', () => {

    [
        {
            label: 'normal',
            states: {},
            textColor: { r: 255, g: 255, b: 255, a: 255 },
            bodyColor: { r: 33, g: 150, b: 243, a: 255 },
            shadow: { side: sideShadow2 }
        },
        {
            label: 'hover',
            states: {
                '#xmas.matter-button-contained': [ 'hover' ]
            },
            textColor: { r: 255, g: 255, b: 255, a: 255 },
            bodyColor: { r: 50, g: 158, b: [243, 244], a: 255 },
            shadow: { side: sideShadow4 }
        },
        {
            label: 'focus',
            states: {
                '#xmas.matter-button-contained': [ 'focus' ]
            },
            textColor: { r: 255, g: 255, b: 255, a: 255 },
            bodyColor: { r: [85, 86], g: 175, b: [245, 246], a: 255 },
            shadow: { side: sideShadow4 }
        },
        {
            label: 'active',
            states: {
                '#xmas.matter-button-contained': [ 'active' ]
            },
            textColor: { r: 255, g: 255, b: 255, a: 255 },
            bodyColor: { r: 33, g: 150, b: 243, a: 255 },
            shadow: { side: sideShadow8 }
        },
        {
            label: 'hover & focus',
            states: {
                '#xmas.matter-button-contained': [ 'hover', 'focus' ]
            },
            textColor: { r: 255, g: 255, b: 255, a: 255 },
            bodyColor: { r: [99, 104], g: [181, 184], b: [246, 247], a: 255 },
            shadow: { side: sideShadow4 }
        },
        {
            label: 'hover & active',
            states: {
                '#xmas.matter-button-contained': [ 'hover', 'active' ]
            },
            textColor: { r: 255, g: 255, b: 255, a: 255 },
            bodyColor: { r: 50, g: 158, b: [243, 244], a: 255 },
            shadow: { side: sideShadow8 }
        },
        {
            label: 'focus & active',
            states: {
                '#xmas.matter-button-contained': [ 'focus', 'active' ]
            },
            textColor: { r: 255, g: 255, b: 255, a: 255 },
            bodyColor: { r: [85, 86], g: 175, b: [245, 246], a: 255 },
            shadow: { side: sideShadow8 }
        },
        {
            label: 'hover, focus & active',
            states: {
                '#xmas.matter-button-contained': [ 'hover', 'focus', 'active' ]
            },
            textColor: { r: 255, g: 255, b: 255, a: 255 },
            bodyColor: { r: [99, 104], g: [181, 184], b: [246, 247], a: 255 },
            shadow: { side: sideShadow8 }
        },
        {
            label: 'disabled',
            states: {
                '#xmas.matter-button-contained': [ 'disabled' ]
            },
            textColor: { r: 0, g: 0, b: 0, a: 116 },
            bodyColor: { r: 0, g: 0, b: 0, a: [30, 31] },
            shadow: { side: noShadow }
        },
        {
            label: 'customized',
            states: {
                '#xmas.matter-button-contained': {
                    style: '--matter-primary-rgb: 255, 0, 0;--matter-onprimary-rgb: 0, 0, 0;width: 120px'
                }
            },
            textColor: { r: 0, g: 0, b: 0, a: 255 },
            bodyColor: { r: 255, g: 0, b: 0, a: 255 },
            shadow: { side: sideShadow2 }
        }
    ].forEach((suite) => {

        describe(`in ${suite.label} state`, () => {

            let style;
            let button;
            let width;
            let height;
            let context;

            beforeAll(async () => {
                style = setUp('src/components/buttons/contained/button-contained', suite.states);

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

            it('should have uppercase caption text', () => {
                const caption = context.getImageData3x(4, 4, width - 8, height - 8);

                expect(button.innerText).toBe('XMAS TREE');
                expect(caption).toResembleText('XMAS TREE', suite.textColor, suite.bodyColor);
            });

            it(`should have 4px round corners`, () => {
                // shadow
                const sh = {a: [0, 98]};

                // intermediate
                const im = {};

                // body
                const bd = suite.bodyColor;

                const corner = [
                    [ sh, sh, sh, sh, sh, sh, sh, im, im, im, im, im],
                    [ sh, sh, sh, sh, sh, im, im, im, bd, bd, bd, bd],
                    [ sh, sh, sh, sh, im, im, bd, bd, bd, bd, bd, bd],
                    [ sh, sh, sh, im, im, bd, bd, bd, bd, bd, bd, bd],
                    [ sh, sh, im, im, bd, bd, bd, bd, bd, bd, bd, bd],
                    [ sh, im, im, bd, bd, bd, bd, bd, bd, bd, bd, bd],
                    [ sh, im, bd, bd, bd, bd, bd, bd, bd, bd, bd, bd],
                    [ im, im, bd, bd, bd, bd, bd, bd, bd, bd, bd, bd],
                    [ im, bd, bd, bd, bd, bd, bd, bd, bd, bd, bd, bd],
                    [ im, bd, bd, bd, bd, bd, bd, bd, bd, bd, bd, bd],
                    [ im, bd, bd, bd, bd, bd, bd, bd, bd, bd, bd, bd],
                    [ im, bd, bd, bd, bd, bd, bd, bd, bd, bd, bd, bd]
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

            it('should have no outline', () => {
                // body
                const bd = suite.bodyColor;

                const edge = [ bd, bd, bd, bd, bd, bd, bd, bd, bd, bd, bd, bd ];

                const top = context.getImageData3x(4, 0, width - 8, 4);
                const right = context.getImageData3x(width - 4, 4, 4, height - 8);
                const bottom = context.getImageData3x(4, height - 4, width - 8, 4);
                const left = context.getImageData3x(0, 4, 4, height - 8);

                expect(top).toResembleOblongShape(edge, 0);
                expect(right).toResembleOblongShape(edge, 90);
                expect(bottom).toResembleOblongShape(edge, 180);
                expect(left).toResembleOblongShape(edge, 270);
            });

            it('should have shadow', () => {
                const top = context.getImageData3x(SPACING, -SPACING, width - 2 * SPACING, SPACING);
                const right = context.getImageData3x(width, 12, SPACING, height - 24);
                const bottom = context.getImageData3x(0, height, width + SPACING, SPACING);
                const left = context.getImageData3x(-SPACING, 12, SPACING, height - 24);

                // expect(top).toResembleOblongShape(suite.shadow.top, 0);
                expect(right).toResembleOblongShape(suite.shadow.side, 90);
                // expect(bottom).toResembleOblongShape(suite.shadow.bottom, 180);
                expect(left).toResembleOblongShape(suite.shadow.side, 270);
            });

        });

    });

    describe('in normal state', () => {

        beforeAll(() => {
            setUp('src/components/buttons/contained/button-contained');
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
