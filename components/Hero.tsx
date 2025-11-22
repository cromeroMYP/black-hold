import React from 'react';
import BlackHoleVisual from './BlackHoleVisual';
import { AppSection } from '../types';

interface HeroProps {
  onNavigate: (section: AppSection) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative min-h-screen flex flex-col md:flex-row items-center justify-center overflow-hidden px-6 pt-20 pb-10">
      <div className="z-10 flex-1 max-w-2xl text-center md:text-left mb-10 md:mb-0">
        <span className="inline-block py-1 px-3 rounded-full bg-accent/20 text-accent-light text-sm font-semibold mb-4 border border-accent/30">
          Explora el Cosmos
        </span>
        <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 mb-6 leading-tight">
          Más Allá del <br/>
          <span className="text-accent">Horizonte de Sucesos</span>
        </h1>
        <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-lg mx-auto md:mx-0">
          Descubre los misterios de los objetos más fascinantes del universo. Donde la gravedad es infinita y el tiempo se detiene.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <button 
            onClick={() => onNavigate(AppSection.LEARN)}
            className="px-8 py-4 bg-accent hover:bg-accent-dark text-white rounded-lg font-bold transition-all transform hover:scale-105 shadow-lg shadow-accent/25"
          >
            Comenzar Viaje
          </button>
          <button 
             onClick={() => onNavigate(AppSection.CHAT)}
             className="px-8 py-4 bg-transparent border border-gray-600 hover:border-white text-white rounded-lg font-bold transition-all hover:bg-white/5"
          >
            Preguntar a la IA
          </button>
        </div>
      </div>
      
      <div className="flex-1 flex justify-center items-center z-10 mt-10 md:mt-0 perspective-1000">
        <div className="animate-float">
          <BlackHoleVisual />
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[120px] -z-10"></div>
    </section>
  );
};

export default Hero;