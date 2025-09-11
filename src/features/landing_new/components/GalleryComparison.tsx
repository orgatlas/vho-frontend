import React, { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import VideoMockup from "./VideoMockup";
import SimpleCarousel from "./SimpleCarousel";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";

/* Show an agent gallery on left, generated video on right; cycles through examples */
const EXAMPLES = [
    { id: 1, images: ["/sample-gallery.jpg", "/sample-gallery.jpg"], video: "/sample-tour.mp4", title: "Modern 3BR - Downtown" },
    { id: 2, images: ["/sample-gallery.jpg"], video: "/sample-tour.mp4", title: "Seaside Villa" }
];

export default function GalleryComparison() {
    const [index, setIndex] = useState(0);
    const ex = EXAMPLES[index];
    return (
        <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
            <Container>
                <ScrollReveal>
                    <Box sx={{ textAlign: 'center', mb: { xs: 8, md: 10 } }}>
                        <Typography variant="h2" component="h2" sx={{ fontWeight: 700 }}>
                            From your photos → to a tour
                        </Typography>
                    </Box>
                    <Grid container spacing={{ xs: 4, md: 8 }} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Typography variant="h5" component="h3" sx={{ mb: 2, fontSize: '24px' }}>
                                {ex.title}
                            </Typography>

                            <SimpleCarousel items={ex.images.map((src, i) => (
                                <Box key={i} sx={{ p: 1 }}>
                                    <Box
                                        component="img"
                                        src={src}
                                        alt="gallery"
                                        sx={{
                                            borderRadius: '16px',
                                            boxShadow: 3,
                                            width: '100%',
                                            display: 'block'
                                        }}
                                    />
                                </Box>
                            ))}/>

                            <Stack direction="row" spacing={1} sx={{ mt: 4 }}>
                                {EXAMPLES.map((e, i) => (
                                    <Button
                                        key={e.id}
                                        onClick={() => setIndex(i)}
                                        variant={i === index ? "contained" : "outlined"}
                                    >
                                        {i + 1}
                                    </Button>
                                ))}
                            </Stack>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <VideoMockup src={ex.video} poster={ex.images[0]} label="Generated cinematic tour" />
                        </Grid>
                    </Grid>
                </ScrollReveal>
            </Container>
        </Box>
    );
}
