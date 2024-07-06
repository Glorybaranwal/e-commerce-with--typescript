import { TextField } from '@mui/material';
import { ChangeEvent } from 'react';

interface SearchProps {
    searchQuery: string;
    handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Search: React.FC<SearchProps> = ({ searchQuery, handleSearchChange }) => {
    return (
        <div className="mb-4">
            <TextField id="outlined-basic" variant="outlined"
                fullWidth
                type="text"
                size='small'
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search products..."
                className="border p-2 rounded w-full" />
            {/* <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search products..."
                className="border p-2 rounded w-full"
            /> */}
        </div>
    );
};

export default Search;
