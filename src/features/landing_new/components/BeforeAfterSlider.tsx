import React from "react";
import ReactCompareImage from "react-compare-image";
import ScrollReveal from "./ScrollReveal";

export default function BeforeAfterSlider() {
    return (
        <section className="section section-gray">
            <div className="container">
                <ScrollReveal>
                    <div className="section-header">
                        <h2 className="heading-2">Before → After: Virtual Staging</h2>
                        <p>Drag to compare an empty room vs a virtually staged result.</p>
                    </div>
                    <div className="compare-wrap">
                        <ReactCompareImage leftImage="/empty-room.jpg" rightImage="/staged-room.jpg" />
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}