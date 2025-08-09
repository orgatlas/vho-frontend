import axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {PaymentDetails, PropertyDetails, Scene, MusicTrack, VoiceTrack, Package} from "src/types";

// Create an Axios instance
const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor
api.interceptors.request.use(
    (config) => config,
    (error) => {
        console.error('Request Error:', error);
        return Promise.reject(error);
    }
);

// Add a response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const {status, data} = error.response;
            let errorMessage = 'An unexpected error occurred.';

            // Global handling of 400 Bad Request
            if (status === 400) {
                errorMessage = data?.message || 'Bad request. Please check your input.';
            }
            // Handle 403 (e.g. redirect to billing)
            else if (status === 403) {
                const redirectUrl = data?.redirect;
                if (redirectUrl) {
                    window.location.href = redirectUrl;
                    return Promise.reject(error); // Prevent toast for redirect
                } else {
                    errorMessage = 'Access denied.';
                }
            }
            // Other common error handlers
            else if (status === 401) {
                errorMessage = 'You are not authorized. Please log in.';
            } else if (status === 404) {
                errorMessage = 'Requested resource not found.';
            } else if (status >= 500) {
                errorMessage = 'Server error. Please try again later.';
            }
            toast.error(errorMessage);
        } else {
            // Handle errors with no response (e.g., CORS or network issues)
            toast.error('Network error. Please check your connection.');
        }
        return Promise.reject(error);
    }
);

export const uploadImage = async (propertyId: string, file: File): Promise<{ id: string, file_url: string, warnings: string[] }> => {
    const formData = new FormData();
    formData.append('property', propertyId);
    formData.append('file', file);

    const response = await api.post('generation/image/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const removeImage = async (propertyId: string, imageId: string): Promise<{ message: string }> => {
    const response = await api.post('generation/image/remove', {property: propertyId, image: imageId});
    return response.data;
};

export const getImageList = async (propertyId: string): Promise<Image[]> => {
    const response = await api.post('generation/image/list', {property: propertyId});
    const images = response.data.images.map((image: any) => {
        const baseUrl = process.env.REACT_APP_API_BASE_URL?.replace('/api', '');
        return {
            id: image.id,
            file: image.file,
            description: image.description || '',
            preview: `${baseUrl}${image.file}`,
        }
    });
    return images;
};

export const getPropertyDetails = async (propertyId: string): Promise<PropertyDetails> => {
    const response = await api.post('generation/property/details', {property: propertyId});
    return response.data.property;
}

export const getPackages = async (propertyId: string): Promise<Package[]> => {
    const response = await api.post('billing/packages', {property: propertyId});
    return response.data.packages;
}

export const extractPropertyDetails = async (url: string): Promise<PropertyDetails> => {
    const response = await api.post('generation/listing/details', {url});

    const property = response.data.property;
    const images = response.data.images;

    return {
        id: property.id,
        title: property.title,
        address: property.address,
        bedrooms: property.beds,
        bathrooms: property.bathrooms,
        carSpaces: property.car_spaces,
        propertyArea: property.area,
        price: property.price,
        description: property.description,
        agentName: property.agent_name,
        agentContact: property.agent_contact,
        askingPrice: property.price,
        companyName: property.company_name,
        companyLogo: property.company_logo,
        images: images.map((img: any) => ({
            id: img.id,
            file: img.file,
            description: img.description,
        }))
    };
};

export const createVideo = async (propertyId: string): Promise<{ videoId: string }> => {
    const response = await api.post('generation/create', {property: propertyId});
    return response.data;
}

export const processPayment = async (propertyId: string, packageId: number, firstName: string, lastName: string, email: string, referralCode?: string): Promise<{client_secret: string, total_cost: number}> => {
    const response = await api.post('billing/payment/create', {
        property: propertyId,
        package: packageId,
        first_name: firstName,
        last_name: lastName,
        email: email,
        referral_code: referralCode
    });
    return response.data;
}

export const getMusicTracks = async (): Promise<MusicTrack[]> => {
    const response = await api.get('generation/music/list');
    return response.data.background_music.map((track: any) => ({
        title: track.name,
        src: track.preview, // Using preview for now
    }));
}

export const getVoiceTracks = async (): Promise<VoiceTrack[]> => {
    const response = await api.get('generation/voice/list');
    return response.data.voices.map((voice: any) => ({
        name: voice.name,
        src: voice.preview || '', // Use empty string if preview is null
    }));
}