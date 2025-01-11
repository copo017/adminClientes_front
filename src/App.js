import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/Login/LoginPage';
import Dashboard from './components/Dashboard/Dashboard';
import Clientes from './components/Clientes/Clientes';
import Navbar from './components/Navbar/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from "./components/Layout/Layout";


function App() {
    return (
        <Router>
            <Routes>

                <Route path="/login" element={<LoginPage />} />
                 {/* Ruta para Layout que mantiene el Navbar fijo */}
                <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="clientes" element={<Clientes />} />
                </Route>
                {/* Ruta por defecto */}
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default App;
