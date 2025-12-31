import React from "react";
import PropertyCard from './PropertyCard';

export default function PropertyList({
    properties,
    favorites,
    addFavorite,
    removeFavorite }) { 
    
        if (properties.length === 0) {
            return <p>No properties match your criteria</p>;
        }

        return (
            <div className="property-list" style={{ 
                display: 'grid',
                gap: '1rem',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))'
            }}>
                {properties.map((property) => (
                    <PropertyCard
                        key={property.id}
                        property={property}
                        isFavorited={favorites.some((fav) => fav.id === property.id)}
                        addFavorite={addFavorite}
                        removeFavorite={removeFavorite}
                    />
                ))}    
            </div>
        );
    }