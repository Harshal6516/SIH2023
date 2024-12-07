import React from 'react';
import './App.css'; // Make sure to import the CSS file for styling

function ConductorPage() {
    return (
        <div className="conductor-page">
            <h2>Conductor List</h2>
            {/* Search bar for filtering conductors */}
            <input
                type="text"
                className="search-bar"
                placeholder="Search for a conductor..."
                onChange={(e) => {
                    const searchInput = e.target.value.toLowerCase();
                    document.querySelectorAll('#conductorList li').forEach((li) => {
                        const text = li.textContent || li.innerText;
                        li.style.display = text.toLowerCase().indexOf(searchInput) > -1 ? '' : 'none';
                    });
                }}
            />
            <div className="conductor-list">
                <ul id="conductorList">
                    <li>Conductor 1</li>
                    <li>Conductor 2</li>
                    <li>Conductor 3</li>
                </ul>
            </div>
        </div>
    );
}

export default ConductorPage;
