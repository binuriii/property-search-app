import React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField, MenuItem } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

const propertyTypes = [
    { value: 'any', label: 'Any' },
    { value: 'House', label: 'House' },
    { value: 'Flat', label: 'Flat'}
];

export default function SearchForm({ searchFilters, setSearchFilters }) {
    const handleChange = (field, value) => {
        setSearchFilters((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    return (
        <form
            className="search-form"
            onSubmit={(e) => e.preventDefault()}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1rem'}}
        >
            <TextField
                select label="Property Type"
                value={searchFilters.type}
                onChange={(e) => handleChange('type', e.target.value)}
                variant='outlined'
                size='small'
            >
                {propertyTypes.map((option) => (
                    <MenuItem key={option.value} value={option.value === 'any' ? '' : option.value}>
                        {option.label}
                    </MenuItem>    
                ))}
            </TextField>

            <TextField
                type='number'
                label='Min Price'
                value={searchFilters.minPrice}
                onChange={(e) => handleChange('minPrice', e.target.value)}
                variant='outlined'
                size='small'
                inputProps={{ min: 0 }}
            />

            <TextField
                type='number'
                label='Max Price'
                value={searchFilters.maxPrice}
                onChange={(e) => handleChange('maxPrice', e.target.value)}
                variant='outlined'
                size='small'
                inputProps={{ min: 0 }}
            />

            <TextField
                type='number'
                label='Min Bedrooms'
                value={searchFilters.minBedrooms}
                onChange={(e) => handleChange('minBedrooms', e.target.value)}
                variant='outlined'
                size='small'
                inputProps={{ min: 0 }}
            />

            <TextField
                type='number'
                label='Max Bedrooms'
                value={searchFilters.maxBedrooms}
                onChange={(e) => handleChange('maxBedrooms', e.target.value)}
                variant='outlined'
                size='small'
                inputProps={{ min: 0 }}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label='Added After'
                    value={searchFilters.afterDate ? dayjs(searchFilters.afterDate) : null}
                    onChange={(newValue) => {
                        handleChange('afterDate', newValue ? newValue.toISOString() : '');
                    }}
                    renderInput={(params) => <TextField {...params} size='small' />}
                    inputFormat="DD/MM/YYYY"
                    clearable
                />    
            </LocalizationProvider>

            <TextField
                type='Postcode Area'
                value={searchFilters.postcodeArea}
                onChange={(e) => handleChange('postcodeArea', e.target.value)}
                variant='outlined'
                size='small'
            />
        </form>
    );
}