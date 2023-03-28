import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CurrentProfile = () => {
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        console.log('Access token:', accessToken);
        if (accessToken) {
        axios
            .get('/api/users/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            })
            .then((response) => {
            console.log('API response:', response);
            setCurrentUser(response.data);
            })
            .catch((error) => {
            console.log('API error:', error);
            });
        } else {
        setCurrentUser(null);
        }
    }, []);

    if (!currentUser) {
        return <div>Loading...</div>;
    }

    return (
        <div>
        <h1>Welcome, {currentUser.username}!</h1>
        <p>Email: {currentUser.email}</p>
        </div>
    );
};

export default CurrentProfile;
