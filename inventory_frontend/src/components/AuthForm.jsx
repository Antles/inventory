import React, { useState } from 'react';
import apiRequest from '../Api';
import AlertModal from './AlertModal'; // Import the new modal

// This component handles both user login and registration.
const AuthForm = ({ setIsLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // State for controlling the alert modal
    const [alertInfo, setAlertInfo] = useState({ isOpen: false, title: '', message: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        const endpoint = isRegistering ? '/users/register' : '/users/login';

        try {
            await apiRequest(endpoint, 'POST', { username, password });

            if (isRegistering) {
                // Show the success modal instead of the browser alert
                setAlertInfo({
                    isOpen: true,
                    title: 'Registration Successful',
                    message: 'Your account has been created. Please log in.'
                });
            } else {
                setIsLoggedIn(true);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const closeAlert = () => {
        setAlertInfo({ isOpen: false, title: '', message: '' });
        // After closing the registration success alert, switch back to the login form
        if (isRegistering) {
            setIsRegistering(false);
        }
    };

    return (
        <>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                        {isRegistering ? 'Create Account' : 'Inventory Login'}
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Username
                            </label>
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </div>
                        {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
                        <div className="flex items-center justify-between">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full disabled:bg-indigo-300"
                            >
                                {isLoading ? 'Processing...' : (isRegistering ? 'Register' : 'Log In')}
                            </button>
                        </div>
                    </form>
                    <p className="text-center text-gray-500 text-xs mt-6">
                        <button
                            type="button"
                            onClick={() => {
                                setIsRegistering(!isRegistering);
                                setError('');
                            }}
                            className="font-semibold text-indigo-600 hover:text-indigo-500"
                        >
                            {isRegistering ? 'Already have an account? Log In' : "Don't have an account? Register"}
                        </button>
                    </p>
                </div>
            </div>
            <AlertModal
                isOpen={alertInfo.isOpen}
                onClose={closeAlert}
                title={alertInfo.title}
                message={alertInfo.message}
            />
        </>
    );
};

export default AuthForm;
