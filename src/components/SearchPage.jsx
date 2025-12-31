import React, { useState, useMemo } from "react";
import SearchForm from './SearchForm';
import PropertyList from './PropertyList';
import Favorites from './Favourites';

export default function SearchPage({ 
    properties, 
    favorites, 
    addFavorite, 
    removeFavorite, 
    clearFavorites 
}) {
    const [searchFilters, setSearchFilters] = useState ({
        type: '',
        minPrice: '',
        maxPrice: '',
        minBedrooms: '',
        maxBedrooms: '',
        afterDate: '',
        postcodeArea: '',
    });

    

    return (
        <div className="App" style={{display: 'flex', gap: '1rem'}}>
            <div style={{ flex: '1 1 65%'}}>
                <h1>Property Search</h1>

                <SearchForm 
                    searchFilters={searchFilters} 
                    setSearchFilters={setSearchFilters} 
                />

                <PropertyList
                    properties={filteredProperties}
                    favorites={favorites}
                    addFavorite={addFavorite}
                    removeFavorite={removeFavorite}
                />    
            </div>

            <Favorites 
                favorites={favorites} 
                addFavorite={addFavorite} 
                removeFavorite={removeFavorite} 
                clearFavorites={clearFavorites} />
        </div>
    );
}