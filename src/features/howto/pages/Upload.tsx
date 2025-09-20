import React, {useState} from 'react';
import {Box, Container, Typography, TextField, MenuItem, Card, CardContent} from '@mui/material';

const instructions: Record<string, string[]> = {
    "Agentbox": [
        "Log in to Agentbox.",
        "Open the property listing you want to edit.",
        "Find the field labeled 'Video URL'.",
        "Paste your Virtual Home Open (VHO) share link, or paste the YouTube URL if you have uploaded your VHO video to YouTube.",
        "Save and publish your changes — the video will appear on linked portals."
    ],
    "Box+Dice": [
        "Log in to Box+Dice.",
        "Open the listing record.",
        "Locate the 'Video Link' field.",
        "Paste your VHO share link, or the YouTube URL of your downloaded/uploaded VHO video.",
        "Save and sync with portals."
    ],
    "VaultRE": [
        "Log in to VaultRE.",
        "Navigate to the property listing.",
        "Go to the 'Links & Media' section.",
        "Add your VHO share link, or paste the YouTube link if required.",
        "Save — VaultRE will push it to connected portals."
    ],
    "Rex": [
        "Log in to Rex CRM.",
        "Open the property record.",
        "Scroll to 'Marketing' or 'Multimedia' section.",
        "Paste your VHO link or YouTube URL.",
        "Save and update feeds."
    ],
    "EagleCRM": [
        "Log in to EagleCRM.",
        "Go to the listing editor.",
        "Find the 'Video URL' field.",
        "Insert your VHO share link or YouTube link.",
        "Save changes to update portals."
    ],
    "PropertyTree": [
        "Log in to PropertyTree.",
        "Open the listing details.",
        "Locate the video/media section.",
        "Paste your VHO share link or YouTube URL.",
        "Save and publish."
    ],
    "Realtair": [
        "Log in to Realtair.",
        "Go to the property listing.",
        "Find the video/URL input field.",
        "Paste your VHO link or YouTube URL.",
        "Save and confirm updates."
    ],
    "Domain": [
        "Domain supports video links via your CRM integration.",
        "Make sure your CRM listing has the VHO link or YouTube URL entered in the video field.",
        "Domain will automatically pull the video when synced."
    ],
    "realestate.com.au": [
        "realestate.com.au requires a YouTube video link for display.",
        "Download your VHO video and upload it to your YouTube channel.",
        "Copy the YouTube link.",
        "Paste it into your CRM's 'Video URL' field.",
        "When the listing syncs, the video will show on realestate.com.au."
    ],
    "Zillow": [
        "Log in to your Zillow agent dashboard.",
        "Edit your property listing.",
        "Go to the 'Media' section.",
        "Paste your VHO share link or YouTube link.",
        "Save to update."
    ],
    "Realtor.com": [
        "Log in to Realtor.com professional dashboard.",
        "Edit the property listing.",
        "Find the video/virtual tour link field.",
        "Paste your VHO share link or YouTube URL.",
        "Save and publish."
    ]
};

export const HowToUpload: React.FC = () => {
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState("");

    const crmOptions = Object.keys(instructions).filter(crm =>
        crm.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Box>
            <Container maxWidth="md" sx={{py: {xs: 4, md: 8}, color: 'text.primary'}}>
                <Typography variant="h2" component="h1" textAlign="center" fontWeight="bold" gutterBottom>
                    How to Add Your Virtual Home Open Video
                </Typography>
                <Typography textAlign="center">
                    Select your CRM or listing portal below to see step-by-step instructions for adding your video from
                    Virtual Home Open.
                </Typography>

                <TextField
                    fullWidth
                    select
                    value={selected}
                    onChange={(e) => setSelected(e.target.value)}
                    sx={{mt: 4}}
                    SelectProps={{displayEmpty: true}}
                >
                    <MenuItem value="" disabled>
                        Select or search your CRM/Portal
                    </MenuItem>
                    {crmOptions.map((crm) => (
                        <MenuItem key={crm} value={crm}>
                            {crm}
                        </MenuItem>
                    ))}
                </TextField>

                {selected && (
                    <Card sx={{mt: 6}}>
                        <CardContent>
                            <Typography variant="h4" component="h2" gutterBottom>
                                {selected}
                            </Typography>
                            {instructions[selected].map((step, idx) => (
                                <Typography key={idx} variant="body1" paragraph>
                                    {idx + 1}. {step}
                                </Typography>
                            ))}
                        </CardContent>
                    </Card>
                )}
            </Container>
        </Box>
    );
};