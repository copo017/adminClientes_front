import React, { useState } from 'react';
import axios from 'axios';
import styles from './Clima.module.css';

const Clima = () => {
    const [city, setCity] = useState('Santiago'); // Ciudad por defecto
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');

    const fetchWeather = async (cityName) => {
        try {
            setError(''); // Limpiar errores previos
            const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
                params: {
                    q: cityName,
                    appid: 'a8dd7e3daadcdb179e3dc53710a28948', // Tu API Key de OpenWeather
                    units: 'metric',
                },
            });
            setWeather(response.data);

            // Registro de consulta exitosa
            console.log(`Consulta exitosa para la ciudad: ${cityName}`);
            console.log('Datos del clima:', response.data)
        } catch (err) {
            console.error('Error al obtener el clima:', err);
            setError('No se pudo obtener el clima. Verifica el nombre de la ciudad.');
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (city.trim()) {
            fetchWeather(city);
        } else {
            setError('Por favor, ingresa una ciudad.');
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Consulta el Clima</h2>

            {/* Barra de búsqueda */}
            <form onSubmit={handleSearch} className={styles.searchForm}>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Ingresa una ciudad"
                    className={styles.searchInput}
                />
                <button type="submit" className={styles.searchButton}>Buscar</button>
            </form>

            {/* Mostrar Clima */}
            {error && <div className={styles.error}>{error}</div>}
            {weather && (
                <div className={styles.weatherInfo}>
                    <h3>{weather.name}, {weather.sys.country}</h3>
                    <p><strong>Temperatura:</strong> {weather.main.temp}°C</p>
                    <p><strong>Humedad:</strong> {weather.main.humidity}%</p>
                    <p><strong>Descripción:</strong> {weather.weather[0].description}</p>
                </div>
            )}
        </div>
    );
};

export default Clima;
