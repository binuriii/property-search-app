import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from '../dndTypes';

/* Remove drop zone */
function RemoveZone({ removeFavorite }) {
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: [ItemTypes.FAVORITE],
        drop: (item) => {
            removeFavorite(item.id);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
        }),
    });

    return (
        <div
            ref={drop}
            style={{
                marginTop: '1rem',
                padding: '1rem',
                border: '2px dashed red',
                borderRadius: '8px',
                backgroundColor: isOver && canDrop ? '#ffecec' : '#fff0f0',
                color: 'red',
                textAlign: 'center',
                fontWeight: 'bold',
                cursor: 'pointer',
                userSelect: 'none',
            }}
            aria-label="Remove favorite drop zone"
        >
            Drag here to remove favorite
        </div>    
    );
}

/* Single favorite item */
function FavoriteItem({ property, removeFavorite}) {
    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.FAVORITE,
        item: { id: property.id},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return (
        <li
            ref={drag}
            style={{
                marginBottom: '1rem',
                borderBottom: '1px solid #ddd',
                paddingBottom: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                opacity: isDragging ? 0.5 : 1,
                cursor: 'grab',
            }}
        >
            <img
                src={property.picture}
                alt={`${property.type} at ${property.location}`}
                style={{
                    width: '80px',
                    height: '50px',
                    objectFit: 'cover',
                    borderRadius: '4px',
                    marginRight: '0.5rem',
                }}
            />

            <div>
                <strong>{property.type}</strong>
                <br />
                ${property.price.toLocalesString()}
            </div>

            <button
                onClick={() => removeFavorite(property.id)}
                style={{ marginLeft: 'auto' }}
                aria-label='Remove from favourites'
            >
                ❌
            </button>        
        </li>    
    );
}

/* Main favorite component */
export default function Favorites({
    favorites,
    addFavorite,
    removeFavorite,
    clearFavorites
}) {

    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes.PROPERTY,
        drop: (item) => {
            addFavorite(item.property);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    return (
        <aside
            ref={drop} 
            style={{
                flex: '0 0 300px',
                border: '2px dashed #007bff',
                padding: '1rem',
                minHeight: '400px',
                backgroundColor: isOver ? '#e6f0ff': '#f9f9f9',
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
            }}
            aria-label="Favorites List Drop Area"
        >
            <h2>Favorites</h2>

            {favorites.length === 0 ? (
                <p>No favorite properties yet. Drag properties here or use the button.</p>
            ) : (
            <>
                <ul
                    style={{
                        listStyle: 'none',
                        padding: 0,
                        maxHeight: '300px',
                        overflowY: 'auto',
                        flexGrow: 1,
                    }}
                >
                    {favorites.map((property) => (
                       <FavoriteItem
                            key={property.id}
                            property={property}
                            removeFavorite={removeFavorite}
                        />
                    ))}
                </ul>

                <button onClick={clearFavorites} 
                        aria-label="Clear all favorites" 
                        style={{ marginTop: '1rem' }}
                >
                    Clear Favorites    
                </button>

                <RemoveZone removeFavorite={removeFavorite}/>    
            </>
        )}    
        </aside>
    );
}