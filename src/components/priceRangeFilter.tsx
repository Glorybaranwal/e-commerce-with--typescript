// components/priceRangeFilter.tsx
import React from 'react';
import Slider from 'react-slider';
import { Box, Typography } from '@mui/material';

interface PriceRangeFilterProps {
    minPrice: number;
    maxPrice: number;
    onPriceChange: (values: [number, number]) => void;
}

const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({ minPrice, maxPrice, onPriceChange }) => {
    return (
        <Box className="border border-gray-200 rounded p-4">
            <Typography variant="body1" className="mb-4">Filter by Price</Typography>
            <Slider
                min={0}
                max={1000}
                value={[minPrice, maxPrice]}
                onChange={onPriceChange}
                step={10}
                renderThumb={(props, state) => <div {...props} className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center">{state.valueNow}</div>}
                renderTrack={(props, state) => <div {...props} className="bg-blue-300 h-2 rounded" />}
                pearling
                minDistance={0}
                className="price-slider"
            />
            {/* <Box display="flex" justifyContent="space-between" className="mt-2">
                <Typography variant="body2">${minPrice}</Typography>
                <Typography variant="body2">${maxPrice}</Typography>
            </Box> */}
        </Box>
    );
};

export default PriceRangeFilter;
