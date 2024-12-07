// src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './firebase';
import './App.css';
import LiveTracking from './LiveTracking';
import BusDetails from './BusDetails';
import DriverList from './components/DriverList'; 
import DriverInfo from './components/DriverInfo';
import DriverDetail from './components/DriverDetail';
import ConductorDetail from './components/ConductorDetail';
import ConductorPage from './ConductorPage';
import ConductorList from './components/ConductorList';
import EmployeeDriverPage from './components/EmployeeDriverPage';
import RegionalManagerDashboard from './components/RegionalManagerDashboard';
import AdminDashboard from './components/AdminDashboard';
import Navbar from './components/Navbar';
import MapComponent from './components/MapComponent';
import SignUp from './components/SignUp';
import Login from './components/Login';
import PersonalDetailsPage from './components/PersonalDetailsPage'; 
import ConductorDetailsPage from './components/ConductorDetailsPage';
import ConductorsList from './viewSchedule'; // Import ConductorsList from viewSchedule

function App() {
    const [role, setRole] = useState('');
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleRoleClick = (selectedRole) => {
        setRole(selectedRole);
        setIsLoggedIn(false); // Simulate login
    };

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <Router>
            <div className="app-container">
                {isLoggedIn && <Navbar toggleSidebar={toggleSidebar} setIsLoggedIn={setIsLoggedIn} />}
                <Sidebar isSidebarOpen={isSidebarOpen} role={role} />
                <div className={`container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<Login role={role} handleRoleClick={handleRoleClick} setIsLoggedIn={setIsLoggedIn} />} />
                        <Route path="/sign-up" element={<SignUp />} />

                        {/* Role-Based Routes */}
                        {role === 'employee_driver' && (
                            <>
                                <Route path="/employee-driver-page" element={<EmployeeDriverPage />} />
                                <Route path="/driver-list" element={<DriverList />} />
                                <Route path="/conductor-list" element={<ConductorList />} />
                                <Route path="/driver-detail/:driverName" element={<DriverDetail />} />
                                <Route path="/conductor-detail/:conductorName" element={<ConductorDetail />} />
                                <Route path="/personal-details" element={<PersonalDetailsPage />} />
                                <Route path="/conductor-details-page" element={<ConductorDetailsPage />} />
                            </>
                        )}
                        {(role === 'depot_manager' || role === 'regional_manager' || role === 'admin') && (
                            <>
                                <Route path="/dashboard" element={<Dashboard role={role} />} />
                                <Route path="/driver-list" element={<DriverList />} />
                                <Route path="/driver-info" element={<DriverInfo />} />
                                <Route path="/driver-detail/:driverName" element={<DriverDetail />} />
                                <Route path="/conductor-page" element={<ConductorPage />} />
                                <Route path="/conductor-list" element={<ConductorList />} />
                                <Route path="/conductor-detail/:conductorName" element={<ConductorDetail />} />
                                <Route path="/live-tracking" element={<LiveTracking />} />
                                <Route path="/bus-details" element={<BusDetails />} />
                                <Route path="/regional-manager-dashboard" element={<RegionalManagerDashboard />} />
                                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                                <Route path="/personal-details" element={<PersonalDetailsPage />} />
                                <Route path="/conductor-details-page" element={<ConductorDetailsPage />} />
                                {/* View Schedule Route */}
                                <Route path="/view-schedule" element={<ConductorsList />} /> 
                            </>
                        )}
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

function Sidebar({ isSidebarOpen, role }) {
    const [driversOpen, setDriversOpen] = useState(false);
    const [conductorsOpen, setConductorsOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDrivers = () => setDriversOpen(!driversOpen);
    const toggleConductors = () => setConductorsOpen(!conductorsOpen);

    const handleNavigate = (path) => {
        console.log(`Navigating to ${path}`);
        navigate(path);
    };

    return (
        <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
            {console.log('Sidebar rendered for role:', role)} {/* Debug log */}

            {/* Display Driver's List for employee_driver */}
            {role === 'employee_driver' && (
                <>
                    <button onClick={toggleDrivers}>
                        Driver's List {driversOpen ? '▲' : '▼'}
                    </button>
                    {driversOpen && (
                        <div className="dropdown-menu">
                            <button onClick={() => handleNavigate('/driver-list')}>Work Details</button>
                            <button onClick={() => handleNavigate('/personal-details')}>Personal Detail</button>
                        </div>
                    )}

                    {/* Add Conductor's List for employee_driver */}
                    <button onClick={toggleConductors}>
                        Conductor's List {conductorsOpen ? '▲' : '▼'}
                    </button>
                    {conductorsOpen && (
                        <div className="dropdown-menu">
                            <button onClick={() => handleNavigate('/conductor-list')}>Work Details</button>
                            <button onClick={() => handleNavigate('/conductor-details-page')}>Personal Details</button>
                        </div>
                    )}
                </>
            )}

            {/* Display everything for non-employee_driver roles */}
            {role !== 'employee_driver' && (
                <>
                    <button onClick={toggleDrivers}>
                        Driver's List {driversOpen ? '▲' : '▼'}
                    </button>
                    {driversOpen && (
                        <div className="dropdown-menu">
                            <button onClick={() => handleNavigate('/driver-list')}>Work Details</button>
                            <button onClick={() => handleNavigate('/personal-details')}>Personal Detail</button>
                        </div>
                    )}

                    <button onClick={toggleConductors}>
                        Conductor's List {conductorsOpen ? '▲' : '▼'}
                    </button>
                    {conductorsOpen && (
                        <div className="dropdown-menu">
                            <button onClick={() => handleNavigate('/conductor-list')}>Work Details</button>
                            <button onClick={() => handleNavigate('/conductor-details-page')}>Personal Details</button>
                        </div>
                    )}

                    {['depot_manager', 'regional_manager', 'admin'].includes(role) && (
                        <button onClick={() => handleNavigate('/view-schedule')}>View Schedule</button>
                    )}

                    <button onClick={() => handleNavigate('/live-tracking')}>Live Tracking</button>
                    <button onClick={() => handleNavigate('/bus-details')}>Bus Details</button>
                </>
            )}
        </div>
    );
}

function Navar({ toggleSidebar, setIsLoggedIn }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        setIsLoggedIn(false);
        navigate('/');
    };

    return (
        <nav className="navbar">
            <button className="menu-button" onClick={toggleSidebar}>☰</button>
            <h1>My App</h1>
            <button onClick={() => navigate('/notifications')}>Notifications</button>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
        </nav>
    );
}

function Dashboard({ role }) {
    return (
        <div className="dashboard-container">
            <h2>{role} Dashboard</h2>
            <div className="dashboard-map-container">
                <MapComponent />
            </div>
        </div>
    );
}

export default App;
