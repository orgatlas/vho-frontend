import React from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

/* Wrapper that reveals children when scrolled into view */
export default function ScrollReveal({ children, className = "", threshold = 0.12 }) {
    const [ref, inView] = useInView({triggerOnce:true,threshold});
    return (
        <motion.div ref={ref} initial={{ opacity:0, y:20 }} animate={ inView ? { opacity:1, y:0 } : {} } transition={{ duration:0.6 }}>
            <div className={className}>{children}</div>
        </motion.div>
    );
}