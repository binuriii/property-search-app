import React from "react";

export default function Favourites({
    favorites,
    removeFavorite,
    clearFavorites
}) {

    return (
        <aside 
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
                        <li
                            key={property.id}
                            style={{
                                marginBottom: '1rem',
                                borderBottom: '1px solid #ddd',
                                paddingBottom: '0.5rem',
                                display: 'flex',
                                alignItems: 'center',    
                            }}
                        >
                            <img
                                src={property.picture}
                                alt={`${property.type} at ${property.location}`}
                                style={{ width: '80px', height: '50px', objectFit: 'cover', borderRadius: '4px', marginRight: '0.5rem'}}
                            />
                            <strong>{property.type}</strong> -${property.price.toLocalString()}
                            <button
                                onClick={() => removeFavorite(property.id)}
                                style={{ marginLeft: 'auto' }}
                                aria-label={`Remove ${property.type} from favorites`}
                            >
                              ❌    
                            </button>    
                        </li>        
                    ))}
                </ul>
                <button onClick={clearFavorites} aria-label="Clear all favorites" style={{ marginTop: '1rem' }}>
                    Clear Favorites    
                </button>

                {/* Remove drop zone to drag favorites onto for removing */}
                <RemoveZone removeFavorite={removeFavorite}/>    
            </>
        )}    
        </aside>
    );
}