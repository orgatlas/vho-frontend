export interface PropertyDetails {
    id?: string;
    title?: string;
    address: string;
    bedrooms: string;
    bathrooms: string;
    carSpaces: string;
    propertyArea: string;
    price?: string;
    askingPrice: string;
    description?: string;
    agentName: string;
    agentContact: string;
    companyName: string;
    companyLogo?: string;
    images?: Image[];
    package?: Package;
    locked?: boolean;
}

export interface Image {
    id: string;
    file: string;
    description: string;
    preview: string;
}

export interface Package {
    id: number;
    name: string;
    features: string[];
    price: string;
    min_scenes: string;
    max_scenes: string;
    is_premium: boolean;
}

export interface Scene {
    id: string;
    name: string;
    description: string;
    price: number;
    features: string[];
}

export interface PaymentDetails {
    cardNumber: string;
    expiryDate: string;
    cvc: string;
    nameOnCard: string;
}

export interface MusicTrack {
    title: string;
    src: string;
}

export interface VoiceTrack {
    name: string;
    src: string;
}