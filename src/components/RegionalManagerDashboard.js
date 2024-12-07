// src/components/RegionalManagerDashboard.js

import React from 'react';
import './RegionalMangerDashboard.css'; // Ensure you have a CSS file for styling
import busImage from './assests2/bus-driving-moving-high-motion-600nw-2353562455.webp';

const RegionalManagerDashboard = () => {
    return (
        <div className="regional-manager-dashboard-container">
            <h1>Regional Manager Dashboard</h1>
            <div className="map-placeholder">
                <img src={busImage} alt="Bus" />
                {/* You can replace the placeholder with your actual map component */}
                {/* Example: <MapComponent /> */}
            </div>
        </div>
    );
};

export default RegionalManagerDashboard;
