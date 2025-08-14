import React, { useState, useEffect } from 'react';
import { PropertyDetails } from 'src/types';
import { getUserListings } from 'src/services/mockApi'; // Using the mock API
import { SectionHeader } from 'src/components/SectionHeader';
import { useNavigate } from 'react-router-dom';

const UserListingsPage: React.FC = () => {
    const [listings, setListings] = useState<PropertyDetails[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        getUserListings().then(setListings);
    }, []);

    const handleVideoClick = (videoId: string) => {
        navigate(`/video/${videoId}/view`);
    };

    const handleListingClick = (propertyId: string) => {
        navigate(`/listings/${propertyId}/manage`);
    };

    return (
            <div className="px-4 py-8 mx-auto max-w-7xl"> {/* Mimic Container and Box */}
                <SectionHeader title="My Listings" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {listings.map((listing) => (
                        <div
                            key={listing.id}
                            className="bg-[#02645b] rounded-xl p-5 shadow-none text-[#f2f2f2] overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02]" // MuiCard styling
                            onClick={() => handleListingClick(listing.id)}
                        >
                            {/* Main Property Image/Video Preview */}
                            <div className="w-full h-48 bg-gray-200 flex items-center justify-center relative rounded-lg overflow-hidden mb-4">
                                {listing.video ? (
                                    <div className="relative w-full h-full">
                                        <img
                                            src={listing.images[0]?.file || 'https://via.placeholder.com/400x200?text=No+Image'}
                                            alt="Video Thumbnail"
                                            className="w-full h-full object-cover"
                                        />
                                        <button
                                            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-[#f2f2f2] text-4xl"
                                            onClick={(e) => { e.stopPropagation(); handleVideoClick(listing.video!.id); }}
                                        >
                                            ▶
                                        </button>
                                    </div>
                                ) : (
                                    <img
                                        src={listing.images[0]?.file || 'https://via.placeholder.com/400x200?text=No+Image'}
                                        alt="Property Preview"
                                        className="w-full h-full object-cover"
                                    />
                                )}
                            </div>

                            <div className="p-0"> {/* Removed padding as it's now on the parent div */}
                                <h3 className="text-xl font-semibold text-[#f2f2f2] mb-2">{listing.address}</h3> {/* Adjusted text color */}
                                <p className="text-[#f2f2f2] text-sm mb-1"> {/* Adjusted text color */}
                                    {listing.bedrooms} Beds | {listing.bathrooms} Baths | {listing.car_spaces} Cars
                                </p>
                                <p className="text-[#f2f2f2] font-bold text-lg">{listing.price}</p> {/* Adjusted text color */}

                                {/* Mini Video Gallery */}
                                <div className="flex space-x-2 mt-3 overflow-x-auto pb-2">
                                    {listing.video && (
                                        <div
                                            className={`w-20 h-20 flex-shrink-0 bg-gray-300 rounded-md overflow-hidden cursor-pointer flex items-center justify-center relative`}
                                            onClick={(e) => { e.stopPropagation(); handleVideoClick(listing.video!.id); }}
                                        >
                                            <img
                                                src={listing.images[0]?.file || 'https://via.placeholder.com/80?text=Video'}
                                                alt="Video Thumbnail"
                                                className="w-full h-full object-cover"
                                            />
                                            <span className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-[#f2f2f2] text-xl">▶</span>
                                        </div>
                                    )}
                                    {listing.images.map((image) => (
                                        <img
                                            key={image.id}
                                            src={image.file}
                                            alt="Property Thumbnail"
                                            className="w-20 h-20 flex-shrink-0 object-cover rounded-md"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
    );
};

export default UserListingsPage;