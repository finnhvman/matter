const fs = require('fs');
const atImport = require('postcss-import');
const cssnano = require('cssnano');
const postcss = require('postcss');
const { version } = require('../package.json');

const source = '@import "./matter.css";';

const tag = (css, modifier) => {
    const mod = modifier ? `(${modifier}) ` : '';
    return `/* Matter ${version} ${mod}*/\n${css}`;
};

console.log('Dist Started...');

(async () => {
    try {
        // matter.css
        const normal = await postcss([atImport]).process(source, {
            from: './src/source.css',
            to: './dist/matter.css'
        });

        const tagged = tag(normal.css);
        fs.writeFileSync('./dist/matter.css', tagged);

        // matter.min.css
        const min = await postcss([atImport, cssnano]).process(source, {
            from: './src/source.css',
            to: './dist/matter.min.css'
        });

        const taggedMin = tag(min.css, 'min');
        fs.writeFileSync('./dist/matter.min.css', taggedMin);

        console.log('Dist Finished!');
    } catch (error) {
        console.log('Dist Failed!');
        console.log(error);
    }
})();
