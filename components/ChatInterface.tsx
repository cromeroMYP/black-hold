import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { streamChatResponse } from '../services/geminiService';

const ChatInterface: React.FC = () => {
  const [history, setHistory] = useState<Message[]>([
    { role: 'model', text: 'Hola, soy tu asistente astrofísico virtual. Pregúntame lo que quieras sobre agujeros negros, gravedad o el universo.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history, isLoading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', text: input.trim() };
    setHistory(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Add placeholder for streaming message
    setHistory(prev => [...prev, { role: 'model', text: '' }]);

    try {
      let accumulatedText = '';
      await streamChatResponse(history, userMsg.text, (chunk) => {
        accumulatedText += chunk;
        setHistory(prev => {
          const newHistory = [...prev];
          newHistory[newHistory.length - 1] = { role: 'model', text: accumulatedText };
          return newHistory;
        });
      });
    } catch (error) {
      setHistory(prev => {
          const newHistory = [...prev];
          newHistory[newHistory.length - 1] = { role: 'model', text: 'Lo siento, hubo un error de comunicación con la base de datos estelar. Por favor intenta de nuevo.' };
          return newHistory;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 h-[calc(100vh-100px)] flex flex-col">
      <div className="bg-space-800 rounded-2xl border border-space-700 flex-1 flex flex-col shadow-2xl overflow-hidden">
        
        {/* Chat Header */}
        <div className="bg-space-900 p-4 border-b border-space-700 flex items-center gap-3">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <h2 className="font-bold text-white">Astro-AI: Enlace Directo</h2>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {history.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[85%] md:max-w-[70%] p-4 rounded-2xl ${
                  msg.role === 'user' 
                    ? 'bg-accent text-white rounded-br-none' 
                    : 'bg-space-700 text-gray-100 rounded-bl-none'
                }`}
              >
                <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
              </div>
            </div>
          ))}
          {isLoading && history[history.length -1].text === '' && (
             <div className="flex justify-start">
               <div className="bg-space-700 p-4 rounded-2xl rounded-bl-none flex gap-2 items-center">
                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
               </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-space-900 border-t border-space-700">
          <form onSubmit={handleSend} className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pregunta sobre la singularidad, Hawking..."
              className="flex-1 bg-space-800 text-white border border-space-600 rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-white text-accent-dark px-6 py-3 rounded-xl font-bold hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              <span>Enviar</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;