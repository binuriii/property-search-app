import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../dndTypes';

export default function PropertyDetail({ 
    properties, 
    favorites,
    addFavorite,
    removeFavorite
}) {
    const { id } = useParams();
    const property = properties.find((p) => String(p.id) === id);

    // Drag hook to enable  drag to favorites
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.PROPERTY,
        item: { property },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <div style={{ padding: '1rem', maxWidth: '900px', margin: 'auto'}}>
            <Link to="/">← Back to Search</Link>
            <h1>{property.type} - ${property.price.toLocaleString()}</h1>
            <p><strong>Location:</strong> {property.location}</p>
        </div>
    )
}