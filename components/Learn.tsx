import React from 'react';

const Learn: React.FC = () => {
  const topics = [
    {
      title: "¿Qué es un Agujero Negro?",
      content: "Un agujero negro es una región del espacio donde la fuerza de gravedad es tan intensa que nada, ni siquiera la luz, puede escapar de ella. La gravedad es tan fuerte porque la materia ha sido comprimida en un espacio minúsculo.",
      icon: "🌌"
    },
    {
      title: "Horizonte de Sucesos",
      content: "Es el 'punto de no retorno' alrededor de un agujero negro. Una vez que un objeto cruza este límite, es inevitable que sea absorbido hacia el centro. Para un observador externo, el objeto parecería congelarse en el tiempo justo en el borde.",
      icon: "⭕"
    },
    {
      title: "La Singularidad",
      content: "En el centro del agujero negro yace la singularidad, un punto de densidad infinita y volumen cero. Aquí, las leyes conocidas de la física (como la Relatividad General) dejan de funcionar.",
      icon: "⚫"
    },
    {
      title: "Espaguetización",
      content: "Si cayeras en un agujero negro, la diferencia de gravedad entre tus pies y tu cabeza sería tan extrema que tu cuerpo se estiraría como un fideo largo y delgado. Un proceso fatal pero fascinante.",
      icon: "🍝"
    }
  ];

  return (
    <div className="py-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white mb-4">Conceptos Fundamentales</h2>
        <div className="h-1 w-20 bg-accent mx-auto rounded-full"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {topics.map((topic, index) => (
          <div key={index} className="bg-space-800 p-8 rounded-2xl border border-space-700 hover:border-accent/50 transition-colors group">
            <div className="text-4xl mb-4 bg-space-900 w-16 h-16 flex items-center justify-center rounded-xl group-hover:scale-110 transition-transform duration-300">
              {topic.icon}
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">{topic.title}</h3>
            <p className="text-gray-400 leading-relaxed">{topic.content}</p>
          </div>
        ))}
      </div>

      <div className="mt-20 bg-gradient-to-r from-space-800 to-space-900 rounded-3xl p-8 md:p-12 border border-space-700 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <img 
              src="https://picsum.photos/400/300?grayscale&blur=2" 
              alt="Espacio profundo" 
              className="rounded-xl shadow-2xl border border-gray-700 w-full md:w-1/3 object-cover h-64"
            />
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-4">Tipos de Agujeros Negros</h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">✦</span>
                  <div>
                    <strong className="text-white">Estelares:</strong> Se forman por el colapso gravitacional de una estrella masiva (10-100 veces la masa del Sol).
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">✦</span>
                  <div>
                    <strong className="text-white">Supermasivos:</strong> Millones o miles de millones de veces la masa del Sol, se encuentran en el centro de casi todas las galaxias grandes, incluida la Vía Láctea (Sagitario A*).
                  </div>
                </li>
                 <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">✦</span>
                  <div>
                    <strong className="text-white">Intermedios:</strong> Eslabones perdidos teóricos, con masas entre los estelares y los supermasivos.
                  </div>
                </li>
              </ul>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Learn;