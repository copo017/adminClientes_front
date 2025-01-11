import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Clientes.module.css';
import config from '../../config';

const Clientes = () => {
    const [clientes, setClientes] = useState([]); // Lista de clientes
    const [isAdmin, setIsAdmin] = useState(false); // Determina si el usuario es admin
    const [error, setError] = useState(''); // Manejo de errores
    const [showForm, setShowForm] = useState(false); // Mostrar el formulario de agregar/editar
    const [currentCliente, setCurrentCliente] = useState(null); // Cliente actual para editar o agregar

    // Al cargar el componente
    useEffect(() => {
        const userRole = localStorage.getItem('role') || 'ROLE_USUARIO';
        console.log('Rol detectado en Clientes.jsx:', userRole); // Diagnóstico
        setIsAdmin(userRole === 'ROLE_ADMIN'); // Validar si es admin

        const fetchClientes = async () => {
            try {
                const auth = localStorage.getItem('auth');
                const response = await axios.get(`${config.apiBaseUrl}/api/clientes`, {
                    headers: { Authorization: `Basic ${auth}` },
                });
                console.log('Clientes obtenidos del backend:', response.data); // Log de clientes cargados
                setClientes(response.data);
            } catch (error) {
                console.error('Error al obtener clientes:', error);
                setError('No se pudo cargar la lista de clientes.');
            }
        };

        fetchClientes();
    }, []);

    // Manejar envío del formulario
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const auth = localStorage.getItem('auth');

            if (currentCliente?.idCliente) {
                // EDITAR Cliente (PUT)
                console.log('Editando cliente con ID:', currentCliente.idCliente); // Log de edición
                await axios.put(
                    `${config.apiBaseUrl}/api/clientes/${currentCliente.idCliente}`,
                    currentCliente,
                    { headers: { Authorization: `Basic ${auth}` } }
                );
                console.log('Cliente editado con éxito:', currentCliente); // Log de éxito
            } else {
                // AGREGAR Cliente (POST)
                console.log('Creando nuevo cliente:', currentCliente); // Log de creación
                await axios.post(`${config.apiBaseUrl}/api/clientes`, currentCliente, {
                    headers: { Authorization: `Basic ${auth}` },
                });
                console.log('Cliente creado con éxito:', currentCliente); // Log de éxito
            }

            // Actualizar la lista de clientes
            const response = await axios.get(`${config.apiBaseUrl}/api/clientes`, {
                headers: { Authorization: `Basic ${auth}` },
            });
            setClientes(response.data);

            // Limpiar formulario y ocultarlo
            setCurrentCliente(null);
            setShowForm(false);
        } catch (error) {
            console.error('Error al guardar cliente:', error);
            setError('No se pudo guardar el cliente.');
        }
    };

    // Manejar cambios en el formulario
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentCliente((prev) => ({ ...prev, [name]: value }));
    };

    // Eliminar cliente
    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
            try {
                console.log('Eliminando cliente con ID:', id); // Log de eliminación
                const auth = localStorage.getItem('auth');
                await axios.delete(`${config.apiBaseUrl}/api/clientes/${id}`, {
                    headers: { Authorization: `Basic ${auth}` },
                });
                console.log('Cliente eliminado con éxito:', id); // Log de éxito
                setClientes(clientes.filter((cliente) => cliente.idCliente !== id));
            } catch (error) {
                console.error('Error al eliminar cliente:', error);
                setError('No se pudo eliminar el cliente.');
            }
        }
    };

    return (
        <div className={styles.container}>
            <h2>Mantenedor de Clientes</h2>
            {error && <div className="alert alert-danger">{error}</div>}

            {isAdmin && (
                <button
                    className={`${styles.button} ${styles['button-success']}`}
                    onClick={() => {
                        setCurrentCliente({ nombre: '', email: '', telefono: '', direccion: '' });
                        setShowForm(true);
                    }}
                >
                    Agregar Cliente
                </button>
            )}

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Teléfono</th>
                        <th>Dirección</th>
                        {isAdmin && <th>Acciones</th>}
                    </tr>
                </thead>
                <tbody>
                    {clientes.map((cliente) => (
                        <tr key={cliente.idCliente}>
                            <td>{cliente.idCliente}</td>
                            <td>{cliente.nombre}</td>
                            <td>{cliente.email}</td>
                            <td>{cliente.telefono}</td>
                            <td>{cliente.direccion}</td>
                            {isAdmin && (
                                <td>
                                    <button
                                        className={`${styles.button} ${styles['button-warning']} me-2`}
                                        onClick={() => {
                                            setCurrentCliente(cliente);
                                            setShowForm(true);
                                        }}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className={`${styles.button} ${styles['button-danger']}`}
                                        onClick={() => handleDelete(cliente.idCliente)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>

            {showForm && (
                <>
                    <div className={styles.modalOverlay} onClick={() => setShowForm(false)}></div>
                    <div className={styles.modal}>
                        <h3>{currentCliente?.idCliente ? 'Editar Cliente' : 'Agregar Cliente'}</h3>
                        <form onSubmit={handleFormSubmit}>
                            <div>
                                <label>Nombre</label>
                                <input
                                    type="text"
                                    name="nombre"
                                    value={currentCliente?.nombre || ''}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={currentCliente?.email || ''}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>Teléfono</label>
                                <input
                                    type="text"
                                    name="telefono"
                                    value={currentCliente?.telefono || ''}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>Dirección</label>
                                <input
                                    type="text"
                                    name="direccion"
                                    value={currentCliente?.direccion || ''}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <button type="submit" className={`${styles.button} ${styles['button-success']}`}>
                                {currentCliente?.idCliente ? 'Guardar Cambios' : 'Agregar Cliente'}
                            </button>
                            <button
                                type="button"
                                className={`${styles.button} ${styles['button-secondary']} ms-2`}
                                onClick={() => setShowForm(false)}
                            >
                                Cancelar
                            </button>
                        </form>
                    </div>
                </>
            )}
        </div>
    );
};

export default Clientes;
