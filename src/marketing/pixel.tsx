import ReactPixel from 'react-facebook-pixel';

export const initPixel = (pixelId: string) => {
    const options = { autoConfig: true, debug: false };
    ReactPixel.init(pixelId, undefined, options);
    ReactPixel.pageView(); // first page load
};

export const trackPageView = () => ReactPixel.pageView();
export const trackEvent = (name: string, params?: Record<string, any>) =>
    ReactPixel.track(name, params);
export const trackCustom = (name: string, params?: Record<string, any>) =>
    ReactPixel.trackCustom(name, params);