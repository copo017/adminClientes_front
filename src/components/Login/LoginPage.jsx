import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from "./Login.module.css";
import config from '../../config';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post(`${config.apiBaseUrl}/api/auth/login`, {
            username,
            password,
        });

        if (response.status === 200) {
            console.log('Autenticación exitosa');

            // Guardar las credenciales en localStorage
            localStorage.setItem('auth', btoa(`${username}:${password}`));
            localStorage.setItem('role', response.data.role); // Guardar el rol
            localStorage.setItem('username', response.data.username); // Guardar el nombre del usuario

            // Guardar el rol del usuario en localStorage
            const { role } = response.data;
            console.log('Rol del usuario:', role);
            localStorage.setItem('role', role);

            navigate('/'); // Redirigir al dashboard
        }
    } catch (err) {
        console.error('Error de autenticación:', err);
        setError('Credenciales inválidas. Intenta de nuevo.');
    }
};

    return (
        <div className={styles.loginContainer}>
            <form onSubmit={handleLogin} className={styles.loginForm}>
                <h2 className={styles.loginTitle}>Login</h2>
                {error && <div className={styles.error}>{error}</div>}
                <div className={styles.inputGroup}>
                    <label htmlFor="username">User</label>
                    <input
                        type="text"
                        id="username"
                        placeholder="youremail@gmail.com"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className={styles.input}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="******"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className={styles.input}
                    />
                </div>
                <button type="submit" className={styles.loginButton}>Log In</button>

            </form>
        </div>
    );

};

export default LoginPage;
