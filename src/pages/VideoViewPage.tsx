import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Layout} from '../layouts/Layout';
import {SectionHeader} from '../components/SectionHeader';
import {getVideoDetails} from '../services/api';
import {Video} from '../types';
import {useNavigate} from 'react-router-dom';

const VideoViewPage: React.FC = () => {
    const {videoId} = useParams<{ videoId: string }>();
    const [video, setVideo] = useState<Video | null>(null);

    useEffect(() => {
        if (videoId) {
            getVideoDetails(videoId).then(setVideo);
        }
    }, [videoId]);

    const handleShare = (platform: string) => {
        if (!video) return;

        const videoUrl = video.file_url;
        let shareUrl = '';

        switch (platform) {
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(videoUrl)}`;
                break;
            case 'instagram':
                // Instagram does not have a direct web share intent for videos.
                // Typically, this would involve a mobile app deep link or API integration.
                // For a web-based solution, we can only suggest downloading or direct upload.
                alert('Instagram sharing usually requires direct upload via the app. You can download the video and upload it manually.');
                return;
            case 'x': // Twitter
                shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(videoUrl)}&text=${encodeURIComponent('Check out this property video!')}`;
                break;
            case 'youtube':
                // YouTube requires video upload, not direct sharing of an external URL.
                alert('YouTube sharing requires uploading the video to your channel. You can download the video and upload it manually.');
                return;
            case 'email':
                shareUrl = `mailto:?subject=${encodeURIComponent('Check out this property video!')}&body=${encodeURIComponent(`I thought you might be interested in this property video: ${videoUrl}`)}`;
                break;
            default:
                break;
        }

        if (shareUrl) {
            window.open(shareUrl, '_blank');
        }
    };

    const handleDownload = () => {
        if (video && video.file_url) {
            const link = document.createElement('a');
            link.href = video.file_url;
            link.download = `property_video_${videoId}.mp4`; // Suggest a filename
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const navigate = useNavigate(); // Import useNavigate

    const handleEditVideo = () => {
        navigate(`/video/${videoId}/edit`);
    };

    if (!video) {
        return <div className="flex justify-center items-center h-screen">Loading video...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <SectionHeader title="Video Details"/>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Video Player */}
                <div className="md:col-span-2 bg-black rounded-lg overflow-hidden">
                    <video src={video.file_url} controls autoPlay className="w-full h-full object-contain"></video>
                </div>

                {/* Options Tiles */}
                <div className="md:col-span-1 space-y-4">
                    <div
                        className="bg-white p-6 rounded-lg shadow cursor-pointer hover:shadow-lg transition-shadow duration-300 flex items-center justify-center text-center"
                        onClick={handleEditVideo}
                    >
                        <span className="text-xl font-semibold">Edit Video</span>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-xl font-semibold mb-4 text-center">Share Video</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                onClick={() => handleShare('facebook')}
                            >
                                Facebook
                            </button>
                            <button
                                className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors"
                                onClick={() => handleShare('instagram')}
                            >
                                Instagram
                            </button>
                            <button
                                className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors"
                                onClick={() => handleShare('x')}
                            >
                                X (Twitter)
                            </button>
                            <button
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                                onClick={() => handleShare('youtube')}
                            >
                                YouTube
                            </button>
                            <button
                                className="col-span-2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                                onClick={() => handleShare('email')}
                            >
                                Email
                            </button>
                        </div>
                    </div>

                    <div
                        className="bg-white p-6 rounded-lg shadow cursor-pointer hover:shadow-lg transition-shadow duration-300 flex items-center justify-center text-center"
                        onClick={handleDownload}
                    >
                        <span className="text-xl font-semibold">Download Video</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoViewPage;