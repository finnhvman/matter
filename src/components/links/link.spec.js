import { setUp, tearDown } from '../../../test/helpers/fixture.js';
import { capture3x } from '../../../test/helpers/capture.js';
import { isBrowser, isBrowserNot } from '../../../test/helpers/browser.js';

const SPACING = 4;

// transparent
const tp = { a: 0 };

describe('Link', () => {

    [
        {
            label: 'normal',
            states: {},
            textColor: { r: 33, g: 150, b: 243, a: 255 },
            bodyColor: tp
        },
        {
            label: 'hover',
            states: {
                '#xmas.matter-link': [ 'hover' ]
            },
            textColor: { r: 33, g: 150, b: 243, a: 255 },
            bodyColor: tp,
            underline: true
        },
        {
            label: 'focus',
            states: {
                '#xmas.matter-link': [ 'focus' ]
            },
            textColor: { r: 33, g: 150, b: 243, a: 255 },
            bodyColor: { r: [17, 41], g: [136, 162], b: [237, 255], a: [28, 34] }
        },
        {
            label: 'active',
            states: {
                '#xmas.matter-link': [ 'active' ]
            },
            textColor: { r: 33, g: 150, b: 243, a: 255 },
            bodyColor: tp,
        },
        {
            label: 'hover & focus',
            states: {
                '#xmas.matter-link': [ 'hover', 'focus' ]
            },
            textColor: { r: 33, g: 150, b: 243, a: 255 },
            bodyColor: { r: [17, 41], g: [136, 162], b: [237, 255], a: [28, 34] },
            underline: true
        },
        {
            label: 'hover & active',
            states: {
                '#xmas.matter-link': [ 'hover', 'active' ]
            },
            textColor: { r: 33, g: 150, b: 243, a: 255 },
            bodyColor: tp,
            underline: true
        },
        {
            label: 'focus & active',
            states: {
                '#xmas.matter-link': [ 'focus', 'active' ]
            },
            textColor: { r: 33, g: 150, b: 243, a: 255 },
            bodyColor: tp
        },
        {
            label: 'hover, focus & active',
            states: {
                '#xmas.matter-link': [ 'hover', 'focus', 'active' ]
            },
            textColor: { r: 33, g: 150, b: 243, a: 255 },
            bodyColor: tp,
            underline: true
        },
        {
            label: 'customized',
            states: {
                '#xmas.matter-link': {
                    style: '--matter-primary-rgb: 255, 0, 0;display: inline-block; width: 80px; font-family: "Roboto", "Segoe UI", BlinkMacSystemFont, system-ui, -apple-system; font-size: 16px;'
                }
            },
            textColor: { r: 255, g: 0, b: 0, a: 255 },
            bodyColor: tp
        },
        {
            label: 'customized & focus',
            states: {
                '#xmas.matter-link': {
                    style: '--matter-primary-rgb: 255, 0, 0;display: inline-block; width: 80px; font-family: "Roboto", "Segoe UI", BlinkMacSystemFont, system-ui, -apple-system; font-size: 16px;',
                    focus: ''
                }
            },
            textColor: { r: 255, g: 0, b: 0, a: 255 },
            bodyColor: { r: [254, 255], g: 0, b: 0, a: [28, 34] },
        }
    ].forEach((suite) => {

        describe(`in ${suite.label} state`, () => {

            let style;
            let link;
            let width;
            let height;
            let context;

            beforeAll(async () => {
                style = setUp('src/components/links/link', suite.states);

                link = document.querySelector('#xmas');
                const rect = link.getBoundingClientRect();
                width = rect.width;
                height = rect.height;
                context = await capture3x(link, style, SPACING);
            });

            afterAll(() => {
                tearDown();
            });

            it(`should have dominant ${JSON.stringify(suite.bodyColor).replace(/"/g, '')} color`, () => {
                const component = context.getImageData3x(-4, -4, width + 8, height + 8);

                expect(component).toResembleColor(suite.bodyColor);
            });

            it('should have caption text', () => {
                const caption = context.getImageData3x(0, 1, width, 15);

                expect(link.innerText).toBe('Xmas Tree');
                expect(caption).toResembleText('Xmas Tree', suite.textColor, suite.bodyColor);
            });

            it(`should${suite.underline ? '' : ' not'} have underline`, () => {
                const underline = context.getImageData3x(0, 16, width, 1);
                const underlineFF = context.getImageData3x(0, 18, width, 1);

                isBrowserNot('Firefox') && expect(underline).toResembleColor(suite.underline ? suite.textColor : suite.bodyColor);
                isBrowser('Firefox') && expect(underlineFF).toResembleColor(suite.underline ? suite.textColor : suite.bodyColor);
            });

        });

    });

});
