import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {PropertyDetails} from '../types';
import {getMockPropertyDetails, updateMockPropertyDetails} from '../services/mockApi';
import {SectionHeader} from '../components/SectionHeader';
import {useNavigate} from 'react-router-dom';

const PropertyManagementPage: React.FC = () => {
    const {propertyId} = useParams<{ propertyId: string }>();
    const [property, setProperty] = useState<PropertyDetails | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editableProperty, setEditableProperty] = useState<Partial<PropertyDetails>>({});
    const navigate = useNavigate(); // Import useNavigate

    useEffect(() => {
        if (propertyId) {
            getMockPropertyDetails(propertyId).then(data => {
                if (data) {
                    setProperty(data);
                    setEditableProperty(data); // Initialize editable state with fetched data
                }
            });
        }
    }, [propertyId]);

    const handleVideoClick = (videoId: string) => {
        navigate(`/video/${videoId}/view`);
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setEditableProperty(prev => ({...prev, [name]: value}));
    };

    const handleSave = async () => {
        if (propertyId && editableProperty) {
            try {
                const updated = await updateMockPropertyDetails(propertyId, editableProperty);
                setProperty(updated);
                setIsEditing(false);
                alert('Property details updated successfully!');
            } catch (error) {
                console.error('Failed to update property details:', error);
                alert('Failed to update property details.');
            }
        }
    };

    if (!property) {
        return
        <div className="flex justify-center items-center h-screen">Loading...</div>
        ;
    }

    return (
        <div className="px-4 py-8 mx-auto max-w-7xl"> {/* Mimic Container and Box */}
            <SectionHeader title={`Manage Property: ${property.address}`}/>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Column: Video List */}
                <div
                    className="md:col-span-1 bg-[#02645b] p-5 rounded-xl shadow-none text-[#f2f2f2]"> {/* MuiCard styling */}
                    <h2 className="text-lg font-bold mb-4">Property Videos</h2> {/* Adjusted typography */}
                    <div className="space-y-3">
                        {property.video && (
                            <div
                                className={`cursor-pointer p-2 rounded-lg flex items-center space-x-3 hover:bg-[#33998f]`}
                                onClick={() => handleVideoClick(property.video!.id)}
                            >
                                <div
                                    className="w-16 h-16 bg-gray-300 flex-shrink-0 rounded-md flex items-center justify-center">
                                    <span className="text-[#f2f2f2]">▶</span> {/* Adjusted text color */}
                                </div>
                                <span className="font-medium">Main Video</span>
                            </div>
                        )}
                        {/* Add more videos here if the PropertyDetails type supported multiple videos */}
                    </div>
                </div>

                {/* Right Column: Property Details and Edit Form */}
                <div
                    className="md:col-span-2 bg-[#02645b] p-6 rounded-xl shadow-none text-[#f2f2f2]"> {/* MuiCard styling */}
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold">Property Details</h2> {/* Adjusted typography */}
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className="px-4 py-2 bg-[#33998f] text-[#f2f2f2] rounded-xl hover:bg-[#c2f2ed] hover:text-[#33998f] transition-colors" // MuiButton styling
                        >
                            {isEditing ? 'Cancel' : 'Edit Details'}
                        </button>
                    </div>

                    {isEditing ? (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-[#f2f2f2] text-sm font-bold mb-2"
                                       htmlFor="address"> {/* Adjusted text color */}
                                    Address:
                                </label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={editableProperty.address || ''}
                                    onChange={handleEditChange}
                                    className="shadow-none appearance-none border-none rounded-xl w-full py-2 px-3 text-[#373e40] leading-tight focus:outline-none focus:ring-2 focus:ring-[#33998f] bg-[#c2f2ed]" // MuiTextField styling
                                />
                            </div>
                            <div>
                                <label className="block text-[#f2f2f2] text-sm font-bold mb-2" htmlFor="bedrooms">
                                    Bedrooms:
                                </label>
                                <input
                                    type="number"
                                    id="bedrooms"
                                    name="bedrooms"
                                    value={editableProperty.bedrooms || ''}
                                    onChange={handleEditChange}
                                    className="shadow-none appearance-none border-none rounded-xl w-full py-2 px-3 text-[#373e40] leading-tight focus:outline-none focus:ring-2 focus:ring-[#33998f] bg-[#c2f2ed]"
                                />
                            </div>
                            <div>
                                <label className="block text-[#f2f2f2] text-sm font-bold mb-2" htmlFor="bathrooms">
                                    Bathrooms:
                                </label>
                                <input
                                    type="number"
                                    id="bathrooms"
                                    name="bathrooms"
                                    value={editableProperty.bathrooms || ''}
                                    onChange={handleEditChange}
                                    className="shadow-none appearance-none border-none rounded-xl w-full py-2 px-3 text-[#373e40] leading-tight focus:outline-none focus:ring-2 focus:ring-[#33998f] bg-[#c2f2ed]"
                                />
                            </div>
                            <div>
                                <label className="block text-[#f2f2f2] text-sm font-bold mb-2" htmlFor="car_spaces">
                                    Car Spaces:
                                </label>
                                <input
                                    type="number"
                                    id="car_spaces"
                                    name="car_spaces"
                                    value={editableProperty.car_spaces || ''}
                                    onChange={handleEditChange}
                                    className="shadow-none appearance-none border-none rounded-xl w-full py-2 px-3 text-[#373e40] leading-tight focus:outline-none focus:shadow-outline bg-[#c2f2ed]" // MuiTextField styling
                                />
                            </div>
                            <div>
                                <label className="block text-[#f2f2f2] text-sm font-bold mb-2"
                                       htmlFor="property_area">
                                    Property Area:
                                </label>
                                <input
                                    type="text"
                                    id="property_area"
                                    name="property_area"
                                    value={editableProperty.property_area || ''}
                                    onChange={handleEditChange}
                                    className="shadow-none appearance-none border-none rounded-xl w-full py-2 px-3 text-[#373e40] leading-tight focus:outline-none focus:ring-2 focus:ring-[#33998f] bg-[#c2f2ed]" // MuiTextField styling
                                />
                            </div>
                            <div>
                                <label className="block text-[#f2f2f2] text-sm font-bold mb-2" htmlFor="price">
                                    Price:
                                </label>
                                <input
                                    type="text"
                                    id="price"
                                    name="price"
                                    value={editableProperty.price || ''}
                                    onChange={handleEditChange}
                                    className="shadow-none appearance-none border-none rounded-xl w-full py-2 px-3 text-[#373e40] leading-tight focus:outline-none focus:ring-2 focus:ring-[#33998f] bg-[#c2f2ed]" // MuiTextField styling
                                />
                            </div>
                            <div>
                                <label className="block text-[#f2f2f2] text-sm font-bold mb-2"
                                       htmlFor="description">
                                    Description:
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={editableProperty.description || ''}
                                    onChange={handleEditChange}
                                    rows={5}
                                    className="shadow-none appearance-none border-none rounded-xl w-full py-2 px-3 text-[#373e40] leading-tight focus:outline-none focus:shadow-outline bg-[#c2f2ed]" // MuiTextField styling
                                ></textarea>
                            </div>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-[#33998f] text-[#f2f2f2] rounded-xl hover:bg-[#c2f2ed] hover:text-[#33998f] transition-colors" // MuiButton styling
                            >
                                Save Changes
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <p className="text-[#f2f2f2]"><span
                                className="font-semibold">Address:</span> {property.address}
                            </p> {/* Adjusted text color */}
                            <p className="text-[#f2f2f2]"><span
                                className="font-semibold">Bedrooms:</span> {property.bedrooms}</p>
                            <p className="text-[#f2f2f2]"><span
                                className="font-semibold">Bathrooms:</span> {property.bathrooms}</p>
                            <p className="text-[#f2f2f2]"><span
                                className="font-semibold">Car Spaces:</span> {property.car_spaces}</p>
                            <p className="text-[#f2f2f2]"><span
                                className="font-semibold">Property Area:</span> {property.property_area}</p>
                            <p className="text-[#f2f2f2]"><span
                                className="font-semibold">Price:</span> {property.price}</p>
                            <p className="text-[#f2f2f2]"><span
                                className="font-semibold">Description:</span> {property.description}</p>
                            {/* Display other property details as needed */}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PropertyManagementPage;