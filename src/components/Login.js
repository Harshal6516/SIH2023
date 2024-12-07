import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase'; // Import db
import { doc, getDoc } from 'firebase/firestore'; // Import getDoc
import './Login.css';
import logo from '../assets/2-delhi-transport-corporation-logo-350.jpg';

function Login({ role, handleRoleClick, setIsLoggedIn }) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();

        if (!selectedRole) {
            setError("Please select a role");
            return;
        }

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Fetch the role from Firestore
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            const userData = userDoc.data();

            if (userData.role !== selectedRole) {
                setError("Incorrect role selected for this account.");
                return;
            }

            setIsLoggedIn(true);

            switch (selectedRole) {
                case 'employee_driver':
                    navigate('/employee-driver-page');
                    break;
                case 'depot_manager':
                    navigate('/dashboard');
                    break;
                case 'regional_manager':
                    navigate('/regional-manager-dashboard');
                    break;
                case 'admin':
                    navigate('/admin-dashboard');
                    break;
                default:
                    navigate('/');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSignUp = () => {
        navigate('/sign-up');
    };

    const handleRoleSelection = (role) => {
        setSelectedRole(role);
        handleRoleClick(role);
    };

    return (
        <div className="login-container">
            <h2 id="login-title">Login</h2>
            {/* Add the image to the login page */}
            <img src= {logo} alt="logo" className="login-image" />

            <form id="loginForm" onSubmit={handleLogin}>
                <div className="role-buttons">
                    <button
                        type="button"
                        className={`role-btn ${selectedRole === 'employee_driver' ? 'active' : ''}`}
                        onClick={() => handleRoleSelection('employee_driver')}
                    >
                        Employee Driver
                    </button>
                    <button
                        type="button"
                        className={`role-btn ${selectedRole === 'depot_manager' ? 'active' : ''}`}
                        onClick={() => handleRoleSelection('depot_manager')}
                    >
                        Depot Manager
                    </button>
                    <button
                        type="button"
                        className={`role-btn ${selectedRole === 'regional_manager' ? 'active' : ''}`}
                        onClick={() => handleRoleSelection('regional_manager')}
                    >
                        Regional Manager
                    </button>
                    <button
                        type="button"
                        className={`role-btn ${selectedRole === 'admin' ? 'active' : ''}`}
                        onClick={() => handleRoleSelection('admin')}
                    >
                        Admin
                    </button>
                </div>

                {error && <p className="error">{error}</p>}

                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <div className="forgot-password">
                    <a href="/forgot-password">Forgot Password?</a>
                </div>

                <input type="submit" value="Login" />

                <div className="sign-up">
                    <button type="button" onClick={handleSignUp}>Sign Up</button>
                </div>
            </form>
        </div>
    );
}

export default Login;
