// src/components/ConductorDetail.js

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DriverDetail.css'; // Reuse the same CSS or create a new ConductorDetail.css

const ConductorDetail = () => {
    const { conductorName } = useParams();
    const [conductorDetail, setConductorDetail] = useState({ name: '', phone: '', gender: '', photo: '' });
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch conductor's details from your API
        fetch(`/api/conductor-detail?name=${encodeURIComponent(conductorName)}`)
            .then(response => response.json())
            .then(data => setConductorDetail(data))
            .catch(error => console.error('Error fetching conductor details:', error));
    }, [conductorName]);

    const viewShift = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth(); // 0-based month (0 = January, 11 = December)
        const url = `/calendar?year=${year}&month=${month}`;
        console.log(`Navigating to: ${url}`); // Debugging line
        navigate(url);
    };

    const completedShift = () => {
        alert("Completed Shift clicked");
    };

    const addShift = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth(); // 0-based month (0 = January, 11 = December)
        const url = `/Add_Shift?year=${year}&month=${month}`;
        navigate(url);
    };

    const leave = () => {
        alert("Leave clicked");
    };

    const overtimeDuty = () => {
        alert("Over Time Duty clicked");
    };

    const grievance = () => {
        alert("Grievance clicked");
    };

    const otpApproval = () => {
        alert("OTP based approval (Depot Manager) clicked");
    };

    const toggleMenu = (menuId) => {
        const menu = document.getElementById(menuId);
        menu.style.display = menu.style.display === "flex" ? "none" : "flex";
    };

    const goBack = () => {
        navigate(-1); // Navigate back to the previous page
    };

    return (
        <div>
            <header>
                Conductor Dashboard
            </header>
            <main>
                <div className="driver-info-header">
                    <div>
                        <h1>{conductorDetail.name}</h1>
                        <p>Phone: {conductorDetail.phone}</p>
                        <p>Gender: {conductorDetail.gender}</p>
                    </div>
                    <img src={conductorDetail.photo} alt={`${conductorDetail.name}'s photo`} className="driver-photo" />
                </div>
                <div className="button-container">
                    <button onClick={viewShift}>View Shift</button>
                    <button onClick={completedShift}>Completed Shift</button>

                    {/* Request button and submenu removed */}

                    <button aria-label="Grievance" onClick={grievance}>Grievance</button>

                    <button aria-label="Handoff" onClick={() => toggleMenu('handoffMenu')}>Handoff</button>
                    <div className="submenu" id="handoffMenu">
                        <button aria-label="OTP Approval" onClick={otpApproval}>OTP based approval (Depot Manager)</button>
                    </div>

                    <button className="back-button" onClick={goBack}>Back to Conductor List</button>
                </div>
            </main>
        </div>
    );
};

export default ConductorDetail;
