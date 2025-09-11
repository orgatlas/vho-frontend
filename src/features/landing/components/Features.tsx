import React from "react";
import FeatureCard from "./FeatureCard";
import ScrollReveal from "./ScrollReveal";

export default function Features() {
    const items = [
        {title:"Virtual Home Tours", text:"Static photos → cinematic walkthrough videos that run 24/7.", icon:"🎥"},
        {title:"Virtual Staging", text:"Empty room? We digitally stage to increase buyer interest.", icon:"🛋️"},
        {title:"Social Content", text:"Short, platform-ready reels and images for Instagram/TikTok", icon:"📱"},
    ];
    return (
        <section className="section container">
            <ScrollReveal>
                <div className="section-header">
                    <h2 className="heading-2">What we do</h2>
                </div>
                <div className="features-grid">
                    {items.map((it, i) => <FeatureCard key={i} title={it.title} text={it.text} icon={it.icon} />)}
                </div>
            </ScrollReveal>
        </section>
    );
}