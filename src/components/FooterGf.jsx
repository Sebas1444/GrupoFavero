import React from 'react'; // Importa React para poder utilizar JSX
import { Facebook, Instagram, Youtube } from 'lucide-react'; // Importa los iconos de redes sociales desde la librería lucide-react

/**
 * FooterGf - Componente de pie de página para Grupo Favero
 *
 * Este componente representa el pie de página del sitio web de Grupo Favero.
 * Contiene enlaces a las redes sociales de la empresa (Facebook, Instagram y YouTube),
 * un aviso de derechos de autor, y un crédito para el diseño.
 *
 * @returns {JSX.Element} Componente de pie de página.
 */
export default function FooterGf() {
  return (
    <footer className="bg-customBlue text-white py-8"> {/* Estilo de fondo personalizado y texto blanco con espaciado en Y */}
      <div className="container mx-auto px-4"> {/* Contenedor centralizado con márgenes y padding adecuados */}
        <div className="flex flex-col md:flex-row justify-between items-center"> {/* Flexbox para una distribución adecuada en dispositivos pequeños y grandes */}
          
          {/* Contenedor de los enlaces de redes sociales */}
          <div className="flex space-x-8 mb-4 md:mb-0"> {/* Espaciado entre los iconos y margen inferior en dispositivos pequeños */}
            
            {/* Enlace a la página de Facebook */}
            <a 
              href="https://www.facebook.com/grupofavero" // URL de Facebook
              target="_blank" // Abre el enlace en una nueva pestaña
              rel="noopener noreferrer" // Mejora la seguridad al abrir enlaces en una nueva pestaña
              aria-label="Facebook" // Descripción accesible para lectores de pantalla
              className="transition-transform duration-300 ease-in-out hover:scale-125" // Animación de transformación al hacer hover
            >
              <Facebook className="w-8 h-8" /> {/* Icono de Facebook con tamaño ajustado */}
            </a>

            {/* Enlace a la página de Instagram */}
            <a 
              href="https://www.instagram.com/grupofaveropy/" // URL de Instagram
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="transition-transform duration-300 ease-in-out hover:scale-125" // Animación de transformación
            >
              <Instagram className="w-8 h-8" /> {/* Icono de Instagram con tamaño ajustado */}
            </a>

            {/* Enlace a la página de YouTube */}
            <a 
              href="https://www.youtube.com/@grupofavero5232" // URL de YouTube
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="transition-transform duration-300 ease-in-out hover:scale-125" // Animación de transformación
            >
              <Youtube className="w-8 h-8" /> {/* Icono de YouTube con tamaño ajustado */}
            </a>
          </div>
          
          {/* Texto con los derechos de autor */}
          <p className="text-center md:text-left mb-4 md:mb-0"> {/* Alineación del texto para dispositivos pequeños (centrado) y grandes (a la izquierda) */}
            © 2024 Grupo Favero. Todos los derechos reservados.
          </p>

          {/* Crédito de diseño */}
          <p className="text-sm"> {/* Texto pequeño para el crédito */}
            Diseñado por {"{ESCA}"}
          </p>
        </div>
      </div>
    </footer>
  );
}
