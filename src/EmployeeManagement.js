// src/EmployeeManagement.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function EmployeeManagement() {
    const navigate = useNavigate();

    const openDriverPage = () => {
        navigate('/driver-page');
    };

    const openConductorPage = () => {
        navigate('/conductor-page');
    };

    return (
        <div className="employee-management-page">
            <h2>Employee Management</h2>
            <div className="employee-management-buttons">
                <button onClick={openDriverPage}>Driver</button>
                <button onClick={openConductorPage}>Conductor</button>
            </div>
        </div>
    );
}

export default EmployeeManagement;
