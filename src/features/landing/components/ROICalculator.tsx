import React, { useState } from "react";
import ScrollReveal from "./ScrollReveal";

export default function ROICalculator() {
    const [price,setPrice] = useState(600000);
    const [listings,setListings] = useState(4);
    const commissionRate = 0.02; // example 2%
    const conversionLift = 0.27; // 27% lift
    const expectedExtra = Math.round(price * commissionRate * conversionLift * listings);

    return (
        <section className="section">
            <div className="container">
                <ScrollReveal>
                    <div className="roi-calculator">
                        <div className="section-header">
                            <h2 className="heading-2">ROI calculator</h2>
                            <p>Estimate additional commission from better listings & tours.</p>
                        </div>

                        <div className="roi-fields">
                            <input className="input" type="number" value={price} onChange={e => setPrice(Number(e.target.value))} />
                            <input className="input" type="number" value={listings} onChange={e => setListings(Number(e.target.value))} />
                        </div>

                        <div className="roi-result">
                            <div className="label">Est. extra commission / month</div>
                            <div className="amount">${expectedExtra.toLocaleString()}</div>
                            <div className="note">Based on {Math.round(conversionLift*100)}% conversion lift from enhanced tours & staging</div>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}