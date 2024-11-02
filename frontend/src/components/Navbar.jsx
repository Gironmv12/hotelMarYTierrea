// src/components/Navbar.jsx
import { useContext } from 'react';
import { Link } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import Logo from "../../public/svg/logo.svg";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="absolute top-0 left-0 w-full bg-transparent z-20 backdrop-blur-md">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link to="/">
            <img src={Logo} alt="Logo" />
          </Link>
        </div>
        <div className="flex space-x-4">
          <Link to="/" className="text-white hover:text-gray-900">Inicio</Link>
          
          {user && (
            <Link to="/historial-reservas" className="text-white hover:text-gray-900">Historial Reservas</Link>
          )}
          
          <a href="#quienessomos" className="text-white hover:text-gray-900">Quienes Somos</a>
          <Link to="/habitaciones" className="text-white hover:text-gray-900">Habitaciones</Link>
          <a href="#contacto" className="text-white hover:text-gray-900">Contacto</a>
        </div>
        <div>
          {user ? (
            <div className="relative">
              <button className="text-white">{user.nombres}</button>
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
            <Link to="/login" className="bg-[#713711] text-white px-4 py-2 rounded hover:bg-[#431d05]">
              Iniciar Sesión
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;