import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ toggleSidebar, setIsLoggedIn }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        setIsLoggedIn(false);
        navigate('/');
    };

    return (
        <div className="navbar">
            <button className="menu-toggle" onClick={toggleSidebar}>☰ Menu</button>
            <div className="navbar-buttons">
                <button onClick={() => navigate('/dashboard')}>Home</button>
                <button onClick={() => navigate('/about-us')}>About Us</button>
                <button onClick={() => navigate('/contact-us')}>Contact Us</button>
                <button onClick={() => navigate('/notifications')}>Notifications</button>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default Navbar;

