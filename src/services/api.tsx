import axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Agent, Property, MusicTrack, Voice, Package, Video, Company, Scene, Image} from "src/types";

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

export const getUser = async (token: string) => {
    const response = await api.get('auth/user', {
        withCredentials: true, headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return response.data.user;
};

export const resetPasswordRequest = async (email: string) => {
    const response = await api.post('auth/password/reset/request', {email});
    return response.data;
};

export const resetPassword = async (email: string, password: string, token: string) => {
    const response = await api.post('auth/password/reset', {email: email, password: password, token: token});
    return response.data;
};

export const submitContactForm = async (first_name: string, last_name: string, email: string, message: string) => {
    const response = await api.post('mail/contact/submit', {
        first_name: first_name,
        last_name: last_name,
        email: email,
        message: message
    });
    return response.data;
};

export const uploadImage = async (videoId: number, file: File): Promise<{
    id: string,
    file_url: string,
    warnings: string[]
}> => {
    const formData = new FormData();
    formData.append('video', videoId);
    formData.append('file', file);

    const response = await api.post('image/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const removeImage = async (videoId: number, imageId: string): Promise<{ message: string }> => {
    const response = await api.post('image/remove', {video: videoId, image: imageId});
    return response.data;
};

export const getImageList = async (videoId: number | string): Promise<Image[]> => {
    const response = await api.post('image/list', {video: videoId});
    const images = response.data.images.map((image: any) => {
        return {
            id: image.id,
            file: image.file,
            description: image.description || '',
            preview: `${image.file}`,
        }
    });
    return images;
};

export const getVideoDetails = async (videoId: number | string): Promise<Video> => {
    const response = await api.post('video/details', {video: videoId});
    return response.data.video;
}

export const getPackages = async (videoId: number | string, scenes?: number, currency?: string): Promise<Package[]> => {
    const payload: any = {};
    if (videoId) payload.video = videoId;
    if (scenes) payload.scenes = scenes;
    if (currency) payload.currency = currency;
    const response = await api.post('billing/packages', payload);
    return response.data.packages;
}

export const getPricing = async (scenes: number): Promise<any> => {
    const response = await api.post('billing/pricing', {scenes: scenes});
    return response.data;
}

export const extractVideoDetailsFromAddress = async (address: string): Promise<Video> => {
    const response = await api.post('property/retrieve', {address});
    return response.data.video;
};

// Not used at the moment
// export const extractVideoDetailsFromUrl = async (url: string): Promise<Video> => {
//     const response = await api.post('property/retrieve', {url});
//     return response.data.video;
// };

export const getProperty = async (propertyId: string): Promise<Property> => {
    const response = await api.post('property/details', {property: propertyId});
    return response.data.property;
};

export const updatePropertyDetails = async (property: number, address: string, bedrooms: string, bathrooms: string, car_spaces: string, property_area: string, description: string | undefined, price: string | undefined): Promise<Property> => {
    const response = await api.post('property/update', {
        property: property,
        address: address,
        bedrooms: bedrooms,
        bathrooms: bathrooms,
        car_spaces: car_spaces,
        property_area: property_area,
        description: description,
        price: price
    });
    return response.data;
};


export const processPayment = async (videoId: number | string, packageId: number, firstName: string, lastName: string, email: string, referralCode?: string): Promise<{
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
    const response = await api.get('video/music/list');
    return response.data.background_music.map((track: any) => ({
        id: track.id,
        name: track.name,
        src: track.preview,
    }));
}

export const getVoiceTracks = async (): Promise<Voice[]> => {
    const response = await api.get('video/voice/list');
    return response.data.voices.map((voice: any) => ({
        id: voice.id,
        name: voice.name,
        src: voice.preview || '',
    }));
}

export const createVideo = async (videoId: number): Promise<{ success: string, message: string }> => {
    const response = await api.post('video/create', {video: videoId});
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

    const response = await api.post('agent/create', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data.agent;
};

export const deleteAgent = async (propertyId: string, agentId: number): Promise<{ message: string }> => {
    const response = await api.post('agent/delete', {property: propertyId, agent: agentId});
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

    const response = await api.post('agent/update', formData, {
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

    const response = await api.post('company/update', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data.company;
};

export const setLogoPosition = async (videoId: number, logoPosition: string): Promise<{ message: string }> => {
    const response = await api.post('video/logo/position/set', {video: videoId, logo_position: logoPosition});
    return response.data;
};

export const setMusicTrack = async (videoId: number, track: string): Promise<{ message: string }> => {
    const response = await api.post('video/music/set', {video: videoId, music: track});
    return response.data;
};

export const setVoiceTrack = async (videoId: number, voiceId: string): Promise<{ message: string }> => {
    const response = await api.post('video/voice/set', {video: videoId, voice: voiceId});
    return response.data;
};

export const getSceneList = async (videoId: number | string): Promise<Scene[]> => {
    const response = await api.post('video/scene/list', {video: videoId});
    return response.data.scenes;
};

export const saveVideo = async (videoId: number | string): Promise<{ message: string }> => {
    const response = await api.post('video/update', {video: videoId});
    return response.data;
};

export const updateVideoTitle = async (videoId: number | string, newTitle: string): Promise<Property> => {
    const response = await api.post('video/title/update', {video: videoId, title: newTitle});
    return response.data.property;
}

export const updateSceneScript = async (sceneId: string | number, script?: string): Promise<Scene> => {
    const response = await api.post('video/scene/update', {scene: sceneId, script: script});
    return response.data.scene;
};

export const updateSceneOrder = async (sceneId: string | number, order: number): Promise<Scene> => {
    const response = await api.post('video/scene/update', {scene: sceneId, order: order});
    return response.data.scene;
};

export const updateSceneAnimation = async (sceneId: string, animate: boolean): Promise<Scene> => {
    const response = await api.post('video/scene/animation/update', {scene: sceneId, animate});
    return response.data.scene;
};

export const getPropertyList = async (
    page: number,
    per_page: number,
    search: string,
    sort_by: string,
    sort_order: string,
): Promise<{ properties: Property[]; total: number; page: number; per_page: number; total_pages: number }> => {
    const response = await api.post('property/search', {
        page: page,
        per_page: per_page,
        search: search,
        sort_by: sort_by,
        sort_order: sort_order,
    });

    return {
        properties: response.data.results,
        total: response.data.total,
        page: response.data.page,
        per_page: response.data.per_page,
        total_pages: response.data.total_pages
    };
};

export const getVideoList = async (
    property_id: string | number,
    page: number,
    per_page: number,
    search: string,
    sort_by: string,
    sort_order: string,
): Promise<{ videos: Video[]; total: number; page: number; per_page: number; total_pages: number }> => {
    const response = await api.post('video/search', {
        property: property_id,
        page: page,
        per_page: per_page,
        search: search,
        sort_by: sort_by,
        sort_order: sort_order,
    });

    return {
        videos: response.data.results,
        total: response.data.total,
        page: response.data.page,
        per_page: response.data.per_page,
        total_pages: response.data.total_pages
    };
};

export const convertCurrency = async (cost: number, code: string): Promise<number> => {
    const response = await api.post('billing/currency/convert', {cost: cost, code: code});
    return response.data.converted_price;
};


