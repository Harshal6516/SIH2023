import React from 'react';
import { useLocation } from 'react-router-dom';
import './DriverInfo.css';

const DriverInfo = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const driverName = params.get('driver') || "Driver";

    const viewShift = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1; // Months are 0-indexed
        alert(`Navigating to: calendar.html?year=${year}&month=${month}`);
    };

    const goBack = () => {
        window.history.back();
    };

    const toggleMenu = (menuId) => {
        const menu = document.getElementById(menuId);
        if (menu) {
            menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
        }
    };

    return (
        <div>
            <header>Driver Dashboard</header>
            <main>
                <h1>{driverName}'s Work Information</h1>
                <div className="button-container">
                    <button onClick={viewShift}>View Shift</button>
                    <button onClick={() => alert('Completed Shift clicked')}>Completed Shift</button>
                    <button onClick={() => toggleMenu('requestMenu')}>Request</button>
                    <div className="submenu" id="requestMenu">
                        <button onClick={() => alert('Add Shift clicked')}>Add Shift</button>
                        <button onClick={() => alert('Leave clicked')}>Leave</button>
                        <button onClick={() => alert('Over Time Duty clicked')}>Over Time Duty</button>
                    </div>
                    <button onClick={() => alert('Grievance clicked')}>Grievance</button>
                    <button onClick={() => toggleMenu('handoffMenu')}>Handoff</button>
                    <div className="submenu" id="handoffMenu">
                        <button onClick={() => alert('OTP based approval (Depot Manager) clicked')}>OTP based approval</button>
                    </div>
                    <button className="back-button" onClick={goBack}>Back to Driver List</button>
                </div>
            </main>
        </div>
    );
};

export default DriverInfo;
