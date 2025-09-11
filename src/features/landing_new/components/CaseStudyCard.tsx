import React from "react";
import VideoMockup from "./VideoMockup";

export default function CaseStudyCard({ title, video, result }) {
    return (
        <div className="card interactive case-study-card">
            <h3 className="font-bold">{title}</h3>
            <div className="mt-md">
                <VideoMockup src={video} poster="/sample-gallery.jpg" label="Tour preview" />
            </div>
            <div className="result">{result}</div>
            <div className="summary">Short summary showing process and key metric.</div>
        </div>
    );
}