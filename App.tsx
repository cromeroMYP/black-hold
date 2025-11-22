import React, { useState } from 'react';
import { AppSection } from './types';
import Hero from './components/Hero';
import Learn from './components/Learn';
import ChatInterface from './components/ChatInterface';
import TriviaGame from './components/TriviaGame';

const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<AppSection>(AppSection.HOME);

  const renderContent = () => {
    switch (currentSection) {
      case AppSection.HOME:
        return <Hero onNavigate={setCurrentSection} />;
      case AppSection.LEARN:
        return <Learn />;
      case AppSection.CHAT:
        return <ChatInterface />;
      case AppSection.TRIVIA:
        return <TriviaGame />;
      default:
        return <Hero onNavigate={setCurrentSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-accent selection:text-white">
      {/* Stars Background */}
      <div className="fixed inset-0 pointer-events-none z-0 stars"></div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center cursor-pointer" onClick={() => setCurrentSection(AppSection.HOME)}>
              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center mr-2 shadow-[0_0_15px_rgba(111,0,255,0.5)]">
                 <div className="w-3 h-3 bg-black rounded-full"></div>
              </div>
              <span className="font-bold text-xl tracking-wider text-white">COSMOS</span>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {[
                  { id: AppSection.HOME, label: 'Inicio' },
                  { id: AppSection.LEARN, label: 'Aprender' },
                  { id: AppSection.CHAT, label: 'Chat IA' },
                  { id: AppSection.TRIVIA, label: 'Trivia' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCurrentSection(item.id)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      currentSection === item.id
                        ? 'text-white bg-white/10 shadow-[0_0_10px_rgba(255,255,255,0.1)]'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Mobile menu button placeholder - simplified for this implementation */}
            <div className="md:hidden flex items-center">
               <div className="space-x-2">
                  <button onClick={() => setCurrentSection(AppSection.LEARN)} className="text-xs bg-white/10 p-2 rounded text-gray-300">Aprender</button>
                  <button onClick={() => setCurrentSection(AppSection.CHAT)} className="text-xs bg-accent p-2 rounded">IA Chat</button>
               </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative pt-16 z-10 min-h-screen">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-black/80 border-t border-white/5 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Cosmos Project. Desarrollado con tecnología Gemini.</p>
          <p className="mt-2 text-xs opacity-50">Las imágenes y datos son con fines educativos.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;