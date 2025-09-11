import React from "react";
import { motion } from "framer-motion";

export default function FeatureCard({ title, text, icon }) {
  return (
    <motion.div whileHover={{ y:-6 }} className="card interactive feature-card">
      <div className="icon">{icon}</div>
      <h3 className="heading-3">{title}</h3>
      <p>{text}</p>
    </motion.div>
  );
}