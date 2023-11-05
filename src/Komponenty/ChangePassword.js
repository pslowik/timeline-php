import React, { useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';

function ChangePassword() {
    const [username, setUsername] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const changePassword = async () => {
        try {
            const response = await axios.post('http://localhost/timeline-php/php/change-password.php', {
                username,
                currentPassword,
                newPassword,
            },
            { withCredentials: true }
            );  
            if(response.data.message === "Password updated successfully.") {
                setMessage(response.data.message);
                console.log('message:', message);
                setTimeout(() => {
                    navigate("/login");  // Przekierowanie na stronę logowania
                }, 1300);
            } else      
            if (response.status === 200) {
                setMessage(response.data.message);
            } else {
                setMessage('Something went wrong. Please try again later.');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Password change failed.');
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            changePassword();
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.formContainer}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="password"
                    placeholder="Current Password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    onKeyDown={handleKeyPress}
                    style={styles.input}
                />
                <button onClick={changePassword} style={styles.button}>Change Password</button>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0',
    },
    formContainer: {
        backgroundColor: '#ffffff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        width: '300px',
    },
    input: {
        width: '92%',
        padding: '10px',
        margin: '10px 0',
        borderRadius: '4px',
        border: '1px solid #ddd',
    },
    button: {
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#008CBA',
        color: '#fff',
        fontSize: '16px',
        cursor: 'pointer',
    },
};

export default ChangePassword;
