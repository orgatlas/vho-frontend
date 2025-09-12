import api from 'src/services/api';
import { trackPageView, trackEvent } from 'src/marketing/pixel';

function getOrCreateIdentifier(): string {
    let identifier = localStorage.getItem('identifier');
    if (!identifier) {
        identifier = crypto.randomUUID();
        localStorage.setItem('identifier', identifier);
    }
    return identifier;
}

export const marketingPurchaseComplete = async (
    invoice_id: number | string
): Promise<string> => {
    const identifier = getOrCreateIdentifier();

    const response = await api.post('marketing/meta/purchase/complete', {
        invoice_id,
        identifier,
    });

    // Pixel event
    trackEvent('Purchase', {
        content_type: 'purchase',
        content_ids: [invoice_id],
        value: response?.data?.amount ?? 0, // if backend provides amount
        currency: 'USD',
    });

    return response.data.message;
};

export const marketingViewHomepage = async (): Promise<string> => {
    const identifier = getOrCreateIdentifier();

    const response = await api.post('marketing/meta/view/homepage', {
        identifier,
    });

    trackPageView(); // pixel PageView

    return response.data.message;
};

export const marketingViewPackage = async (
    package_id: number | string
): Promise<string> => {
    const identifier = getOrCreateIdentifier();

    const response = await api.post('marketing/meta/view/product', {
        identifier,
        package_id
    });

    trackEvent('ViewContent', {
        content_type: 'package',
        content_ids: [package_id],
    });

    return response.data.message;
};

export const marketingViewCheckout = async (): Promise<string> => {
    const identifier = getOrCreateIdentifier();

    const response = await api.post('marketing/meta/view/checkout', {
        identifier,
    });

    trackEvent('InitiateCheckout', {
        content_type: 'checkout',
        value: response?.data?.amount ?? 0,
        currency: 'USD',
    });

    return response.data.message;
};