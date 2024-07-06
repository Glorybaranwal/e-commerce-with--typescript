import { FormControl, InputLabel, MenuItem, NativeSelect, Select } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import _ from 'lodash';

interface FiltersProps {
    categories: string[];
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
}

const Filters: React.FC<FiltersProps> = ({ categories, selectedCategory, onCategoryChange }) => {
    const [cat_list, setCategoryList] = useState<string>(selectedCategory ? selectedCategory : "")
    return (
        <div className="mb-4">
            <FormControl fullWidth>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    size='small'
                    defaultValue={""}
                    value={cat_list}
                    onChange={(e: any) => {
                        onCategoryChange(e.target.value)
                        setCategoryList(e.target.value)
                    }}
                >
                    <MenuItem value="">All Categories</MenuItem>
                    {categories.map((category) => (
                        <MenuItem key={category} value={category}>
                            {_.startCase(category)}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

        </div>
    );
};

export default Filters;
