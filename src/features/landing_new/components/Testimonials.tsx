import React from "react";
import SimpleCarousel from "./SimpleCarousel";
import ScrollReveal from "./ScrollReveal";

const TESTS = [
    {quote:"VirtualHomeOpen turned our listings into a constant lead magnet.", name:"Lina R., Agent"},
    {quote:"We doubled virtual showings in the first month.", name:"Mark D., Broker"},
    {quote:"The social clips are perfect for our Instagram ads.", name:"Sofia P., Marketer"}
];

export default function Testimonials() {
    return (
        <section className="section container">
            <ScrollReveal>
                <div className="section-header">
                    <h2 className="heading-2">What agents say</h2>
                </div>
                <div className="mt-lg">
                    <SimpleCarousel items={TESTS.map((t,i)=>(
                        <div key={i} className="testimonial-card">
                            <div className="quote">“{t.quote}”</div>
                            <div className="name mt-md">- {t.name}</div>
                        </div>
                    ))}/>
                </div>
            </ScrollReveal>
        </section>
    );
}