import React from "react";
import ScrollReveal from "./ScrollReveal";

const STATS = [
    {num:"27%", label:"More leads (avg.)"},
    {num:"80%", label:"Buyers engage with tours"},
    {num:"4x", label:"Social reach uplift"},
];

export default function Stats() {
    return (
        <section className="section section-gray">
            <div className="container">
                <ScrollReveal>
                    <div className="section-header">
                        <h2 className="heading-2">Proof in numbers</h2>
                    </div>
                    <div className="stats-grid">
                        {STATS.map((s,i)=>(
                            <div className="stat" key={i}>
                                <div className="num">{s.num}</div>
                                <div className="label">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}