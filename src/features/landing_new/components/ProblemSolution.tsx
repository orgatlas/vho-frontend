import React from "react";
import { motion } from "framer-motion";
import VideoMockup from "./VideoMockup";

export default function ProblemSolution() {
    return (
        <section className="section container">
            <div className="grid grid-cols-2 items-center">
                <motion.div initial={{ x:-30, opacity:0 }} whileInView={{ x:0, opacity:1 }} transition={{duration:0.6}}>
                    <h2 className="heading-2">The problem — static photos don't sell</h2>
                    <p className="text-secondary mt-md">
                        Traditional listings rely on still photos — buyers can't feel the flow of the home, are less engaged, and agents spend time on low-converting marketing.
                    </p>

                    <h3 className="heading-3 mt-lg">The solution — cinematic tours from your existing photos</h3>
                    <p className="text-secondary mt-sm">
                        Upload a gallery; we'll stitch a cinematic video tour, virtually stage rooms where needed, and produce short-form social clips that drive enquiries.
                    </p>
                    <ul className="mt-md">
                        <li>Upload once — get a video tour, staged images, and social reels.</li>
                        <li>Fast turnaround (hours to 48h depending on volume).</li>
                        <li>Optimised for mobile viewers and social platforms.</li>
                    </ul>
                </motion.div>

                <motion.div initial={{ x:30, opacity:0 }} whileInView={{ x:0, opacity:1 }} transition={{duration:0.6}}>
                    <VideoMockup src="/sample-tour.mp4" poster="/sample-gallery.jpg" label="From gallery to cinematic tour" />
                </motion.div>
            </div>
        </section>
    );
}