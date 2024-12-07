import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import './SignUp.css'

function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        if (!role) {
            setError('Please select a role.');
            return;
        }

        try {
            // Attempt to create user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Store email, password, and role in Firestore
            await setDoc(doc(db, 'users', user.uid), {
                email: user.email,
                role: role,
            });

            navigate('/');
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                setError('This email is already in use. Please use a different email.');
            } else {
                setError(error.message);
            }
        }
    };

    return (
        <div className="sign-up-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSignUp}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />

                <label htmlFor="role">Select Role:</label>
                <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                >
                    <option value="" disabled>Select a role</option>
                    <option value="employee_driver">Employee Driver</option>
                    <option value="depot_manager">Depot Manager</option>
                    <option value="regional_manager">Regional Manager</option>
                    <option value="admin">Admin</option>
                </select>

                {error && <p className="error">{error}</p>}

                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUp;





