import React from 'react';
import { Box, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

export const FilterSortToolbar: React.FC = () => {
    return (
        <Box sx={{ p: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
            <TextField label="Search" variant="outlined" sx={{ flexGrow: 1 }} />
            <FormControl>
                <InputLabel>Sort By</InputLabel>
                <Select label="Sort By">
                    <MenuItem value="name">Name</MenuItem>
                    <MenuItem value="date_created">Date Created</MenuItem>
                    <MenuItem value="date_modified">Date Modified</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};