// src/DriverPage.js
import React from 'react';
import './DriverPage.css'; // Ensure the CSS file is correctly imported

function DriverPage() {
    return (
        <div className="driver-page">
            <h2>Driver Details</h2>
            <input
                type="text"
                className="search-bar"
                placeholder="Search for a driver..."
                onChange={(e) => {
                    const searchInput = e.target.value.toLowerCase();
                    document.querySelectorAll('#driverList li').forEach((li) => {
                        const text = li.textContent || li.innerText;
                        li.style.display = text.toLowerCase().indexOf(searchInput) > -1 ? '' : 'none';
                    });
                }}
            />
            <div className="driver-list">
                <ul id="driverList">
                    <li>Driver 1</li>
                    <li>Driver 2</li>
                    <li>Driver 3</li>
                </ul>
            </div>
            <div className="driver-details">
                {/* Content specific to DriverPage can go here */}
                <p>Select a driver to view more details</p>
            </div>
        </div>
    );
}

export default DriverPage;

