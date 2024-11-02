// src/components/HistorialReservas.jsx
import { useState, useEffect } from 'react';
import axios from '../../utils/axiosInstance.js'; // Asegúrate de que la ruta sea correcta
import { Link } from 'react-router-dom';

import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Logo from "../../public/svg/logoBlack.svg";

const HistorialReservas = () => {
    const { user, logout } = useContext(AuthContext);
    const [reservas, setReservas] = useState([]);
    const id_huesped = localStorage.getItem('id_huesped'); // Obtener el ID del huésped

    useEffect(() => {
        if (id_huesped) {
            axios.get(`/reserva/historialReservas/${id_huesped}`)
                .then(response => {
                    setReservas(response.data);
                })
                .catch(error => {
                    console.error('Error al obtener el historial de reservas:', error);
                });
        }
    }, [id_huesped]);

    if (!id_huesped) {
        return (
            <div className="py-20 px-4 max-w-7xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">No has iniciado sesión</h2>
                <p className="mb-4">Por favor, inicia sesión para ver tu historial de reservas.</p>
                <Link to="/login" className="bg-[#E97B4D] text-white px-4 py-2 rounded hover:bg-[#d66e44]">
                    Iniciar Sesión
                </Link>
            </div>
        );
    }

    return (
        <div className="py-20 px-4 max-w-7xl mx-auto">
            <nav className="absolute top-0 left-0 w-full bg-white z-20 backdrop-blur-md">
                <div className="container mx-auto px-4 py-2 flex justify-between items-center">
                    <div className="text-xl font-bold">
                        <Link to="/">
                            <img src={Logo} alt="Logo" />
                        </Link>
                    </div>
                    <div className="flex space-x-4">
                        <Link to="/" className="text-gray-800 hover:text-gray-900">Inicio</Link>
                        <Link to="/historial-reservas" className="text-gray-800 hover:text-gray-900">Historial Reservas</Link>
                        <a href="#" className="text-gray-800 hover:text-gray-900">Quienes Somos</a>
                        <Link to="/habitaciones" className="text-gray-800 hover:text-gray-900">Habitaciones</Link>
                        <a href="#contacto" className="text-gray-800 hover:text-gray-900">Contacto</a>
                    </div>
                    <div>
                        {user ? (
                            <div className="relative">
                                <button className="text-gray-800">{user.nombres}</button>
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                                    <button
                                        onClick={logout}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                    >
                                        Cerrar Sesión
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <Link to="/login" className="bg-[#713711] text-gray-800 px-4 py-2 rounded hover:bg-[#431d05]">Iniciar Sesión</Link>
                        )}
                    </div>
                </div>
            </nav>
            <h2 className="text-4xl font-bold text-center mb-16">Historial de Reservas</h2>

            {reservas.length === 0 ? (
                <p className="text-center text-gray-600">No tienes reservas registradas.</p>
            ) : (
                <div className="space-y-8">
                    {reservas.map(reserva => (
                        <div key={reserva.id_reserva} className="border border-gray-200 rounded-lg p-6 shadow">
                            <h3 className="text-2xl font-semibold mb-4">Reserva #{reserva.id_reserva}</h3>
                            <p><strong>Habitación:</strong> {reserva.detalles[0]?.resumen_costo || 'N/A'}</p>
                            <p><strong>Fecha de Entrada:</strong> {reserva.fecha_entrada}</p>
                            <p><strong>Fecha de Salida:</strong> {reserva.fecha_salida}</p>
                            <p><strong>Número de Huéspedes:</strong> {reserva.numero_huespedes}</p>
                            <p><strong>Estado:</strong> {reserva.estado}</p>
                            <p><strong>Código de Reserva:</strong> {reserva.codigo_reserva}</p>
                            <p><strong>Precio Total:</strong> ${reserva.precio_total}</p>
                            {/* Puedes agregar más detalles si lo deseas */}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HistorialReservas;