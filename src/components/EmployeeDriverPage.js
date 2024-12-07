// src/components/EmployeeDriverPage.js

import React from 'react';
import './EmployeeDriverPage.css'; // Ensure you have a CSS file for styling
import busImage from './assests2/bus-driving-moving-high-motion-600nw-2353562455.webp';

const EmployeeDriverPage = () => {
    return (
        <div className="employee-driver-map-container">
            <h1>Driver/Conductor Dashboard</h1>
            <div className="map-placeholder">
                <img src={busImage} alt="Bus" />
                {/* You can replace the placeholder with your actual map component */}
                {/* Example: <MapComponent /> */}
            </div>
        </div>
    );
};

export default EmployeeDriverPage;
