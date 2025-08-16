import React from 'react';
import { Box, TextField, MenuItem, Select, InputLabel, FormControl, SelectChangeEvent } from '@mui/material';

interface FilterSortToolbarProps {
    searchQuery: string;
    onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    sortOption: string;
    onSortChange: (event: SelectChangeEvent<string>) => void;
    sortOrder: 'asc' | 'desc';
    onSortOrderChange: (event: SelectChangeEvent<'asc' | 'desc'>) => void;
    resultsPerPage: number;
    onResultsPerPageChange: (event: SelectChangeEvent<number>) => void;
}

export const FilterSortToolbar: React.FC<FilterSortToolbarProps> = ({
    searchQuery,
    onSearchChange,
    sortOption,
    onSortChange,
    sortOrder,
    onSortOrderChange,
    resultsPerPage,
    onResultsPerPageChange
}) => {
    return (
        <Box sx={{ p: 2, display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <TextField
                label="Search"
                variant="filled"
                value={searchQuery}
                onChange={onSearchChange}
                sx={{ flexGrow: 1, minWidth: '200px' }}
            />
            <FormControl sx={{ minWidth: 120 }}>
                <InputLabel>Sort By</InputLabel>
                <Select value={sortOption} label="Sort By" onChange={onSortChange}>
                    <MenuItem value="created_at">Created</MenuItem>
                    <MenuItem value="updated_at">Modified</MenuItem>
                    <MenuItem value="title">Title</MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 120 }}>
                <InputLabel>Order</InputLabel>
                <Select value={sortOrder} label="Order" onChange={onSortOrderChange}>
                    <MenuItem value="asc">Ascending</MenuItem>
                    <MenuItem value="desc">Descending</MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 120 }}>
                <InputLabel>Per Page</InputLabel>
                <Select value={resultsPerPage} label="Per Page" onChange={onResultsPerPageChange}>
                    <MenuItem value={12}>12</MenuItem>
                    <MenuItem value={24}>24</MenuItem>
                    <MenuItem value={48}>48</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};
