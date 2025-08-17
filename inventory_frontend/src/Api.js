// File: src/api.js
// Description: This file centralizes all our API requests to reduce redundant code
// and provide a single point of configuration and error handling for server communication.

// Make sure your Go API is running, and update this URL if it's different.
const API_URL = '/api/v1';;

const apiRequest = async (endpoint, method = 'GET', body = null) => {
    try {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
                // In a real app with token-based auth, you would add the token here:
                // 'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            },
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        const response = await fetch(`${API_URL}${endpoint}`, options);

        if (!response.ok) {
            // Try to get a more specific error message from the API's response body
            const errorText = await response.text();
            throw new Error(errorText || `HTTP error! status: ${response.status}`);
        }

        // For DELETE or PUT requests that might return 204 No Content
        if (response.status === 204) {
            return null;
        }

        return response.json();
    } catch (error) {
        console.error(`API request failed: ${method} ${endpoint}`, error);
        // Re-throw the error so the component that called this can handle it
        throw error;
    }
};

export default apiRequest;
