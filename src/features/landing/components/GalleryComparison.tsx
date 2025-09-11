import React, { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import VideoMockup from "./VideoMockup";
import SimpleCarousel from "./SimpleCarousel";

/* Show an agent gallery on left, generated video on right; cycles through examples */
const EXAMPLES = [
    { id:1, images:["/sample-gallery.jpg","/sample-gallery.jpg"], video:"/sample-tour.mp4", title:"Modern 3BR - Downtown" },
    { id:2, images:["/sample-gallery.jpg"], video:"/sample-tour.mp4", title:"Seaside Villa" }
];

export default function GalleryComparison() {
    const [index,setIndex] = useState(0);
    const ex = EXAMPLES[index];
    return (
        <section className="section container">
            <ScrollReveal>
                <div className="section-header">
                    <h2 className="heading-2">From your photos → to a tour</h2>
                </div>
                <div className="gallery-grid">
                    <div>
                        <h3 className="heading-3 mb-md">{ex.title}</h3>
                        <div className="gallery-carousel-wrap">
                            <SimpleCarousel items={ex.images.map((src,i)=>(
                                <div key={i} style={{padding:8}}>
                                    <img src={src} alt="gallery"/>
                                </div>
                            ))}/>
                        </div>
                        <div className="gallery-nav">
                            {EXAMPLES.map((e, i) => (
                                <button key={e.id} onClick={() => setIndex(i)} className={i===index ? "btn" : "btn ghost"}>{i+1}</button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <VideoMockup src={ex.video} poster={ex.images[0]} label="Generated cinematic tour" />
                    </div>
                </div>
            </ScrollReveal>
        </section>
    );
}