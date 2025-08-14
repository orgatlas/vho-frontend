import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPropertyDetails } from '../services/api';
import { PropertyDetails } from '../types';
import { Layout } from '../layouts/Layout';
import { SectionHeader } from '../components/SectionHeader';

const PropertyPage: React.FC = () => {
    const { propertyId } = useParams<{ propertyId: string }>();
    const [property, setProperty] = useState<PropertyDetails | null>(null);
    const [selectedMedia, setSelectedMedia] = useState<string | null>(null);

    useEffect(() => {
        if (propertyId) {
            // Assuming getPropertyDetails can take a property ID directly,
            // even though its signature shows 'url'.
            // This is based on the user's request to pass property ID as URL param.
            getPropertyDetails(propertyId).then(setProperty);
        }
    }, [propertyId]);

    useEffect(() => {
        if (property) {
            // Set the initial selected media to the video if available, otherwise the first image
            if (property.video) {
                setSelectedMedia(property.video.file_url);
            } else if (property.images.length > 0) {
                setSelectedMedia(property.images[0].file);
            }
        }
    }, [property]);

    if (!property) {
        return <Layout><div className="flex justify-center items-center h-screen">Loading...</div></Layout>;
    }

    const handleThumbnailClick = (mediaUrl: string) => {
        setSelectedMedia(mediaUrl);
    };

    return (
        <Layout>
            <div className="container mx-auto px-4 py-8">
                {/* Header with key property details */}
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                    <h1 className="text-2xl font-bold">{property.address}</h1>
                    <div className="flex items-center space-x-4 text-gray-700">
                        <span>{property.bedrooms} Beds</span>
                        <span>{property.bathrooms} Baths</span>
                        <span>{property.car_spaces} Cars</span>
                        <span>{property.property_area} Area</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Main Content Area (Gallery) */}
                    <div className="md:col-span-2">
                        {/* Media Gallery - Main Display */}
                        <div className="mb-4 bg-gray-200 rounded-lg overflow-hidden flex justify-center items-center" style={{ height: '400px' }}>
                            {selectedMedia ? (
                                selectedMedia.endsWith('.mp4') ? (
                                    <video src={selectedMedia} controls className="w-full h-full object-contain"></video>
                                ) : (
                                    <img src={selectedMedia} alt="Property" className="w-full h-full object-contain" />
                                )
                            ) : (
                                <p className="text-gray-500">No media available</p>
                            )}
                        </div>

                        {/* Media Gallery - Thumbnails */}
                        <div className="flex space-x-2 overflow-x-auto pb-2">
                            {property.video && (
                                <div
                                    className={`w-24 h-24 flex-shrink-0 bg-gray-300 rounded-lg overflow-hidden cursor-pointer flex items-center justify-center ${selectedMedia === property.video.file_url ? 'border-2 border-blue-500' : ''}`}
                                    onClick={() => handleThumbnailClick(property.video.file_url)}
                                >
                                    {/* Placeholder for video thumbnail - could be a play icon or a static image */}
                                    <span className="text-gray-600 text-sm">Video</span>
                                </div>
                            )}
                            {property.images.map((image) => (
                                <img
                                    key={image.id}
                                    src={image.file}
                                    alt="Property Thumbnail"
                                    className={`w-24 h-24 flex-shrink-0 object-cover rounded-lg cursor-pointer ${selectedMedia === image.file ? 'border-2 border-blue-500' : ''}`}
                                    onClick={() => handleThumbnailClick(image.file)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right Sidebar (Price, Company, Agents) */}
                    <div className="space-y-4">
                        {/* Price */}
                        <div className="text-3xl font-bold text-right text-green-600">{property.price}</div>

                        {/* Company Details */}
                        {property.company && (
                            <div className="bg-white p-4 rounded-lg shadow">
                                <SectionHeader title="Company" />
                                <div className="flex items-center mt-2">
                                    {property.company.logo && <img src={property.company.logo} alt={property.company.name} className="w-16 h-16 object-contain mr-4" />}
                                    <div>
                                        <h3 className="font-bold text-lg">{property.company.name}</h3>
                                        <p className="text-gray-600">{property.company.phone}</p>
                                        <p className="text-gray-600">{property.company.email}</p>
                                        {property.company.website && <p><a href={property.company.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{property.company.website}</a></p>}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Agent Details */}
                        {property.agents.map(agent => (
                            <div key={agent.id} className="bg-white p-4 rounded-lg shadow">
                                <SectionHeader title="Agent" />
                                <div className="flex items-center mt-2">
                                    {agent.profile_picture && <img src={agent.profile_picture} alt={`${agent.first_name} ${agent.last_name}`} className="w-16 h-16 rounded-full object-cover mr-4" />}
                                    <div>
                                        <h3 className="font-bold text-lg">{`${agent.first_name} ${agent.last_name}`}</h3>
                                        <p className="text-gray-600">{agent.phone}</p>
                                        <p className="text-gray-600">{agent.email}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Description and Map */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    <div>
                        <SectionHeader title="Property Description" />
                        <p className="text-gray-700 leading-relaxed">{property.description}</p>
                    </div>
                    <div>
                        <SectionHeader title="Location" />
                        <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center text-gray-500">
                            {/* Placeholder for Map */}
                            <p>Map will be here</p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default PropertyPage;