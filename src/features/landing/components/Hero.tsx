import React from "react";
import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="hero">
            <video className="bg" autoPlay loop muted playsInline>
                <source src="/sample-tour.mp4" type="video/mp4" />
            </video>
            <div className="content container">
                <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
                    Turn Every Listing Into a 24/7 Open Home
                </motion.h1>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="lead">
                    We convert static photos into cinematic video tours, virtually stage rooms, and produce social-ready reels that close more deals.
                </motion.p>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                    <div className="cta-group">
                        <a className="btn" href="#pricing">Get Started</a>
                        <a className="btn ghost-white" href="#case-studies">See Examples</a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}