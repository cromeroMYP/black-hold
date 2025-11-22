import React, { useState, useEffect } from 'react';
import { TriviaQuestion } from '../types';
import { generateTriviaQuestions } from '../services/geminiService';

const TriviaGame: React.FC = () => {
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [gameFinished, setGameFinished] = useState(false);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    setLoading(true);
    const qs = await generateTriviaQuestions();
    setQuestions(qs);
    setCurrentIndex(0);
    setScore(0);
    setGameFinished(false);
    resetRound();
    setLoading(false);
  };

  const resetRound = () => {
    setSelectedOption(null);
    setIsAnswered(false);
  };

  const handleOptionClick = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    
    if (idx === questions[currentIndex].correctAnswerIndex) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      resetRound();
    } else {
      setGameFinished(true);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-xl text-gray-300 animate-pulse">Generando preguntas cuánticas...</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="text-center p-10">
        <p className="text-red-400 mb-4">Error al cargar las preguntas.</p>
        <button onClick={loadQuestions} className="px-6 py-3 bg-accent rounded-lg text-white">Reintentar</button>
      </div>
    );
  }

  if (gameFinished) {
    return (
      <div className="max-w-2xl mx-auto bg-space-800 p-8 rounded-2xl border border-space-600 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">¡Misión Cumplida!</h2>
        <div className="text-6xl mb-6">🚀</div>
        <p className="text-xl text-gray-300 mb-8">
          Tu puntuación final: <span className="text-accent font-bold text-3xl">{score} / {questions.length}</span>
        </p>
        <button 
          onClick={loadQuestions}
          className="px-8 py-4 bg-accent hover:bg-accent-dark text-white rounded-lg font-bold transition-colors"
        >
          Jugar de Nuevo
        </button>
      </div>
    );
  }

  const currentQ = questions[currentIndex];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6 text-gray-400 text-sm uppercase tracking-wider">
        <span>Pregunta {currentIndex + 1} de {questions.length}</span>
        <span>Puntos: {score}</span>
      </div>

      <div className="bg-space-800 p-8 rounded-2xl border border-space-600 shadow-xl relative overflow-hidden">
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 h-1 bg-space-700 w-full">
          <div 
            className="h-full bg-accent transition-all duration-500"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          ></div>
        </div>

        <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 mt-4">{currentQ.question}</h3>

        <div className="space-y-3">
          {currentQ.options.map((option, idx) => {
            let buttonClass = "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 font-medium ";
            
            if (isAnswered) {
              if (idx === currentQ.correctAnswerIndex) {
                buttonClass += "bg-green-900/30 border-green-500 text-green-100";
              } else if (idx === selectedOption) {
                buttonClass += "bg-red-900/30 border-red-500 text-red-100";
              } else {
                buttonClass += "bg-space-900 border-transparent opacity-50";
              }
            } else {
              buttonClass += "bg-space-900 border-transparent hover:border-accent hover:bg-space-700 text-gray-200";
            }

            return (
              <button
                key={idx}
                onClick={() => handleOptionClick(idx)}
                disabled={isAnswered}
                className={buttonClass}
              >
                <div className="flex items-center justify-between">
                   <span>{option}</span>
                   {isAnswered && idx === currentQ.correctAnswerIndex && (
                     <span className="text-green-400">✓</span>
                   )}
                   {isAnswered && idx === selectedOption && idx !== currentQ.correctAnswerIndex && (
                     <span className="text-red-400">✗</span>
                   )}
                </div>
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div className="mt-8 pt-6 border-t border-space-700 animate-float" style={{ animationDuration: '0.5s', animationIterationCount: 1 }}>
            <div className="bg-space-900 p-4 rounded-lg mb-6">
                <p className="text-gray-400 text-sm mb-1 font-bold uppercase">Explicación:</p>
                <p className="text-gray-100">{currentQ.explanation}</p>
            </div>
            <div className="flex justify-end">
              <button 
                onClick={nextQuestion}
                className="bg-white text-black px-8 py-3 rounded-lg font-bold hover:bg-gray-200 transition-colors"
              >
                {currentIndex === questions.length - 1 ? "Ver Resultados" : "Siguiente Pregunta →"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TriviaGame;