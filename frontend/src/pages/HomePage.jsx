import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HomePage = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/auth/current_user', { withCredentials: true })
            .then(res => setUser(res.data))
            .catch(() => setUser(null));
    }, []);

    const handleLogout = () => {
        axios.get('http://localhost:5000/auth/logout', { withCredentials: true })
            .then(() => setUser(null));
    };

    return (
        <div>
            <h1>Home Page</h1>
            {user ? (
                <>
                    <h2>Welcome, {user.name}</h2>
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <h2>Please log in</h2>
            )}
        </div>
    );
};

export default HomePage;
