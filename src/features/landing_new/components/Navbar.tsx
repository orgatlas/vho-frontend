import React, { useEffect, useState } from "react";

export default function Navbar() {
    const [solid, setSolid] = useState(false);
    useEffect(() => {
        const onScroll = () => setSolid(window.scrollY > 40);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    return (
        <header className={`navbar ${solid ? "solid" : ""}`}>
            <div className="container">
                <div className="brand">VirtualHomeOpen</div>
                <div className="nav-actions">
                    <a href="#case-studies">Portfolio</a>
                    <a href="#pricing">Pricing</a>
                    <a className="btn ghost" href="#contact">Book Demo</a>
                </div>
            </div>
        </header>
    );
}