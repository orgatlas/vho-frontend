import React from "react";
import CaseStudyCard from "./CaseStudyCard";
import ScrollReveal from "./ScrollReveal";

const CASES = [
    {id:1,title:"Urban Condo", video:"/sample-tour.mp4", result:"+33% enquiries"},
    {id:2,title:"Suburban 4BR", video:"/sample-tour.mp4", result:"+21% faster sale"}
];

export default function CaseStudies(){
    return (
        <section id="case-studies" className="section container">
            <ScrollReveal>
                <div className="section-header">
                    <h2 className="heading-2">Case studies</h2>
                </div>
                <div className="case-studies-grid mt-lg">
                    {CASES.map(cs => <CaseStudyCard key={cs.id} {...cs} />)}
                </div>
            </ScrollReveal>
        </section>
    );
}