import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Habitaciones from "./pages/Habitaciones";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import HistorialReservas from "./pages/HistorialReservas";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/habitaciones" element={<Habitaciones />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/historial-reservas" element={<HistorialReservas />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;