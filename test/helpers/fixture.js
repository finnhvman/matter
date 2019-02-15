export const setUp = (spec, states = {}) => {
    const fixture = document.createElement('div');
    fixture.id = 'fixture';
    fixture.innerHTML = window.__html__[spec + '.spec.html'];

    // Set up states
    Object.entries(states).forEach(([ selector, attributes ]) => {
        const element = fixture.querySelector(selector);
        if (attributes instanceof Array) {
            attributes.forEach(attribute => element.setAttribute(attribute, ''));
        } else if (typeof attributes === 'object') {
            Object.entries(attributes).forEach(([ attribute, value ]) => {
                if (element.tagName === 'TEXTAREA' && attribute === 'value') {
                    element.textContent = value;
                } else {
                    element.setAttribute(attribute, value);
                }
            });
        }
    });

    document.body.appendChild(fixture);
    return getStyle(document.styleSheets, spec + '.css');
};

const getStyle = (styleSheets, href) => {
    const styleSheet = findStyleSheet(styleSheets, href);
    let style = '';
    if (styleSheet) {
        for (let index = 0; index < styleSheet.cssRules.length; index++) {
            style += isMediaQuery(styleSheet.cssRules[index]) ? '' : replacePseudos(styleSheet.cssRules[index].cssText);
        }
    }

    return style;
};

const findStyleSheet = (styleSheets, href) => {
    for (let index = 0; index < styleSheets.length; index++) {
        if (styleSheets[index].href.includes(href)) {
            return styleSheets[index];
        }
    }
    return null;
};

const isMediaQuery = (cssRule) => cssRule.type === 4;

const replacePseudos = (cssText) => {
    const regular = [ 'active', 'focus-within', 'focus', 'hover', 'indeterminate', 'placeholder-shown' ];
    return regular.reduce((css, pseudo) => css.replace(new RegExp(`:${pseudo}`, 'g'), `[${pseudo}]`), cssText);
};

export const tearDown = () => {
    const fixture = document.querySelector('#fixture');
    document.body.removeChild(fixture);
};
