import React, {useState, useEffect, useRef} from 'react';
import {useParams} from 'react-router-dom';
import {Layout} from '../layouts/Layout';
import {SectionHeader} from '../components/SectionHeader';

// Mock Scene Data Structure
interface Scene {
    id: string;
    imagePreviewUrl: string;
    videoPreviewUrl: string;
    script: string;
    settings: {
        animate: boolean;
        transition: string;
        colorEffects: string;
    };
}

// Mock function to fetch scenes (replace with actual API call later)
const fetchScenes = async (videoId: string): Promise<Scene[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    id: 'scene1',
                    imagePreviewUrl: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Scene1',
                    videoPreviewUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    script: 'This is the script for scene 1. Describe the beautiful living room.',
                    settings: {animate: true, transition: 'fade', colorEffects: 'none'},
                },
                {
                    id: 'scene2',
                    imagePreviewUrl: 'https://via.placeholder.com/150/00FF00/000000?text=Scene2',
                    videoPreviewUrl: 'https://www.w3schools.com/html/movie.mp4',
                    script: 'Scene 2 script. Highlight the spacious kitchen and dining area.',
                    settings: {animate: false, transition: 'slide', colorEffects: 'sepia'},
                },
                {
                    id: 'scene3',
                    imagePreviewUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Scene3',
                    videoPreviewUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    script: 'Scene 3 script. Show the cozy bedroom and bathroom.',
                    settings: {animate: true, transition: 'wipe', colorEffects: 'grayscale'},
                },
            ]);
        }, 500);
    });
};

const VideoEditorPage: React.FC = () => {
    const {videoId} = useParams<{ videoId: string }>();
    const [scenes, setScenes] = useState<Scene[]>([]);
    const [selectedScene, setSelectedScene] = useState<Scene | null>(null);
    const [draggedItem, setDraggedItem] = useState<Scene | null>(null);

    useEffect(() => {
        if (videoId) {
            fetchScenes(videoId).then((data) => {
                setScenes(data);
                if (data.length > 0) {
                    setSelectedScene(data[0]); // Select the first scene by default
                }
            });
        }
    }, [videoId]);

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, scene: Scene) => {
        setDraggedItem(scene);
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', scene.id);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetScene: Scene) => {
        e.preventDefault();
        if (!draggedItem) return;

        const newScenes = [...scenes];
        const draggedIndex = newScenes.findIndex((s) => s.id === draggedItem.id);
        const targetIndex = newScenes.findIndex((s) => s.id === targetScene.id);

        if (draggedIndex === -1 || targetIndex === -1) return;

        const [removed] = newScenes.splice(draggedIndex, 1);
        newScenes.splice(targetIndex, 0, removed);
        setScenes(newScenes);
        setDraggedItem(null);
    };

    const handleDragEnd = () => {
        setDraggedItem(null);
    };

    const handleScriptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (selectedScene) {
            setSelectedScene({...selectedScene, script: e.target.value});
            setScenes(scenes.map(s => s.id === selectedScene.id ? {...s, script: e.target.value} : s));
        }
    };

    const handleSettingChange = (setting: keyof Scene['settings'], value: any) => {
        if (selectedScene) {
            const updatedSettings = {...selectedScene.settings, [setting]: value};
            setSelectedScene({...selectedScene, settings: updatedSettings});
            setScenes(scenes.map(s => s.id === selectedScene.id ? {...s, settings: updatedSettings} : s));
        }
    };

    if (!scenes.length && !selectedScene) {
        return <div className="flex justify-center items-center h-screen">Loading editor...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8 h-full flex flex-col">
            <div className="flex flex-grow space-x-4 h-full">
                {/* Left Panel: Scene List */}
                <div className="w-1/4 bg-white p-4 rounded-lg shadow overflow-y-auto">
                    <h2 className="text-xl font-semibold mb-4">Scenes</h2>
                    <div className="space-y-3">
                        {scenes.map((scene) => (
                            <div
                                key={scene.id}
                                className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer ${selectedScene?.id === scene.id ? 'bg-blue-100 border border-blue-500' : 'hover:bg-gray-100'}`}
                                onClick={() => setSelectedScene(scene)}
                                draggable
                                onDragStart={(e) => handleDragStart(e, scene)}
                                onDragOver={handleDragOver}
                                onDrop={(e) => handleDrop(e, scene)}
                                onDragEnd={handleDragEnd}
                            >
                                <img src={scene.imagePreviewUrl} alt={`Scene ${scene.id}`}
                                     className="w-16 h-16 object-cover rounded-md flex-shrink-0"/>
                                <span className="font-medium">Scene {scene.id.replace('scene', '')}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Panels */}
                <div className="flex flex-col w-3/4 space-y-4">
                    {/* Right Top Panel: Video Preview */}
                    <div className="flex-grow bg-black rounded-lg overflow-hidden flex items-center justify-center"
                         style={{minHeight: '300px'}}>
                        {selectedScene ? (
                            <video src={selectedScene.videoPreviewUrl} controls autoPlay
                                   className="w-full h-full object-contain"></video>
                        ) : (
                            <p className="text-white">Select a scene to preview</p>
                        )}
                    </div>

                    {/* Right Bottom Panel: Script and Settings */}
                    <div className="flex-grow grid grid-cols-2 gap-4">
                        {/* Script Editor */}
                        <div className="bg-white p-4 rounded-lg shadow flex flex-col">
                            <h3 className="text-lg font-semibold mb-2">Script</h3>
                            {selectedScene && (
                                <textarea
                                    className="flex-grow w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={selectedScene.script}
                                    onChange={handleScriptChange}
                                ></textarea>
                            )}
                        </div>

                        {/* Scene Settings */}
                        <div className="bg-white p-4 rounded-lg shadow">
                            <h3 className="text-lg font-semibold mb-2">Scene Settings</h3>
                            {selectedScene && (
                                <div className="space-y-3">
                                    <div>
                                        <label className="inline-flex items-center">
                                            <input
                                                type="checkbox"
                                                className="form-checkbox"
                                                checked={selectedScene.settings.animate}
                                                onChange={(e) => handleSettingChange('animate', e.target.checked)}
                                            />
                                            <span className="ml-2">Animate</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label
                                            className="block text-gray-700 text-sm font-bold mb-1">Transition:</label>
                                        <select
                                            className="block w-full p-2 border rounded-md"
                                            value={selectedScene.settings.transition}
                                            onChange={(e) => handleSettingChange('transition', e.target.value)}
                                        >
                                            <option value="none">None</option>
                                            <option value="fade">Fade</option>
                                            <option value="slide">Slide</option>
                                            <option value="wipe">Wipe</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 text-sm font-bold mb-1">Color
                                            Effects:</label>
                                        <select
                                            className="block w-full p-2 border rounded-md"
                                            value={selectedScene.settings.colorEffects}
                                            onChange={(e) => handleSettingChange('colorEffects', e.target.value)}
                                        >
                                            <option value="none">None</option>
                                            <option value="sepia">Sepia</option>
                                            <option value="grayscale">Grayscale</option>
                                        </select>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoEditorPage;