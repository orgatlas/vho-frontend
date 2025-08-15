import {string} from "yup";

export interface User {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}

export interface Property {
    id: number;
    title?: string;
    address: string;
    bedrooms: string;
    bathrooms: string;
    car_spaces: string;
    property_area: string;
    price?: string;
    description?: string;
    company?: Company;
    agents?: Agent[];
    images?: Image[];
    video?: Video;
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
    id: number;
    title: string;
    src: string;
}

export interface Voice {
    id: string;
    name: string;
    src: string;
}

export interface Video {
    id: number;
    property: Property;
    title: string | null
    duration: number | null
    file: string | null;
    locked?: boolean;
    package?: Package;
    logo_position?: string;
    background_music?: MusicTrack;
    voice?: Voice;
}

export interface Company {
    id: number;
    name: string;
    phone: string;
    email: string;
    website: string;
    logo: string;
}

export interface Agent {
    id: number;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    profile_picture: string;
}

export interface Invoice {
    id: number;
    payment: Payment;
    video: Video;
    customer: Customer;
}


export interface Payment {
    id: number;
    customer: Customer;
    stripe_payment_id: string;
    status: string;
    amount: any;
    paid_at: string;
}

export interface Customer {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    stripe_customer_id: string;
}