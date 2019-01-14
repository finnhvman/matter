import { setUp, tearDown } from '../../../../test/helpers/fixture.js';
import { capture3x } from '../../../../test/helpers/capture.js';

const SPACING = 4;

// transparent
const tp = { a: 0 };

describe('Standard Textfield', () => {
    
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
            underlineColor: { r: 0, g: 0, b: 0, a: 153 }
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
            underlineColor: { r: 0, g: 0, b: 0, a: 222 }
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
            underlineWidth: 2,
            underlineColor: { r: 33, g: 150, b: 243, a: 255 },
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
            underlineColor: { r: 0, g: 0, b: 0, a: 153 },
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
            underlineWidth: 2,
            underlineColor: { r: 33, g: 150, b: 243, a: 255 },
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
            underlineColor: { r: 0, g: 0, b: 0, a: 222 }
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
            underlineWidth: 2,
            underlineColor: { r: 33, g: 150, b: 243, a: 255 },
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
            underlineWidth: 2,
            underlineColor: { r: 33, g: 150, b: 243, a: 255 },
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
            underlineColor: { r: 0, g: 0, b: 0, a: 97 }
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
            underlineColor: { r: 0, g: 0, b: 0, a: 97 }
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
            underlineWidth: 2,
            underlineColor: { r: 255, g: 0, b: 0, a: 255 },
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
            underlineColor: { r: [254, 255], g: [254, 255], b: [254, 255], a: 153 },
        }
    ].forEach((suite) => {

        describe(`in ${suite.label} state`, () => {

            let style;
            let textfield;
            let width;
            let height;
            let context;

            beforeAll(async () => {
                style = setUp('src/components/textfields/standard/textfield-standard', suite.states);

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
                    ? context.getImageData3x(0, 0, width, 24)
                    : context.getImageData3x(0, 24, width, height - 28);

                expect(textfield.querySelector('span').innerText).toBe('Xmas Tree');
                expect(label).toResembleText('Xmas Tree', suite.labelColor, suite.bodyColor);
            });

            it('should have text', () => {
                const text = suite.labelFloating
                    ? context.getImageData3x(0, 24, width, height - 28)
                    : context.getImageData3x(0, 0, 1, 1);

                const expected = suite.text;

                expect(textfield.querySelector('input').value).toBe(expected);
                expect(text).toResembleText(expected, suite.textColor, suite.bodyColor);
            });

            it(`should have no top corners and edgy bottom corners`, () => {
                // underline
                const ul = suite.underlineColor;

                const topCorner = new Array(12).fill(new Array(12).fill(tp));

                const bottomCorner = suite.underlineWidth === 2 ? [
                    [ tp, tp, tp, tp, tp, tp, tp, tp, tp, tp, tp, tp],
                    [ tp, tp, tp, tp, tp, tp, tp, tp, tp, tp, tp, tp],
                    [ tp, tp, tp, tp, tp, tp, tp, tp, tp, tp, tp, tp],
                    [ tp, tp, tp, tp, tp, tp, tp, tp, tp, tp, tp, tp],
                    [ tp, tp, tp, tp, tp, tp, tp, tp, tp, tp, tp, tp],
                    [ tp, tp, tp, tp, tp, tp, tp, tp, tp, tp, tp, tp],
                    [ ul, ul, ul, ul, ul, ul, ul, ul, ul, ul, ul, ul],
                    [ ul, ul, ul, ul, ul, ul, ul, ul, ul, ul, ul, ul],
                    [ ul, ul, ul, ul, ul, ul, ul, ul, ul, ul, ul, ul],
                    [ ul, ul, ul, ul, ul, ul, ul, ul, ul, ul, ul, ul],
                    [ ul, ul, ul, ul, ul, ul, ul, ul, ul, ul, ul, ul],
                    [ ul, ul, ul, ul, ul, ul, ul, ul, ul, ul, ul, ul]
                ] : [
                    [ tp, tp, tp, tp, tp, tp, tp, tp, tp, tp, tp, tp],
                    [ tp, tp, tp, tp, tp, tp, tp, tp, tp, tp, tp, tp],
                    [ tp, tp, tp, tp, tp, tp, tp, tp, tp, tp, tp, tp],
                    [ tp, tp, tp, tp, tp, tp, tp, tp, tp, tp, tp, tp],
                    [ tp, tp, tp, tp, tp, tp, tp, tp, tp, tp, tp, tp],
                    [ tp, tp, tp, tp, tp, tp, tp, tp, tp, tp, tp, tp],
                    [ tp, tp, tp, tp, tp, tp, tp, tp, tp, tp, tp, tp],
                    [ tp, tp, tp, tp, tp, tp, tp, tp, tp, tp, tp, tp],
                    [ tp, tp, tp, tp, tp, tp, tp, tp, tp, tp, tp, tp],
                    [ ul, ul, ul, ul, ul, ul, ul, ul, ul, ul, ul, ul],
                    [ ul, ul, ul, ul, ul, ul, ul, ul, ul, ul, ul, ul],
                    [ ul, ul, ul, ul, ul, ul, ul, ul, ul, ul, ul, ul]
                ];

                const topLeft = context.getImageData3x(0, 0, 4, 4);
                const topRight = context.getImageData3x(width - 4, 0, 4, 4);
                const bottomRight = context.getImageData3x(width - 4, height - 4, 4, 4);
                const bottomLeft = context.getImageData3x(0, height - 4, 4, 4);

                expect(topLeft).toResembleShape(topCorner, 0);
                expect(topRight).toResembleShape(topCorner, 0);
                expect(bottomRight).toResembleShape(bottomCorner, 0);
                expect(bottomLeft).toResembleShape(bottomCorner, 0);
            });

            it('should have underline', () => {
                // underline
                const ul = suite.underlineColor;

                const transparent = [ tp, tp, tp, tp, tp, tp, tp, tp, tp, tp, tp, tp ];

                const underline = suite.underlineWidth === 2
                    ? [ ul, ul, ul, ul, ul, ul, tp, tp, tp, tp, tp, tp ]
                    : [ ul, ul, ul, tp, tp, tp, tp, tp, tp, tp, tp, tp ];

                const top = context.getImageData3x(4, 0, width - 8, 4);
                const right = context.getImageData3x(width - 4, 4, 4, height - 8);
                const bottom = context.getImageData3x(4, height - 4, width - 8, 4);

                expect(top).toResembleOblongShape(transparent, 0);
                expect(right).toResembleOblongShape(transparent, 90);
                expect(bottom).toResembleOblongShape(underline, 180);
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

                style = setUp('src/components/textfields/standard/textfield-standard', states);

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
                    ? context.getImageData3x(0, 0, width, 24)
                    : context.getImageData3x(0, 24, width, 32);

                expect(textfield.querySelector('span').innerText).toBe('Xmas Tree');
                expect(label).toResembleText('Xmas Tree', suite.labelColor, suite.bodyColor);
            });

            it('should have text', () => {
                const text = suite.labelFloating
                    ? context.getImageData3x(0, 24, width, height - 28)
                    : context.getImageData3x(0, 0, 1, 1);

                const expected = suite.text;

                expect(textfield.querySelector('textarea').textContent).toBe(expected);
                expect(text).toResembleText(expected, suite.textColor, suite.bodyColor);
            });

            it(`should have no top corners and edgy bottom corners`, () => {
                // underline
                const ul = suite.underlineColor;

                const topCorner = new Array(12).fill(new Array(12).fill(tp));

                const bottomCorner = suite.underlineWidth === 2 ? [
                    [ tp, tp, tp, tp, tp, tp, tp, tp, tp, tp, tp, tp],
                    [ tp, tp, tp, tp, tp, tp, tp, tp, tp, tp, tp, tp],
                    [ tp, tp, tp, tp, tp, tp, tp, tp, tp, tp, tp, tp],
                    [ tp, tp, tp, tp, tp, tp, tp, tp, tp, tp, tp, tp],
                    [ tp, tp, tp, tp, tp, tp, tp, tp, tp, tp, tp, tp],
                    [ tp, tp, tp, tp, tp, tp, tp, tp, tp, tp, tp, tp],
                    [ ul, ul, ul, ul, ul, ul, ul, ul, ul, ul, ul, ul],
                    [ ul, ul, ul, ul, ul, ul, ul, ul, ul, ul, ul, ul],
                    [ ul, ul, ul, ul, ul, ul, ul, ul, ul, ul, ul, ul],
                    [ ul, ul, ul, ul, ul, ul, ul, ul, ul, ul, ul, ul],
                    [ ul, ul, ul, ul, ul, ul, ul, ul, ul, ul, ul, ul],
                    [ ul, ul, ul, ul, ul, ul, ul, ul, ul, ul, ul, ul]
                ] : [
                    [ tp, tp, tp, tp, tp, tp, tp, tp, tp, tp, tp, tp],
                    [ tp, tp, tp, tp, tp, tp, tp, tp, tp, tp, tp, tp],
                    [ tp, tp, tp, tp, tp, tp, tp, tp, tp, tp, tp, tp],
                    [ tp, tp, tp, tp, tp, tp, tp, tp, tp, tp, tp, tp],
                    [ tp, tp, tp, tp, tp, tp, tp, tp, tp, tp, tp, tp],
                    [ tp, tp, tp, tp, tp, tp, tp, tp, tp, tp, tp, tp],
                    [ tp, tp, tp, tp, tp, tp, tp, tp, tp, tp, tp, tp],
                    [ tp, tp, tp, tp, tp, tp, tp, tp, tp, tp, tp, tp],
                    [ tp, tp, tp, tp, tp, tp, tp, tp, tp, tp, tp, tp],
                    [ ul, ul, ul, ul, ul, ul, ul, ul, ul, ul, ul, ul],
                    [ ul, ul, ul, ul, ul, ul, ul, ul, ul, ul, ul, ul],
                    [ ul, ul, ul, ul, ul, ul, ul, ul, ul, ul, ul, ul]
                ];

                const topLeft = context.getImageData3x(0, 0, 4, 4);
                const topRight = context.getImageData3x(width - 4, 0, 4, 4);
                const bottomRight = context.getImageData3x(width - 4, height - 4, 4, 4);
                const bottomLeft = context.getImageData3x(0, height - 4, 4, 4);

                expect(topLeft).toResembleShape(topCorner, 0);
                expect(topRight).toResembleShape(topCorner, 0);
                expect(bottomRight).toResembleShape(bottomCorner, 0);
                expect(bottomLeft).toResembleShape(bottomCorner, 0);
            });

            it('should have underline', () => {
                // underline
                const ul = suite.underlineColor;

                const transparent = [ tp, tp, tp, tp, tp, tp, tp, tp, tp, tp, tp, tp ];

                const underline = suite.underlineWidth === 2
                    ? [ ul, ul, ul, ul, ul, ul, tp, tp, tp, tp, tp, tp ]
                    : [ ul, ul, ul, tp, tp, tp, tp, tp, tp, tp, tp, tp ];

                const top = context.getImageData3x(4, 0, width - 8, 4);
                const right = context.getImageData3x(width - 4, 4, 4, height - 8);
                const bottom = context.getImageData3x(4, height - 4, width - 16, 4);

                expect(top).toResembleOblongShape(transparent, 0);
                expect(right).toResembleOblongShape(transparent, 90);
                expect(bottom).toResembleOblongShape(underline, 180);
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
            setUp('src/components/textfields/standard/textfield-standard');
        });

        afterAll(() => {
            tearDown();
        });

        it('should have a height of 56px', () => {
            const { height } = document.querySelector('#normal').getBoundingClientRect();

            expect(height).toBe(56);
        });

        it('should have variable-width', () => {
            const { width } = document.querySelector('#sized').getBoundingClientRect();

            expect(width).toBe(240);
        });

    });

    describe('(textarea) in normal state', () => {

        beforeAll(() => {
            setUp('src/components/textfields/standard/textfield-standard');
        });

        afterAll(() => {
            tearDown();
        });

        it('should have variable-width and variable-height', () => {
            const { width, height } = document.querySelector('#ta-sized').getBoundingClientRect();

            expect(width).toBe(240);
            expect(height).toBe(90);
        });

    });

});
