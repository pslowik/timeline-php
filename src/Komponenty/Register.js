import React, { useState, useContext } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


function Register() {
    const { setUser } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const register = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/registration.php`, {
                username,
                password,
            });        
            if (response.status === 200) {
                setMessage(response.data.message);
                setUser(response.data.user);
                navigate("/login");  // Przekierowanie na stronę logowania
            } else {
                setMessage('Something went wrong. Please try again later.');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Registration failed.');
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            register();
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
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={handleKeyPress}
                    style={styles.input}
                />
                <button onClick={register} style={styles.button}>Register</button>
                {message && <p>{message}</p>}
                <p>Already have an account? <NavLink to="/login">Log in</NavLink></p>
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
        width: '95%',
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
    }
};

export default Register;
