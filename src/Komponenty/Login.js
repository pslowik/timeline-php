import React, { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';


function Login() {
    const { setUser } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const login = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/login.php`, {
                username,
                password,
            },
            { withCredentials: true }
            );        
            if (response.data.message === "Login successful.") {
                setMessage(response.data.message);
                setUser(response.data.user);
                console.log('user:', response.data.user.username);
                navigate("/");  // Przekierowanie na stronę główna
            } else {
                setMessage(response.data.message || 'Something went wrong. Please try again later.');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Login failed.');
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            login();
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
                <button onClick={login} style={styles.button}>Login</button>
                {message && <p>{message}</p>}
                <p>Don't have an account? <NavLink to="/register">Sign up</NavLink></p>
                <p><NavLink to="/changepassword">Change password</NavLink></p>
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

export default Login;
