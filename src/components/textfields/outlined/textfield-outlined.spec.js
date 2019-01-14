import { setUp, tearDown } from '../../../../test/helpers/fixture.js';
import { capture3x } from '../../../../test/helpers/capture.js';
import { isBrowserNot } from '../../../../test/helpers/browser.js';

const SPACING = 4;

// transparent
const tp = { a: 0 };

describe('Outlined Textfield', () => {
    
    [
        {
            label: 'normal',
            states: {
                '#xmas > input': [ 'placeholder-shown' ]
            },
            bodyColor: { a: 0 },
            labelColor: { r: 0, g: 0, b: 0, a: 153 },
            labelFloating: false,
            text: '',
            textColor: { r: 0, g: 0, b: 0, a: 222 },
            outlineColor: { r: 0, g: 0, b: 0, a: 153 }
        },
        {
            label: 'hover',
            states: {
                '#xmas': [ 'hover' ],
                '#xmas > input': [ 'placeholder-shown' ]
            },
            bodyColor: { a: 0 },
            labelColor: { r: 0, g: 0, b: 0, a: 153 },
            labelFloating: false,
            text: '',
            textColor: { r: 0, g: 0, b: 0, a: 222 },
            outlineColor: { r: 0, g: 0, b: 0, a: 222 }
        },
        {
            label: 'focus',
            states: {
                '#xmas > input': [ 'focus' ]
            },
            bodyColor: { a: 0 },
            labelColor: { r: 33, g: 150, b: 243, a: 255 },
            labelFloating: true,
            text: '',
            textColor: { r: 0, g: 0, b: 0, a: 222 },
            outlineWidth: 2,
            outlineColor: { r: 33, g: 150, b: 243, a: 255 },
        },
        {
            label: 'nonempty',
            states: {
                '#xmas > input': {
                    value: 'Ornaments & a Cat'
                }
            },
            bodyColor: { a: 0 },
            labelColor: { r: 0, g: 0, b: 0, a: 153 },
            labelFloating: true,
            text: 'Ornaments & a Cat',
            textColor: { r: 0, g: 0, b: 0, a: 222 },
            outlineColor: { r: 0, g: 0, b: 0, a: 153 },
        },
        {
            label: 'hover & focus',
            states: {
                '#xmas': [ 'hover' ],
                '#xmas > input': [ 'focus' ]
            },
            bodyColor: { a: 0 },
            labelColor: { r: 33, g: 150, b: 243, a: 255 },
            labelFloating: true,
            text: '',
            textColor: { r: 0, g: 0, b: 0, a: 222 },
            outlineWidth: 2,
            outlineColor: { r: 33, g: 150, b: 243, a: 255 },
        },
        {
            label: 'hover & nonempty',
            states: {
                '#xmas': [ 'hover' ],
                '#xmas > input': {
                    value: 'Ornaments & a Cat'
                }
            },
            bodyColor: { a: 0 },
            labelColor: { r: 0, g: 0, b: 0, a: 153 },
            labelFloating: true,
            text: 'Ornaments & a Cat',
            textColor: { r: 0, g: 0, b: 0, a: 222 },
            outlineColor: { r: 0, g: 0, b: 0, a: 222 }
        },
        {
            label: 'focus & nonempty',
            states: {
                '#xmas > input': {
                    focus: '',
                    value: 'Ornaments & a Cat'
                }
            },
            bodyColor: { a: 0 },
            labelColor: { r: 33, g: 150, b: 243, a: 255 },
            labelFloating: true,
            text: 'Ornaments & a Cat',
            textColor: { r: 0, g: 0, b: 0, a: 222 },
            outlineWidth: 2,
            outlineColor: { r: 33, g: 150, b: 243, a: 255 },
        },
        {
            label: 'hover, focus & nonempty',
            states: {
                '#xmas': [ 'hover' ],
                '#xmas > input': {
                    focus: '',
                    value: 'Ornaments & a Cat'
                }
            },
            bodyColor: { a: 0 },
            labelColor: { r: 33, g: 150, b: 243, a: 255 },
            labelFloating: true,
            text: 'Ornaments & a Cat',
            textColor: { r: 0, g: 0, b: 0, a: 222 },
            outlineWidth: 2,
            outlineColor: { r: 33, g: 150, b: 243, a: 255 },
        },
        {
            label: 'disabled',
            states: {
                '#xmas > input': [ 'disabled', 'placeholder-shown' ]
            },
            bodyColor: { a: 0 },
            labelColor: { r: 0, g: 0, b: 0, a: 97 },
            labelFloating: false,
            text: '',
            textColor: { r: 0, g: 0, b: 0, a: 97 },
            outlineColor: { r: 0, g: 0, b: 0, a: 97 }
        },
        {
            label: 'disabled & nonempty',
            states: {
                '#xmas > input':  {
                    disabled: '',
                    value: 'Ornaments & a Cat'
                }
            },
            bodyColor: { a: 0 },
            labelColor: { r: 0, g: 0, b: 0, a: 97 },
            labelFloating: true,
            text: 'Ornaments & a Cat',
            textColor: { r: 0, g: 0, b: 0, a: 97 },
            outlineColor: { r: 0, g: 0, b: 0, a: 97 }
        },
        {
            label: 'customized & focus',
            states: {
                '#xmas': {
                    style: '--matter-primary-rgb: 255, 0, 0;--matter-onsurface-rgb: 255, 255, 255;width: 240px;'
                },
                '#xmas > input': [ 'focus' ]
            },
            bodyColor: { a: 0 },
            labelColor: { r: 255, g: 0, b: 0, a: 255 },
            labelFloating: true,
            text: '',
            textColor: { r: 0, g: 0, b: 0, a: 222 },
            outlineWidth: 2,
            outlineColor: { r: 255, g: 0, b: 0, a: 255 }
        },
        {
            label: 'customized & nonempty',
            states: {
                '#xmas': {
                    style: '--matter-primary-rgb: 255, 0, 0;--matter-onsurface-rgb: 255, 255, 255;width: 240px;'
                },
                '#xmas > input': {
                    value: 'Ornaments & a Cat'
                }
            },
            bodyColor: { a: 0 },
            labelColor: { r: 255, g: 255, b: 255, a: 153 },
            labelFloating: true,
            text: 'Ornaments & a Cat',
            textColor: { r: 255, g: 255, b: 255, a: 222 },
            outlineColor: { r: [254, 255], g: [254, 255], b: [254, 255], a: 153 },
        }
    ].forEach((suite) => {

        describe(`in ${suite.label} state`, () => {

            let style;
            let textfield;
            let width;
            let height;
            let context;

            beforeAll(async () => {
                style = setUp('src/components/textfields/outlined/textfield-outlined', suite.states);

                textfield = document.querySelector('#xmas');
                const rect = textfield.getBoundingClientRect();
                width = rect.width;
                height = rect.height;
                context = await capture3x(textfield, style, SPACING);
            });

            afterAll(() => {
                tearDown();
            });

            it(`should have dominant ${JSON.stringify(suite.bodyColor).replace(/"/g, '')} color`, () => {
                const component = context.getImageData3x(0, 0, width, height);

                expect(component).toResembleColor(suite.bodyColor);
            });

            it('should have label', () => {
                const label = suite.labelFloating
                    ? context.getImageData3x(12, 0, 58, 24)
                    : context.getImageData3x(4, 24, width - 8, height - 28);

                expect(textfield.querySelector('span').innerText).toBe('Xmas Tree');
                expect(label).toResembleText('Xmas Tree', suite.labelColor, suite.bodyColor);
            });

            it('should have text', () => {
                const text = suite.labelFloating
                    ? context.getImageData3x(4, 24, width - 8, height - 28)
                    : context.getImageData3x(0, 0, 1, 1);

                const expected = suite.text;

                expect(textfield.querySelector('input').value).toBe(expected);
                expect(text).toResembleText(expected, suite.textColor, suite.bodyColor);
            });

            it('should have 4px round outlined corners', () => {
                // Border and box-shadow at the corners aren't perfect, so (mainly the alpha) tolerance is pretty large
                const { r, g, b, a } = suite.outlineColor;
                const CT = 5;
                const AT = 50;
                // outline
                const ol = {
                    r: Array.isArray(r) ? [ r[0] - CT, r[1] + CT ] : [ r - CT, r + CT ],
                    g: Array.isArray(g) ? [ g[0] - CT, g[1] + CT ] : [ g - CT, g + CT ],
                    b: Array.isArray(b) ? [ b[0] - CT, b[1] + CT ] : [ b - CT, b + CT ],
                    a: Array.isArray(a) ? [ a[0] - AT, a[1] + AT ] : [ a - AT, a + AT ]
                };

                // intermediate
                const im = { a: [ 0, a + AT ] };

                const corner = suite.outlineWidth === 2 ? [
                    [ tp, tp, tp, tp, tp, tp, tp, im, im, im, im, im],
                    [ tp, tp, tp, tp, tp, im, im, im, ol, ol, ol, ol],
                    [ tp, tp, tp, tp, im, im, ol, ol, ol, ol, ol, ol],
                    [ tp, tp, tp, im, im, ol, ol, ol, ol, ol, ol, ol],
                    [ tp, tp, im, im, im, ol, ol, ol, ol, ol, ol, ol],
                    [ tp, im, im, ol, ol, im, ol, ol, ol, ol, ol, ol],
                    [ tp, im, ol, ol, ol, ol, ol, ol, im, im, im, im],
                    [ im, im, ol, ol, ol, ol, ol, im, tp, tp, tp, tp],
                    [ im, ol, ol, ol, ol, ol, im, tp, tp, tp, tp, tp],
                    [ im, ol, ol, ol, ol, ol, im, tp, tp, tp, tp, tp],
                    [ im, ol, ol, ol, ol, ol, im, tp, tp, tp, tp, tp],
                    [ im, ol, ol, ol, ol, ol, im, tp, tp, tp, tp, tp]
                ] : [
                    [ tp, tp, tp, tp, tp, tp, tp, im, im, im, im, im],
                    [ tp, tp, tp, tp, tp, im, im, im, ol, ol, ol, ol],
                    [ tp, tp, tp, tp, im, im, ol, ol, ol, ol, ol, ol],
                    [ tp, tp, tp, im, im, ol, ol, ol, im, im, im, im],
                    [ tp, tp, im, im, im, ol, im, im, im, tp, tp, tp],
                    [ tp, im, im, ol, ol, im, im, tp, tp, tp, tp, tp],
                    [ tp, im, ol, ol, im, im, tp, tp, tp, tp, tp, tp],
                    [ im, im, ol, ol, im, tp, tp, tp, tp, tp, tp, tp],
                    [ im, ol, ol, im, im, tp, tp, tp, tp, tp, tp, tp],
                    [ im, ol, ol, im, tp, tp, tp, tp, tp, tp, tp, tp],
                    [ im, ol, ol, im, tp, tp, tp, tp, tp, tp, tp, tp],
                    [ im, ol, ol, im, tp, tp, tp, tp, tp, tp, tp, tp]
                ];

                const topLeft = context.getImageData3x(0, 6, 4, 4);
                const topRight = context.getImageData3x(width - 4, 6, 4, 4);
                const bottomRight = context.getImageData3x(width - 4, height - 4, 4, 4);
                const bottomLeft = context.getImageData3x(0, height - 4, 4, 4);

                isBrowserNot('Safari') && expect(topLeft).toResembleShape(corner, 0);
                isBrowserNot('Safari') && expect(topRight).toResembleShape(corner, 90);
                isBrowserNot('Safari') && expect(bottomRight).toResembleShape(corner, 180);
                isBrowserNot('Safari') && expect(bottomLeft).toResembleShape(corner, 270);
            });

            it('should have outline', () => {
                // outline
                const ol = suite.outlineColor;

                // body
                const bd = suite.bodyColor;

                const edge = suite.outlineWidth === 2
                    ? [ ol, ol, ol, ol, ol, ol, bd, bd, bd, bd, bd, bd ]
                    : [ ol, ol, ol, bd, bd, bd, bd, bd, bd, bd, bd, bd ];

                const top = suite.labelFloating
                    ? context.getImageData3x(80, 6, width - 84, 4)
                    : context.getImageData3x(5, 6, width - 10, 4);
                const right = context.getImageData3x(width - 4, 11, 4, height - 16);
                const bottom = context.getImageData3x(5, height - 4, width - 10, 4);
                const left = context.getImageData3x(0, 11, 4, height - 16);

                isBrowserNot('Safari') && expect(top).toResembleOblongShape(edge, 0);
                expect(right).toResembleOblongShape(edge, 90);
                isBrowserNot('Safari') && expect(bottom).toResembleOblongShape(edge, 180);
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

        describe(`(textarea) in ${suite.label} state`, () => {

            let style;
            let textfield;
            let width;
            let height;
            let context;

            beforeAll(async () => {
                // Select textarea
                const states = Object.entries(suite.states).reduce((object, [ key, value ]) => {
                    const newKey = key.replace(/#xmas/g, '#ta-xmas').replace(/input/g, 'textarea');
                    object[newKey] = value;
                    if (key === '#xmas') {
                        object[newKey].style = object[newKey].style + 'height: 90px;';
                    }
                    return object;
                }, {});

                style = setUp('src/components/textfields/outlined/textfield-outlined', states);

                textfield = document.querySelector('#ta-xmas');
                const rect = textfield.getBoundingClientRect();
                width = rect.width;
                height = rect.height;
                context = await capture3x(textfield, style, SPACING);
            });

            afterAll(() => {
                tearDown();
            });

            it(`should have dominant ${JSON.stringify(suite.bodyColor).replace(/"/g, '')} color`, () => {
                const component = context.getImageData3x(0, 0, width, height);

                expect(component).toResembleColor(suite.bodyColor);
            });

            it('should have label', () => {
                const label = suite.labelFloating
                    ? context.getImageData3x(12, 0, 58, 24)
                    : context.getImageData3x(4, 24, width - 8, height - 28);

                expect(textfield.querySelector('span').innerText).toBe('Xmas Tree');
                expect(label).toResembleText('Xmas Tree', suite.labelColor, suite.bodyColor);
            });

            it('should have text', () => {
                const text = suite.labelFloating
                    ? context.getImageData3x(4, 24, width - 8, height - 28)
                    : context.getImageData3x(0, 0, 1, 1);

                const expected = suite.text;

                expect(textfield.querySelector('textarea').textContent).toBe(expected);
                expect(text).toResembleText(expected, suite.textColor, suite.bodyColor);
            });

            it('should have 4px round outlined corners', () => {
                // Border and box-shadow at the corners aren't perfect, so (mainly the alpha) tolerance is pretty large
                const { r, g, b, a } = suite.outlineColor;
                const CT = 5;
                const AT = 50;
                // outline
                const ol = {
                    r: Array.isArray(r) ? [ r[0] - CT, r[1] + CT ] : [ r - CT, r + CT ],
                    g: Array.isArray(g) ? [ g[0] - CT, g[1] + CT ] : [ g - CT, g + CT ],
                    b: Array.isArray(b) ? [ b[0] - CT, b[1] + CT ] : [ b - CT, b + CT ],
                    a: Array.isArray(a) ? [ a[0] - AT, a[1] + AT ] : [ a - AT, a + AT ]
                };

                // intermediate
                const im = { a: [ 0, a + AT ] };

                const corner = suite.outlineWidth === 2 ? [
                    [ tp, tp, tp, tp, tp, tp, tp, im, im, im, im, im],
                    [ tp, tp, tp, tp, tp, im, im, im, ol, ol, ol, ol],
                    [ tp, tp, tp, tp, im, im, ol, ol, ol, ol, ol, ol],
                    [ tp, tp, tp, im, im, ol, ol, ol, ol, ol, ol, ol],
                    [ tp, tp, im, im, im, ol, ol, ol, ol, ol, ol, ol],
                    [ tp, im, im, ol, ol, im, ol, ol, ol, ol, ol, ol],
                    [ tp, im, ol, ol, ol, ol, ol, ol, im, im, im, im],
                    [ im, im, ol, ol, ol, ol, ol, im, tp, tp, tp, tp],
                    [ im, ol, ol, ol, ol, ol, im, tp, tp, tp, tp, tp],
                    [ im, ol, ol, ol, ol, ol, im, tp, tp, tp, tp, tp],
                    [ im, ol, ol, ol, ol, ol, im, tp, tp, tp, tp, tp],
                    [ im, ol, ol, ol, ol, ol, im, tp, tp, tp, tp, tp]
                ] : [
                    [ tp, tp, tp, tp, tp, tp, tp, im, im, im, im, im],
                    [ tp, tp, tp, tp, tp, im, im, im, ol, ol, ol, ol],
                    [ tp, tp, tp, tp, im, im, ol, ol, ol, ol, ol, ol],
                    [ tp, tp, tp, im, im, ol, ol, ol, im, im, im, im],
                    [ tp, tp, im, im, im, ol, im, im, im, tp, tp, tp],
                    [ tp, im, im, ol, ol, im, im, tp, tp, tp, tp, tp],
                    [ tp, im, ol, ol, im, im, tp, tp, tp, tp, tp, tp],
                    [ im, im, ol, ol, im, tp, tp, tp, tp, tp, tp, tp],
                    [ im, ol, ol, im, im, tp, tp, tp, tp, tp, tp, tp],
                    [ im, ol, ol, im, tp, tp, tp, tp, tp, tp, tp, tp],
                    [ im, ol, ol, im, tp, tp, tp, tp, tp, tp, tp, tp],
                    [ im, ol, ol, im, tp, tp, tp, tp, tp, tp, tp, tp]
                ];

                const topLeft = context.getImageData3x(0, 6, 4, 4);
                const topRight = context.getImageData3x(width - 4, 6, 4, 4);
                const bottomRight = context.getImageData3x(width - 4, height - 4, 4, 4);
                const bottomLeft = context.getImageData3x(0, height - 4, 4, 4);

                isBrowserNot('Safari') && expect(topLeft).toResembleShape(corner, 0);
                isBrowserNot('Safari') && expect(topRight).toResembleShape(corner, 90);
                isBrowserNot('Safari') && expect(bottomRight).toResembleShape(corner, 180);
                isBrowserNot('Safari') && expect(bottomLeft).toResembleShape(corner, 270);
            });

            it('should have outline', () => {
                // outline
                const ol = suite.outlineColor;

                // body
                const bd = suite.bodyColor;

                const edge = suite.outlineWidth === 2
                    ? [ ol, ol, ol, ol, ol, ol, bd, bd, bd, bd, bd, bd ]
                    : [ ol, ol, ol, bd, bd, bd, bd, bd, bd, bd, bd, bd ];

                const top = suite.labelFloating
                    ? context.getImageData3x(80, 6, width - 84, 4)
                    : context.getImageData3x(5, 6, width - 10, 4);
                const right = context.getImageData3x(width - 4, 11, 4, height - 16);
                const bottom = context.getImageData3x(5, height - 4, width - 10, 4);
                const left = context.getImageData3x(0, 11, 4, height - 16);

                isBrowserNot('Safari') && expect(top).toResembleOblongShape(edge, 0);
                expect(right).toResembleOblongShape(edge, 90);
                isBrowserNot('Safari') && expect(bottom).toResembleOblongShape(edge, 180);
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
            setUp('src/components/textfields/outlined/textfield-outlined');
        });

        afterAll(() => {
            tearDown();
        });

        it('should have a height of 56px', () => {
            const { height } = document.querySelector('#normal').getBoundingClientRect();

            expect(height).toBe(62);
        });

        it('should have variable-width', () => {
            const { width } = document.querySelector('#sized').getBoundingClientRect();

            expect(width).toBe(240);
        });

    });

    describe('(textarea) in normal state', () => {

        beforeAll(() => {
            setUp('src/components/textfields/outlined/textfield-outlined');
        });

        afterAll(() => {
            tearDown();
        });

        it('should have variable-width and variable-height', () => {
            const { width, height } = document.querySelector('#ta-sized').getBoundingClientRect();

            expect(width).toBe(240);
            expect(height).toBe(96);
        });

    });

});
