module.exports = (config) => {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            {
                pattern: './test/helpers/**/*.js',
                type: 'module'
            },
            {
                pattern: './test/matchers/**/*js'
            },
            {
                pattern: './src/components/**/*.css',
                type: 'css'
            },
            {
                pattern: './src/components/**/*.spec.js',
                type: 'module'
            },
            {
                pattern: './src/components/**/*.spec.html'
            }
        ],
        exclude: [],
        preprocessors: {
            '**/*.html': ['html2js']
        },
        reporters: [
            'html',
            'progress'
        ],
        htmlReporter: {
            outputFile: 'reports/unit-tests.html',
            pageTitle: 'Matter',
            subPageTitle: 'Unit Tests',
            showOnlyFailed: true,
            groupSuites: true,
            useCompactStyle: true
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: [
            'Chrome',
            'Firefox',
            'SafariPrivate'
        ],
        singleRun: false,
        concurrency: Infinity
    })
};
