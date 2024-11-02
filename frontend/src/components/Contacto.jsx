import { Facebook, Instagram, Twitter, MessageCircle } from 'lucide-react';
const Contacto = () => {
  return (
    <div className="bg-gray-50 py-20" id='contacto'>
      {/* Comfort Section */}
      <div className="max-w-4xl mx-auto px-4 mb-24">
        <h2 className="text-4xl font-bold text-center mb-8">
          Ven y Disfruta la comodidad
        </h2>
        <p className="text-center text-gray-600 leading-relaxed">
          Nuestras habitaciones están diseñadas para ofrecer el máximo confort y tranquilidad. 
          Equipadas con camas amplias, mobiliario moderno y todos los servicios necesarios, 
          cada espacio está pensado para brindarte una estancia relajante y agradable. 
          Disfruta de un ambiente cálido y acogedor donde el descanso es nuestra prioridad.
        </p>
      </div>

      {/* Contact Section */}
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h2 className="text-5xl font-bold mb-6">¡Contáctanos!</h2>
        <p className="text-gray-600 mb-8">
          Conéctate con nosotros en nuestras redes sociales y mantente al día con las últimas novedades.
        </p>
        
        <h3 className="text-2xl font-bold mb-8">¡Síguenos!</h3>
        
        <div className="flex justify-center gap-6 mb-12">
          <a href="#" className="w-14 h-14 bg-[#E97B4D] rounded-full flex items-center justify-center text-white hover:bg-[#d66e44] transition-colors">
            <Facebook size={24} />
          </a>
          <a href="#" className="w-14 h-14 bg-[#E97B4D] rounded-full flex items-center justify-center text-white hover:bg-[#d66e44] transition-colors">
            <Instagram size={24} />
          </a>
          <a href="#" className="w-14 h-14 bg-[#E97B4D] rounded-full flex items-center justify-center text-white hover:bg-[#d66e44] transition-colors">
            <Twitter size={24} />
          </a>
          <a href="#" className="w-14 h-14 bg-[#E97B4D] rounded-full flex items-center justify-center text-white hover:bg-[#d66e44] transition-colors">
            <MessageCircle size={24} />
          </a>
        </div>

        <p className="text-gray-600">
          ¿Tienes alguna pregunta? No dudes en contactarnos a través de nuestras redes sociales o envíanos un mensaje directo.
        </p>
      </div>
    </div>
  )
}

export default Contacto