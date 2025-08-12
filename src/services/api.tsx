import axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Agent, PropertyDetails, MusicTrack, Voice, Package, Video, Company} from "src/types";

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

export const login = async (email: string, password: string) => {
    const response = await api.post('auth/login', {email, password});
    return response.data;
};

export const register = async (first_name: string, last_name: string, email: string, password: string) => {
    const response = await api.post('auth/register', {email, first_name, last_name, password});
    return response.data.user;
};

export const logout = async () => {
    const response = await api.get('auth/logout');
    return response.data;
};

export const getUser = async () => {
    const response = await api.post('auth/user', {email});
    return response.data;
};

export const resetPasswordRequest = async (email: string) => {
    const response = await api.post('auth/password/reset/request', {email});
    return response.data;
};

export const resetPassword = async (email: string) => {
    const response = await api.post('auth/password/reset', {email});
    return response.data;
};


export const uploadImage = async (videoId: string, file: File): Promise<{
    id: string,
    file_url: string,
    warnings: string[]
}> => {
    const formData = new FormData();
    formData.append('video', videoId);
    formData.append('file', file);

    const response = await api.post('generation/image/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const removeImage = async (videoId: string, imageId: string): Promise<{ message: string }> => {
    const response = await api.post('generation/image/remove', {video: videoId, image: imageId});
    return response.data;
};

export const getImageList = async (videoId: string): Promise<Image[]> => {
    const response = await api.post('generation/image/list', {video: videoId});
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

export const getVideoDetails = async (videoId: string): Promise<Video> => {
    const response = await api.post('generation/video/details', {video: videoId});
    return response.data.video;
}

export const getPackages = async (videoId: string): Promise<Package[]> => {
    const response = await api.post('billing/packages', {video: videoId});
    return response.data.packages;
}

export const extractPropertyDetails = async (url: string): Promise<PropertyDetails> => {
    const response = await api.post('generation/listing/details', {url});

    const property = response.data.property;
    const images = response.data.images;
    const video = response.data.video;

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
        company: property.company,
        agents: property.agents,
        video: video,
        images: images.map((img: any) => ({
            id: img.id,
            file: img.file,
            description: img.description,
        }))
    };
};

export const processPayment = async (videoId: string, packageId: number, firstName: string, lastName: string, email: string, referralCode?: string): Promise<{
    client_secret: string,
    total_cost: number
}> => {
    const response = await api.post('billing/payment/create', {
        video: videoId,
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
        id: track.id,
        title: track.name,
        src: track.preview,
    }));
}

export const getVoiceTracks = async (): Promise<Voice[]> => {
    const response = await api.get('generation/voice/list');
    return response.data.voices.map((voice: any) => ({
        id: voice.id,
        name: voice.name,
        src: voice.preview || '',
    }));
}

export const createVideo = async (videoId: string, agentIds: number[]): Promise<{ videoId: string }> => {
    const response = await api.post('generation/create', {video: videoId, agents: agentIds});
    return response.data;
}

export const createAgent = async (propertyId: string, agentData: Agent, profilePicture?: File): Promise<Agent> => {
    const formData = new FormData();
    formData.append('property', propertyId);
    formData.append('first_name', agentData.first_name);
    formData.append('last_name', agentData.last_name);
    formData.append('email', agentData.email);
    formData.append('phone', agentData.phone);
    if (profilePicture) {
        formData.append('profile_picture', profilePicture);
    }

    const response = await api.post('generation/agent/create', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data.agent;
};

export const deleteAgent = async (propertyId: string, agentId: number): Promise<{ message: string }> => {
    const response = await api.post('generation/agent/delete', {property: propertyId, agent: agentId});
    return response.data;
};

export const updateAgent = async (propertyId: string, agentId: number, agentData: Agent, profilePicture?: File): Promise<Agent> => {
    const formData = new FormData();
    formData.append('property', propertyId);
    formData.append('agent', agentId.toString());
    formData.append('first_name', agentData.first_name);
    formData.append('last_name', agentData.last_name);
    formData.append('email', agentData.email);
    formData.append('phone', agentData.phone);
    if (profilePicture) {
        formData.append('profile_picture', profilePicture);
    }

    const response = await api.post('generation/agent/update', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data.agent;
};

export const updateCompany = async (companyId: string, companyData: Company, logo?: File): Promise<Company> => {
    const formData = new FormData();
    formData.append('company', companyId);
    formData.append('name', companyData.name);
    formData.append('phone', companyData.phone);
    formData.append('email', companyData.email);
    formData.append('website', companyData.website);
    if (logo) {
        formData.append('logo', logo);
    }

    const response = await api.post('generation/company/update', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data.company;
};

export const setLogoPosition = async (videoId: string, logoPosition: string): Promise<{ message: string }> => {
    const response = await api.post('generation/logo/position/set', {video: videoId, logo_position: logoPosition});
    return response.data;
};

export const setMusicTrack = async (videoId: string, track: string): Promise<{ message: string }> => {
    const response = await api.post('generation/music/set', {video: videoId, music: track});
    return response.data;
};

export const setVoiceTrack = async (videoId: string, voiceId: string): Promise<{ message: string }> => {
    const response = await api.post('generation/voice/set', {video: videoId, voice: voiceId});
    return response.data;
};