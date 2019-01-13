export const getCurrentBrowser = () => {
    const { userAgent } =window.navigator;
    if (0 <= userAgent.indexOf('Chrome')) {
        return 'Chrome';
    } else if (0 <= userAgent.indexOf('Firefox')) {
        return 'Firefox';
    } else if (0 <= userAgent.indexOf('Safari')) {
        return 'Safari';
    }
};

export const isBrowser = (browser) => getCurrentBrowser() === browser;
export const isBrowserNot = (browser) => getCurrentBrowser() !== browser;
