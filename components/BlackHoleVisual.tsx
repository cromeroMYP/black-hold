import React from 'react';

const BlackHoleVisual: React.FC = () => {
  return (
    <div className="relative w-64 h-64 md:w-96 md:h-96 flex items-center justify-center">
      {/* Accretion Disk - Outer Glow */}
      <div className="absolute inset-0 rounded-full bg-orange-600 blur-3xl opacity-20 animate-pulse-slow"></div>
      
      {/* Accretion Disk - Structure */}
      <div 
        className="absolute w-full h-full rounded-full border-[40px] border-orange-500/30 blur-md"
        style={{ transform: 'rotateX(70deg) scale(1.5)' }}
      ></div>
      
      {/* Photon Ring */}
      <div className="absolute w-48 h-48 md:w-72 md:h-72 rounded-full border-2 border-white/80 shadow-[0_0_50px_rgba(255,255,255,0.5)] z-10 bg-black"></div>
      
      {/* Event Horizon (The Void) */}
      <div className="absolute w-44 h-44 md:w-64 md:h-64 rounded-full bg-black z-20 shadow-inner shadow-orange-900/50"></div>
      
      {/* Lensing Effect Wrapper */}
      <div className="absolute w-full h-full animate-spin-slow z-0 opacity-50">
         <div className="absolute top-0 left-1/2 w-2 h-2 bg-white rounded-full blur-[1px]"></div>
         <div className="absolute bottom-0 left-1/3 w-1 h-1 bg-white rounded-full blur-[1px]"></div>
      </div>
      
      <div className="absolute bottom-[-60px] text-center z-30">
        <p className="text-xs text-orange-300 uppercase tracking-widest">Simulación Visual</p>
        <h3 className="text-xl font-bold text-white">Gargantúa</h3>
      </div>
    </div>
  );
};

export default BlackHoleVisual;