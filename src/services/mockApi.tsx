import { Property, Video, Image } from 'src/types';

// Helper to generate a random ID
const generateId = () => Math.random().toString(36).substr(2, 9);

// Mock data for videos
const mockVideos: Video[] = [
    { id: generateId(), file_url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    { id: generateId(), file_url: 'https://www.w3schools.com/html/movie.mp4' },
];

// Mock data for images
const mockImages: Image[] = [
    { id: generateId(), file: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Image1', description: 'Living Room' },
    { id: generateId(), file: 'https://via.placeholder.com/150/00FF00/000000?text=Image2', description: 'Bedroom' },
    { id: generateId(), file: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Image3', description: 'Kitchen' },
];

// Mock user listings data
const mockUserListings: Property[] = [
    {
        id: 'prop1',
        title: 'Beautiful Family Home',
        address: '123 Mockingbird Lane, Mockville',
        bedrooms: 4,
        bathrooms: 3,
        car_spaces: 2,
        property_area: '2000 sqft',
        price: '£500,000',
        description: 'A spacious and beautiful family home in a quiet neighborhood.',
        company: {
            id: 'comp1',
            name: 'Mock Real Estate',
            phone: '555-1234',
            email: 'info@mockre.com',
            website: 'http://www.mockre.com',
            logo: 'https://via.placeholder.com/50/0000FF/FFFFFF?text=MR',
        },
        agents: [
            {
                id: 1,
                first_name: 'John',
                last_name: 'Doe',
                email: 'john.doe@mockre.com',
                phone: '555-5678',
                profile_picture: 'https://via.placeholder.com/50/FF0000/FFFFFF?text=JD',
            },
        ],
        video: mockVideos[0],
        images: mockImages,
    },
    {
        id: 'prop2',
        title: 'Cozy Apartment',
        address: '456 Fictional Ave, Story City',
        bedrooms: 2,
        bathrooms: 1,
        car_spaces: 1,
        property_area: '900 sqft',
        price: '£250,000',
        description: 'A cozy apartment perfect for singles or couples.',
        company: {
            id: 'comp2',
            name: 'Urban Living',
            phone: '555-8765',
            email: 'contact@urbanliving.com',
            website: 'http://www.urbanliving.com',
            logo: 'https://via.placeholder.com/50/00FF00/000000?text=UL',
        },
        agents: [
            {
                id: 2,
                first_name: 'Jane',
                last_name: 'Smith',
                email: 'jane.smith@urbanliving.com',
                phone: '555-4321',
                profile_picture: 'https://via.placeholder.com/50/0000FF/FFFFFF?text=JS',
            },
        ],
        video: mockVideos[1],
        images: [mockImages[0], mockImages[2]],
    },
];

export const getUserListings = async (): Promise<Property[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockUserListings);
        }, 500); // Simulate network delay
    });
};

export const getMockPropertyDetails = async (propertyId: string): Promise<Property | undefined> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockUserListings.find(p => p.id === propertyId));
        }, 300);
    });
};

export const updateMockPropertyDetails = async (propertyId: string, updatedDetails: Partial<Property>): Promise<Property> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const index = mockUserListings.findIndex(p => p.id === propertyId);
            if (index !== -1) {
                mockUserListings[index] = { ...mockUserListings[index], ...updatedDetails };
                resolve(mockUserListings[index]);
            } else {
                reject(new Error('Property not found'));
            }
        }, 300);
    });
};