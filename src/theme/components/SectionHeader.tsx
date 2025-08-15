
import React from 'react';
import {Box, IconButton, Tooltip, Typography} from "@mui/material";
import {HelpOutline} from "@mui/icons-material";

export const SectionHeader: React.FC<{ icon: React.ReactNode, title: string, tooltip: string }> = ({icon, title, tooltip}) => (
    <Box sx={{display: 'flex', alignItems: 'center', mb: 1}}>
        {icon}
        <Typography variant="h6" sx={{ml: 1}}>{title}</Typography>
        <Tooltip title={tooltip}>
            <IconButton size="small" sx={{ml: 1}}>
                <HelpOutline fontSize="small"/>
            </IconButton>
        </Tooltip>
    </Box>
);
