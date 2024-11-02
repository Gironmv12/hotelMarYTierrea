// src/components/Signup.jsx
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Signup = () => {
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3000/api/huesped/registroHuesped', {
        nombres,
        apellidos,
        correo,
        contrasena
      });
      
      Swal.fire('Éxito', 'Cuenta creada exitosamente. Puedes iniciar sesión ahora.', 'success');
      navigate('/login');
    } catch (error) {
      console.error('Error al registrar:', error);
      Swal.fire('Error', 'Hubo un problema al crear la cuenta.', 'error');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Registrarse</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nombres" className="block text-gray-700">Nombres</label>
            <input
              id="nombres"
              type="text"
              value={nombres}
              onChange={(e) => setNombres(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-[#E97B4D]"
              placeholder="Ingresa tus nombres"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="apellidos" className="block text-gray-700">Apellidos</label>
            <input
              id="apellidos"
              type="text"
              value={apellidos}
              onChange={(e) => setApellidos(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-[#E97B4D]"
              placeholder="Ingresa tus apellidos"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="correo" className="block text-gray-700">Correo</label>
            <input
              id="correo"
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-[#E97B4D]"
              placeholder="example@correo.com"
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
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-[#E97B4D]"
              placeholder="Ingresa tu contraseña"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#E97B4D] text-white py-2 rounded hover:bg-[#d66e44] transition-colors"
          >
            Registrarse
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            ¿Ya tienes una cuenta?{' '}
            <a href="/login" className="text-[#E97B4D] hover:underline">
              Inicia Sesión
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;