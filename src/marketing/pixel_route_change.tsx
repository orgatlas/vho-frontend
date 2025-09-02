import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from 'src/marketing/pixel';

export default function PixelRouteChange() {
    const { pathname, search } = useLocation();
    useEffect(() => {
        trackPageView();
    }, [pathname, search]);
    return null;
}