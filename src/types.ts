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
    property: Property;
    location_name: string;
    upscaled: string;
    description: string;
    preview: string;
}

export interface Package {
    id: number;
    name: string;
    description: string;
    features: string[];
    price: string;
    resolution: string;
    includes_video: boolean;
    includes_staging: boolean;
}

export interface Style {
    id: number;
    name: Property;
    description: string;
    guidelines: string;
    custom: boolean;
}

export interface StagingPackage {
    id: number;
    property: Property;
    style: Style;
    is_paid: boolean;
    locked: boolean;
}

export interface StagedImage {
    id: number;
    staging_package: StagingPackage;
    original_image: Image;
    staged_image: Image | null;
    staging_prompt: string | null;
    status: 'Waiting' | 'In Progress' | 'Complete' | 'Failed';
    created_at: string;
    updated_at: string;
}

export interface Scene {
    id: string | number;
    video: Video;
    order: number;
    duration: number;
    audio: Audio;
    image: Image;
    file: string;
}

export interface Audio {
    id: string | number;
    voice: Voice;
    script: string;
    file: string;
}

export interface PaymentDetails {
    cardNumber: string;
    expiryDate: string;
    cvc: string;
    nameOnCard: string;
}

export interface MusicTrack {
    id: number;
    name: string;
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
    is_paid?: boolean;
    package?: Package;
    logo_position?: string;
    background_music?: MusicTrack;
    voice?: Voice;
    created: string;
    last_updated: string;
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
    property: Property;
    package: Package;
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

export interface CostBreakdown {
    total_cost: number;
    discount: number;
}

export interface Customer {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    stripe_customer_id: string;
}