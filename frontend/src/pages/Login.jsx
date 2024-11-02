// src/pages/Login.jsx
import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/huesped/login', { correo, contrasena });
      
      // Suponiendo que el backend responde con { token, id_huesped, nombres }
      const { token, id_huesped, nombres } = response.data;
      
      // Almacenar en localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('id_huesped', id_huesped);
      localStorage.setItem('nombres', nombres);

      // Actualizar el contexto de autenticación
      login({ token, nombres });

      Swal.fire('Éxito', 'Has iniciado sesión correctamente.', 'success');
      navigate('/');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      Swal.fire('Error', 'Credenciales incorrectas.', 'error');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
        <div className="mb-4">
          <label htmlFor="correo" className="block text-gray-700">Correo</label>
          <input
            id="correo"
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="contrasena" className="block text-gray-700">Contraseña</label>
          <input
            id="contrasena"
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button type="submit" className="w-full bg-[#E97B4D] text-white py-2 rounded hover:bg-[#d66e44] transition-colors">
          Iniciar Sesión
        </button>
      </form>
      {/* Enlace a la página de registro */}
      <div className="absolute bottom-4 right-4">
        <a href="/signup" className="text-gray-500 hover:text-gray-700">¿No tienes cuenta? Regístrate</a>
      </div>
    </div>
  );
};

export default Login;