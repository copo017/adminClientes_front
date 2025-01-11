import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'Usuario';

  const handleLogout = () => {
    console.log(`El usuario ${username} ha cerrado sesión.`);
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li>
          <Link to="/dashboard" className={styles.navLink}>Clima</Link>
        </li>
        <li>
          <Link to="/clientes" className={styles.navLink}>Clientes</Link>
        </li>
        <li className={styles.userMenu}>
          <span className={styles.username}>{username}</span>
          <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
