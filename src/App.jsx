import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SearchPage from './components/SearchPage';
import PropertyDetail from './components/PropertyDetail';
import propertiesData from './data/properties.json';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  const [favorites, setFavorites] = useState([]);

  //Add favorite only if not already present
  function addFavorite(property) {
    setFavorites((prev) => {
      if (prev.find ((p) => p.id === property.id)) return prev;
      return [...prev, property];
    });
  }

  //Remove favorite by id
  function removeFavorite(id) {
    setFavorites ((prev) => prev.filter((p) => p.id !== id));
  }

  //Clear all favorites
  function clearFavorites() {
    setFavorites([]);
  }

  return (
    <DndProvider backend = {HTML5Backend} >
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {
            <SearchPage 
              properties={propertiesData.properties}
              favorites={favorites}
              addFavorite={addFavorite}
              removeFavorite={removeFavorite}
              clearFavorites={clearFavorites}
            />
            }
          />
          <Route path="/property/:id" element={
            <PropertyDetail
              properties={propertiesData.properties}
              favorites={favorites}
              addFavorite={addFavorite}
              removeFavorite={removeFavorite}
            />  
          }
          />
        </Routes>
      </BrowserRouter>
    </DndProvider>
  );
}

export default App;
