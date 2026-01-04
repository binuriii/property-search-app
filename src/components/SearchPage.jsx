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

    // Filter properties based on search filters
    const filteredProperties = useMemo(() => {
        return properties.filter((property) => {
            // Filter by type
            if (searchFilters.type && searchFilters.type !== 'any' && property.type.toLowerCase() !== searchFilters.type.toLowerCase()) {
               return false;
            }


            // Filter by price range
            if (searchFilters.minPrice && property.price < Number(searchFilters.minPrice))
               return false;
            if (searchFilters.maxPrice && property.price > Number(searchFilters.maxPrice))
               return false;
          
            // Filter by bedrooms range
            if (searchFilters.minBedrooms && property.bedrooms < Number(searchFilters.minBedrooms))
               return false;
            if (searchFilters.maxBedrooms && property.bedrooms > Number(searchFilters.maxBedrooms))
               return false;
          
            // Filter by date added which is afterDate
            if (searchFilters.afterDate) {
                const propertyDate = new Date(property.added.year, new Date(`${property.added.month} 1, 2000`).getMonth(), property.added.day);
                const filterDate = new Date(searchFilters.afterDate);
                if (propertyDate < filterDate) return false;
            }


            // Filter by postcode area (use code which is last part)
            if (searchFilters.postcodeArea) {
                const parts = property.location.trim().split(" ");
                const propertyArea = parts[parts.length - 1].toLowerCase();  //br5

                if ( !propertyArea.startsWith(searchFilters.postcodeArea.toLowerCase())) {
                    return false;
                }
            }
            
            return true;
        });
    }, [properties, searchFilters]);

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