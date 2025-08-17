import React, {useState} from 'react';
import {
    Chip,
    Box,
    TextField,
    Menu,
    MenuItem,
    SelectChangeEvent,
} from '@mui/material';
import {LocationOn} from "@mui/icons-material";

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
                                                                        onResultsPerPageChange,
                                                                    }) => {
    // anchors for chip menus
    const [sortByAnchor, setSortByAnchor] = useState<null | HTMLElement>(null);
    const [sortOrderAnchor, setSortOrderAnchor] = useState<null | HTMLElement>(null);

    const sortByOpen = Boolean(sortByAnchor);
    const sortOrderOpen = Boolean(sortOrderAnchor);

    // Helpers to keep existing handler signatures
    const fireSortByChange = (value: string) => {
        const ev = {target: {value, name: 'sort_by'}} as unknown as SelectChangeEvent<string>;
        onSortChange(ev);
        setSortByAnchor(null);
    };

    const fireSortOrderChange = (value: 'asc' | 'desc') => {
        const ev = {target: {value, name: 'sort_order'}} as unknown as SelectChangeEvent<'asc' | 'desc'>;
        onSortOrderChange(ev);
        setSortOrderAnchor(null);
    };

    return (
        <Box sx={{display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap'}}>
            <TextField sx={{flexGrow: 1, minWidth: '200px'}} placeholder="Search" value={searchQuery} onChange={onSearchChange}/>

            {/* Sort By chip dropdown (keeps onSortChange signature) */}
            <Chip
                label={sortOption === 'last_modified' ? 'Modified' : 'Created'}
                color="primary"
                variant="outlined"
                onClick={(e) => setSortByAnchor(e.currentTarget)}
                sx={{cursor: 'pointer'}}
            />
            <Menu
                anchorEl={sortByAnchor}
                open={sortByOpen}
                onClose={() => setSortByAnchor(null)}
            >
                <MenuItem onClick={() => fireSortByChange('created')}>Created</MenuItem>
                <MenuItem onClick={() => fireSortByChange('last_modified')}>Modified</MenuItem>
            </Menu>

            {/* Sort Order chip dropdown (keeps onSortOrderChange signature) */}
            <Chip
                label={sortOrder === 'asc' ? 'Ascending' : 'Descending'}
                color="primary"
                variant="outlined"
                onClick={(e) => setSortOrderAnchor(e.currentTarget)}
                sx={{cursor: 'pointer'}}
            />
            <Menu
                anchorEl={sortOrderAnchor}
                open={sortOrderOpen}
                onClose={() => setSortOrderAnchor(null)}
            >
                <MenuItem onClick={() => fireSortOrderChange('asc')}>Ascending</MenuItem>
                <MenuItem onClick={() => fireSortOrderChange('desc')}>Descending</MenuItem>
            </Menu>

            {/* Keeping these props intact; control still available if you uncomment */}
            {/* <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Per Page</InputLabel>
          <Select value={resultsPerPage} label="Per Page" onChange={onResultsPerPageChange}>
              <MenuItem value={12}>12</MenuItem>
              <MenuItem value={24}>24</MenuItem>
              <MenuItem value={48}>48</MenuItem>
          </Select>
      </FormControl> */}
        </Box>
    );
};