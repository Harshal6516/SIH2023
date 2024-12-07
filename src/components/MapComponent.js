// src/components/MapComponent.js

import React from 'react';
import './MapComponent.css';
import busImage from './assests2/bus-driving-moving-high-motion-600nw-2353562455.webp'; // Adjust path as needed

const MapComponent = () => {
    return (
        <div className="image-container">
            <img src={busImage} alt="Bus" className="bus-image" />
        </div>
    );
};

export default MapComponent;
