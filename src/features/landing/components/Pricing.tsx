import React from "react";
import PricingCard from "./PricingCard";
import ScrollReveal from "./ScrollReveal";

const PLANS = [
    {id:"starter",title:"Starter",price:49, bullets:["1 Tour / month", "Basic staging", "Social clip"]},
    {id:"pro",title:"Pro",price:149,bullets:["5 Tours / month", "Premium staging", "3 Social clips"], recommended:true},
    {id:"team",title:"Team",price:399,bullets:["20 Tours / month", "Priority support", "Custom reels"]}
];

export default function Pricing(){
    return (
        <section id="pricing" className="section container">
            <ScrollReveal>
                <div className="section-header">
                    <h2 className="heading-2">Pricing</h2>
                </div>
                <div className="pricing-grid">
                    {PLANS.map(p => <PricingCard key={p.id} {...p} />)}
                </div>
            </ScrollReveal>
        </section>
    );
}