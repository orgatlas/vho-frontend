import React from "react";

/* Simple device frame that plays a video */
export default function VideoMockup({ src, poster, label }) {
    return (
        <div style={{textAlign:"center"}}>
            <div style={{marginBottom:12,fontWeight:700}}>{label}</div>
            <div className="device-frame">
                <div className="device-screen">
                    <video src={src} poster={poster} controls muted loop playsInline style={{display:"block",width:"100%"}}/>
                </div>
            </div>
        </div>
    );
}