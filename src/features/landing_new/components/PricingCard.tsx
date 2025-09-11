import React from "react";

export default function PricingCard({ title, price, bullets = [], recommended }) {
    return (
        <div className={`pricing-card ${recommended ? "recommended" : ""}`}>
            <div className="title">{title}</div>
            <div className="price">${price}</div>
            <div className="period">per month</div>
            <ul>
                {bullets.map((b,i) => <li key={i}>{b}</li>)}
            </ul>
            <div><button className="btn">Start {title}</button></div>
        </div>
    );
}