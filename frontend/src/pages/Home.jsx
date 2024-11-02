import Nav from '../components/Navbar'
import Logo from '../../public/svg/logoPortada.svg'
import Footer from '../components/Footer';
import HabitacionesCard from '../components/HabitacionesCard';
import Contacto from '../components/Contacto';
import { Shield, Eye } from 'lucide-react';


const Home = () => {
    return (
        <>
            <Nav />
            <div className="relative h-screen">
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/30 z-[1]" />

                {/* Imagen de fondo */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80')`,
                    }}
                />

                {/* Gradiente */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-[2]" />

                {/* Contenido */}
                <div className="absolute inset-0 flex flex-col items-start justify-center px-6 md:px-16 z-10">
                    <h1 className="text-2xl md:text-4xl font-bold text-white mb-6">
                        Descanso y Aventura en Armonía
                    </h1>
                    <p className="max-w-2xl text-lg md:text-base text-white/90 mb-8">
                        Bienvenido al Hotel Mar y Tierra, donde el encanto del mar se encuentra con la
                        serenidad de la montaña. Disfruta de nuestras cómodas habitaciones y
                        sumérgete en una experiencia única de relajación y aventura. Ofrecemos una
                        variedad de actividades recreativas como masajes revitalizantes, sesiones
                        tradicionales de mezcal, paseos a caballo y caminatas por paisajes naturales
                        impresionantes.
                    </p>
                    <button className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white border-2 border-white/50 rounded-full transition-all duration-300 backdrop-blur-sm">
                        Reservar ahora
                    </button>
                    <div className="absolute top-1/2 right-16 transform -translate-y-1/2 hidden lg:block">
                        <img src={Logo} alt="Logo" />
                    </div>
                </div>
            </div>

            {/* seccion de descripcion del hotel */}
            <div className="container mx-auto px-10 py-16">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    Descubre el Hotel Mar y Tierra
                </h2>
                <p className="text-base text-gray-600">
                    En Mar y Tierra, cada rincón está diseñado con esmero para ofrecerte una experiencia de descanso y recreación única. Nuestro hotel combina la comodidad de un hogar con la elegancia de un refugio exclusivo. Desde el momento en que llegas, te envolverás en un ambiente acogedor y relajante, ideal para desconectar del estrés diario.
                </p>
            </div>

            {/* seccion de encuentros */}
            <div className="min-h-screen container mx-auto px-10 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                    {/* Puntos de Encuentro */}
                    <div className="bg-[#F26D3D] p-12 flex items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-white mb-4">PUNTOS DE ENCUENTRO</h2>
                            <p className="text-white text-lg">
                                Disfruta de espacios al aire libre para torneos de juegos en familia, o espacios versátiles para todo tipo de encuentros, desde reuniones para ponerse al día hasta actividades creativas. Tenemos un espacio para cada ocasión.
                            </p>
                        </div>
                    </div>
                    <div className="bg-cover bg-center h-[400px] md:h-auto" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80')" }} />

                    {/* Alimentos y Bebidas */}
                    <div className="bg-cover bg-center h-[400px] md:h-auto" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1543269664-56d93c1b41a6?auto=format&fit=crop&q=80')" }} />
                    <div className="bg-[#F2994A] p-12 flex items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-white mb-4">ALIMENTOS Y BEBIDAS</h2>
                            <p className="text-white text-lg">
                                Nuestros bares y restaurantes con servicio completo ofrecen la variedad y comodidad que necesitas en tus viajes. Tanto para los comensales más quisquillosos como para los clientes más exigentes, encontrarás justo lo que buscas.
                            </p>
                        </div>
                    </div>

                    {/* Servicios Memorables */}
                    <div className="bg-[#98A886] p-12 flex items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-white mb-4">SERVICIOS MEMORABLES</h2>
                            <p className="text-white text-lg">
                                Nuestro objetivo en cada estadía es hacer que cada uno de tus momentos sea impecable, cómodo y placentero. Estamos a tu disposición para lo que necesites mientras te hospedes con nosotros.
                            </p>
                        </div>
                    </div>
                    <div className="bg-cover bg-center h-[400px] md:h-auto" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }} />
                </div>
            </div>

            {/* seccion de quienes somos */}
            <div className="min-h-screen bg-white py-20 px-4 md:px-8" id='quienessomos'>
                <div className="max-w-6xl mx-auto">
                    {/* Title Section */}
                    <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">¿Quiénes Somos?</h1>
                    <p className="text-center text-gray-600 max-w-4xl mx-auto mb-16">
                        Lorem ipsum dolor sit amet consectetur. Ornare sed amet a vitae id etiam arcu nisi adipiscing. Varius adipiscing urna id volutpat eget
                        velit diam malesuada. Sem eu a proin sed suspendisse egestas sit. In iaculis quis pellentesque id curabitur. Risus nunc turpis odio dui
                        vitae arcu phasellus enim vel.
                    </p>

                    {/* Cards Container */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Mission Card */}
                        <div className="rounded-2xl border border-gray-200 p-8 hover:shadow-lg transition-shadow">
                            <div className="flex flex-col items-center">
                                <Shield className="w-8 h-8 text-red-500 mb-4" />
                                <h2 className="text-2xl font-bold mb-4">Misión</h2>
                                <p className="text-center text-gray-600">
                                    Lorem ipsum dolor sit amet consectetur. Consectetur adipiscing sed
                                    interdum cras. Sem eu a proin sed suspendisse egestas sit. In iaculis
                                    quis pellentesque id curabitur. Risus nunc turpis odio dui vitae arcu
                                    phasellus enim vel.
                                </p>
                            </div>
                        </div>

                        {/* Vision Card */}
                        <div className="rounded-2xl border border-gray-200 p-8 hover:shadow-lg transition-shadow">
                            <div className="flex flex-col items-center">
                                <Eye className="w-8 h-8 text-red-500 mb-4" />
                                <h2 className="text-2xl font-bold mb-4">Visión</h2>
                                <p className="text-center text-gray-600">
                                    Lorem ipsum dolor sit amet consectetur. Consectetur adipiscing sed
                                    interdum cras. Sem eu a proin sed suspendisse egestas sit. In iaculis
                                    quis pellentesque id curabitur. Risus nunc turpis odio dui vitae arcu
                                    phasellus enim vel.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* seccion de comodidad */}
            <div className="min-h-screen bg-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl font-bold text-center mb-16">
                        Comodidad
                    </h1>

                    {/* Comfort Section */}
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        {/* Left Content */}
                        <div className="bg-[#E97B4D] text-white p-12 md:p-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                HABITACIONES<br />CÓMODAS
                            </h2>
                            <p className="text-lg leading-relaxed">
                                Nuestras habitaciones están diseñadas para ofrecer el máximo confort y tranquilidad.
                                Equipadas con camas amplias, mobiliario moderno y todos los servicios necesarios, cada
                                espacio está pensado para brindarte una estancia relajante y agradable.
                            </p>
                        </div>

                        {/* Right Image */}
                        <div className="h-[500px] relative">
                            <img
                                src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80"
                                alt="Comfortable bedroom"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* seccion de Habitaciones */}
            <HabitacionesCard />

            {/* seccion de Contacto */}
            <Contacto />

            {/* Footer */}

            <Footer />
        </>
    )
}

export default Home