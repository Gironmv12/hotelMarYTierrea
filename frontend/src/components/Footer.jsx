import { Instagram, Twitter, Youtube, Dribbble } from 'lucide-react';
import LogoFooter from '../../public/svg/logoFooter.svg';
const Footer = () => {
    return (
        <footer className="bg-[#E97B4D] text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Logo and Copyright */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <img src={LogoFooter} alt="" />
                        </div>
                        <div className="text-sm space-y-1">
                            <p>Copyright © 2024 Hotel Mar y Tierra</p>
                            <p>Todo los derechos reservados</p>
                        </div>
                        {/* Social Media Icons */}
                        <div className="flex gap-4 pt-4">
                            <Instagram className="h-5 w-5 hover:text-gray-200 cursor-pointer" />
                            <Dribbble className="h-5 w-5 hover:text-gray-200 cursor-pointer" />
                            <Twitter className="h-5 w-5 hover:text-gray-200 cursor-pointer" />
                            <Youtube className="h-5 w-5 hover:text-gray-200 cursor-pointer" />
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Contáctanos</h3>
                        <div className="space-y-2">
                            <p>Av. de la Innovación, 123</p>
                            <p>Col. Empresarial, Ciudad Tech</p>
                            <p>CP 45678</p>
                            <p>México</p>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Links</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-gray-200">Inicio</a></li>
                            <li><a href="#" className="hover:text-gray-200">Información</a></li>
                            <li><a href="#" className="hover:text-gray-200">Habitaciones</a></li>
                            <li><a href="#" className="hover:text-gray-200">Detalles</a></li>
                            <li><a href="#" className="hover:text-gray-200">Contacto</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer