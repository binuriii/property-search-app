import React from 'react';
import { Link } from 'react-router-dom';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../dndTypes';

export default function PropertyCard({
    property,
    isFavorited,
    addFavorite,
    removeFavorite }) {

    return (
        <div
            ref={drag}
            className='property-card'
            style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '0.5rem',
                backgroundColor: '#fff',
            }}
        >
            <Link to={`/property/${property.id}`}>
                <img
                    src={property.picture}
                    style={{ width: '100%',
                             height: '180px',
                             objectFit: 'cover',
                             borderRadius: '6px'
                    }}
                />
                <h3 style={{ margin: '0.5rem 0'}}>
                    {property.type} - ${property.price.toLocaleString()}
                </h3>    
            </Link>

            <p>{property.description.slice(0, 80)}...</p>

            {/* Add visible location here */}        
            <p><strong>Location:</strong> {property.location}</p>

            <p><strong>Bedrooms:</strong> {property.bedrooms}</p>

            {isFavorited ? (
                <button onClick={() => removeFavorite(property.id)} aria-label='Remove from favorites'>
                    Remove Favorite
                </button>
            ) : (
                <button onClick={() => addFavorite(property)} aria-label='Add to favorites'>
                    Add to Favorites
                </button>
            )} 
        </div>    
    );
}
    










    