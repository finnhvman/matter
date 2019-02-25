import { setUp, tearDown } from '../../../test/helpers/fixture.js';
import { capture3x } from '../../../test/helpers/capture.js';

const SPACING = 40;

// transparent
const tp = { a: 0 };

describe('Tooltip', () => {

    [
        {
            label: 'hover',
            states: {
                '#xmas': [ 'hover' ]
            },
            textColor: { r: 255, g: 255, b: 255, a: 255 },
            bodyColor: { r: [95, 96], g: [95, 96], b: [95, 96], a: 230}
        },
        {
            label: 'focus-within',
            states: {
                '#xmas': [ 'focus-within' ]
            },
            textColor: { r: 255, g: 255, b: 255, a: 255 },
            bodyColor: { r: [95, 96], g: [95, 96], b: [95, 96], a: 230}
        },
        {
            label: 'hover & focus-within',
            states: {
                '#xmas': [ 'hover', 'focus-within' ]
            },
            textColor: { r: 255, g: 255, b: 255, a: 255 },
            bodyColor: { r: [95, 96], g: [95, 96], b: [95, 96], a: 230}
        },
        {
            label: 'customized & hover',
            states: {
                '#xmas': {
                    style: '--matter-surface-rgb: 0, 0, 0;--matter-onsurface-rgb: 255, 255, 255;position: relative;width: 120px;height: 20px;',
                    hover: ''
                }
            },
            textColor: { r: [0, 15], g: [0, 15], b: [0, 15], a: 255 },
            bodyColor: { r: [157, 160], g: [157, 160], b: [157, 160], a: 230}
        }
    ].forEach((suite) => {

        describe(`in ${suite.label} state`, () => {

            let style;
            let tooltipParent;
            let width;
            let height;
            let context;

            beforeAll(async () => {
                style = setUp('src/components/tooltips/tooltip', suite.states);

                /* Snapping to exact pixels, and resetting sticky for Chrome */
                style += '.matter-tooltip > span, .matter-tooltip-top > span {min-width: 56px; position: relative;}';

                tooltipParent = document.querySelector('#xmas');
                width = 72;
                height = 24;
                context = await capture3x(tooltipParent, style, SPACING);
            });

            afterAll(() => {
                tearDown();
            });

            it(`should have dominant ${JSON.stringify(suite.bodyColor).replace(/"/g, '')} color`, () => {
                const component = context.getImageData3x(24, 28, width, height);

                expect(component).toResembleColor(suite.bodyColor);
            });

            it('should have caption text', () => {
                const caption = context.getImageData3x(28, 32, width - 8, height - 8);
                const tooltip = document.querySelector('#xmas > .matter-tooltip');

                expect(tooltip.innerText).toBe('Small Help');
                expect(caption).toResembleText('Small Help', suite.textColor, suite.bodyColor);
            });

            it(`should have 4px round corners`, () => {
                // intermediate
                const im = {
                    a: [ 0, typeof suite.bodyColor.a === 'number' ? suite.bodyColor.a : suite.bodyColor.a[1] ]
                };

                // body
                const bd = suite.bodyColor;

                const corner = [
                    [ tp, tp, tp, tp, tp, tp, tp, im, im, im, im, im],
                    [ tp, tp, tp, tp, tp, im, im, im, bd, bd, bd, bd],
                    [ tp, tp, tp, tp, im, im, bd, bd, bd, bd, bd, bd],
                    [ tp, tp, tp, im, im, bd, bd, bd, bd, bd, bd, bd],
                    [ tp, tp, im, im, bd, bd, bd, bd, bd, bd, bd, bd],
                    [ tp, im, im, bd, bd, bd, bd, bd, bd, bd, bd, bd],
                    [ tp, im, bd, bd, bd, bd, bd, bd, bd, bd, bd, bd],
                    [ im, im, bd, bd, bd, bd, bd, bd, bd, bd, bd, bd],
                    [ im, bd, bd, bd, bd, bd, bd, bd, bd, bd, bd, bd],
                    [ im, bd, bd, bd, bd, bd, bd, bd, bd, bd, bd, bd],
                    [ im, bd, bd, bd, bd, bd, bd, bd, bd, bd, bd, bd],
                    [ im, bd, bd, bd, bd, bd, bd, bd, bd, bd, bd, bd]
                ];

                const topLeft = context.getImageData3x(24, 28, 4, 4);
                const topRight = context.getImageData3x(20 + width, 28, 4, 4);
                const bottomRight = context.getImageData3x(20 + width, 24 + height, 4, 4);
                const bottomLeft = context.getImageData3x(24, 24 + height, 4, 4);

                expect(topLeft).toResembleShape(corner, 0);
                expect(topRight).toResembleShape(corner, 90);
                expect(bottomRight).toResembleShape(corner, 180);
                expect(bottomLeft).toResembleShape(corner, 270);
            });

            it('should have no outline', () => {
                // body
                const bd = suite.bodyColor;

                const edge = [ bd, bd, bd, bd, bd, bd, bd, bd, bd, bd, bd, bd ];

                const top = context.getImageData3x(28, 28, width - 8, 4);
                const right = context.getImageData3x(20 + width, 32, 4, height - 8);
                const bottom = context.getImageData3x(28, 24 + height, width - 8, 4);
                const left = context.getImageData3x(24, 32, 4, height - 8);

                expect(top).toResembleOblongShape(edge, 0);
                expect(right).toResembleOblongShape(edge, 90);
                expect(bottom).toResembleOblongShape(edge, 180);
                expect(left).toResembleOblongShape(edge, 270);
            });

            it('should have no shadow', () => {
                const shadow = [ tp, tp, tp, tp, tp, tp, tp, tp, tp, tp, tp, tp ];

                const topShadow = context.getImageData3x(24, 24, width, 4);
                const rightShadow = context.getImageData3x(24 + width, 28, 4, height);
                const bottomShadow = context.getImageData3x(24, 28 + height, width, 4);
                const leftShadow = context.getImageData3x(20, 28, 4, height);

                expect(topShadow).toResembleOblongShape(shadow, 0);
                expect(rightShadow).toResembleOblongShape(shadow, 90);
                expect(bottomShadow).toResembleOblongShape(shadow, 180);
                expect(leftShadow).toResembleOblongShape(shadow, 270);
            });

        });

    });

    describe('in normal state', () => {

        let style;
        let tooltipParent;
        let width;
        let height;
        let context;

        beforeAll(async () => {
            style = setUp('src/components/tooltips/tooltip');

            /* Snapping to exact pixels, and resetting sticky for Chrome */
            style += '.matter-tooltip > span, .matter-tooltip-top > span {min-width: 56px; position: relative;}';

            tooltipParent = document.querySelector('#xmas');
            width = 72;
            height = 24;
            context = await capture3x(tooltipParent, style, SPACING);
        });

        afterAll(() => {
            tearDown();
        });

        it('should be hidden (have dominant transparent color)', () => {
            const component = context.getImageData3x(24, 28, width, height);

            expect(component).toResembleColor(tp);
        });

    });

    describe('top variant in hover state', () => {

        let style;
        let tooltipParent;
        let width;
        let height;
        let context;

        beforeAll(async () => {
            style = setUp('src/components/tooltips/tooltip', { '#top': [ 'hover' ] });

            /* Snapping to exact pixels, and resetting sticky for Chrome */
            style += '.matter-tooltip > span, .matter-tooltip-top > span {min-width: 56px; position: relative;}';

            tooltipParent = document.querySelector('#top');
            width = 72;
            height = 24;
            context = await capture3x(tooltipParent, style, SPACING);
        });

        afterAll(() => {
            tearDown();
        });

        it('should have dominant { r: [95, 96], g: [95, 96], b: [95, 96], a: 230} color', () => {
            const component = context.getImageData3x(24, -40, width, height);

            expect(component).toResembleColor( { r: [95, 96], g: [95, 96], b: [95, 96], a: 230});
        });

    });

});
