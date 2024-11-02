// src/pages/Habitaciones.jsx
import { useState, useEffect } from 'react';
import axios from '../../utils/axiosInstance.js'; // Asegúrate de que la ruta sea correcta
import { Users, Bed, SquareAsterisk, Coffee } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useContext } from 'react';
import { Link } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import Logo from "../../public/svg/logoBlack.svg";

const Habitaciones = () => {
    const { user, logout } = useContext(AuthContext);

  const [habitaciones, setHabitaciones] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedHabitacion, setSelectedHabitacion] = useState(null);
  const [fechaEntrada, setFechaEntrada] = useState('');
  const [fechaSalida, setFechaSalida] = useState('');
  const [numeroHuespedes, setNumeroHuespedes] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/habitacion/habitaciones')
      .then(response => {
        setHabitaciones(response.data);
      })
      .catch(error => {
        console.error('Error al obtener las habitaciones:', error);
      });
  }, []);

  const handleReservarClick = (habitacion) => {
    const isAuthenticated = localStorage.getItem('token');
    if (!isAuthenticated) {
      // Redirigir al usuario al login
      navigate('/login');
    } else {
      setSelectedHabitacion(habitacion);
      setShowModal(true);
    }
  };

  const handleReservar = () => {
    const id_huesped = localStorage.getItem('id_huesped');
    if (!fechaEntrada || !fechaSalida || !numeroHuespedes) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos.',
      });
      return;
    }

    const reservaData = {
      fecha_entrada: fechaEntrada,
      fecha_salida: fechaSalida,
      id_habitacion: selectedHabitacion.id_habitacion,
      id_huesped: parseInt(id_huesped),
      numero_huespedes: parseInt(numeroHuespedes)
    };

    axios.post('/reserva/crearReserva', reservaData)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: '¡Reserva exitosa!',
          text: 'Tu reserva se ha creado correctamente.',
          timer: 2000,
          showConfirmButton: false
        });
        setShowModal(false);
        // Limpiar campos
        setFechaEntrada('');
        setFechaSalida('');
        setNumeroHuespedes(1);
      })
      .catch(error => {
        console.error('Error al crear la reserva:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al crear la reserva.',
        });
      });
  };

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
                <a href='#contacto' className="text-gray-800 hover:text-gray-900">Contacto</a>
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
      <h2 className="text-4xl font-bold text-center mb-16">Todas Nuestras Habitaciones</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {habitaciones.map(habitacion => (
          <div key={habitacion.id_habitacion} className="rounded-2xl border border-gray-200 overflow-hidden shadow-lg">
            <img 
              src={`http://localhost:3000/${habitacion.imagen_url}`} 
              alt={habitacion.nombre}
              className="w-full h-64 object-cover"
            />
            
            <div className="p-6">
              <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <Users size={18} />
                  <span>{habitacion.capacidad} personas</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bed size={18} />
                  <span>Cama {habitacion.tipo_cama}</span>
                </div>
                <div className="flex items-center gap-2">
                  <SquareAsterisk size={18} />
                  <span>{habitacion.tamano_m2} m²</span>
                </div>
                <div className="flex items-center gap-2">
                  <Coffee size={18} />
                  <span>{habitacion.desayuno_incluido ? 'Desayuno incluido' : 'Sin desayuno'}</span>
                </div>
              </div>

              <h3 className="font-medium mb-2">{habitacion.nombre}</h3>
              <p className="text-gray-600 text-sm mb-4 text-center">
                {habitacion.descripcion}
              </p>

              <div className="text-center mb-4">
                <span className="font-medium">Precio</span>
                <span className="ml-2">${habitacion.precio} MXN</span>
              </div>

              <button 
                className="w-full py-3 bg-[#E97B4D] text-white rounded-lg hover:bg-[#d66e44] transition-colors"
                onClick={() => handleReservarClick(habitacion)}
              >
                Adquirir Habitación
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        // Modal de reserva
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <h2 className="text-2xl font-bold mb-4">Reservar Habitación</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Fecha de Entrada</label>
              <input
                type="date"
                className="w-full border rounded px-3 py-2"
                value={fechaEntrada}
                onChange={(e) => setFechaEntrada(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Fecha de Salida</label>
              <input
                type="date"
                className="w-full border rounded px-3 py-2"
                value={fechaSalida}
                onChange={(e) => setFechaSalida(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Número de Huéspedes</label>
              <input
                type="number"
                min="1"
                className="w-full border rounded px-3 py-2"
                value={numeroHuespedes}
                onChange={(e) => setNumeroHuespedes(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <button
                className="mr-2 px-4 py-2 bg-gray-300 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 bg-[#E97B4D] text-white rounded hover:bg-[#d66e44]"
                onClick={handleReservar}
              >
                Reservar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Habitaciones;