import { GoogleGenAI, Type, Schema } from "@google/genai";
import { Message, TriviaQuestion } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// System instruction for the Chat
const CHAT_SYSTEM_INSTRUCTION = `
Eres un experto astrofísico y divulgador científico especializado en agujeros negros y cosmología.
Tu objetivo es explicar conceptos complejos de forma sencilla, fascinante y precisa en español.
Usa un tono educativo pero apasionante. Si te preguntan algo fuera del tema, redirige la conversación amablemente hacia el cosmos.
`;

export const streamChatResponse = async (
  history: Message[],
  newMessage: string,
  onChunk: (text: string) => void
): Promise<string> => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: CHAT_SYSTEM_INSTRUCTION,
      },
      history: history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }))
    });

    const result = await chat.sendMessageStream({ message: newMessage });
    
    let fullText = '';
    for await (const chunk of result) {
      const text = chunk.text;
      if (text) {
        fullText += text;
        onChunk(text);
      }
    }
    return fullText;
  } catch (error) {
    console.error("Error in chat stream:", error);
    throw error;
  }
};

export const generateTriviaQuestions = async (): Promise<TriviaQuestion[]> => {
  try {
    const schema: Schema = {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          question: { type: Type.STRING },
          options: { 
            type: Type.ARRAY,
            items: { type: Type.STRING },
            minItems: 4,
            maxItems: 4
          },
          correctAnswerIndex: { type: Type.INTEGER },
          explanation: { type: Type.STRING }
        },
        required: ['question', 'options', 'correctAnswerIndex', 'explanation']
      }
    };

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: "Genera 5 preguntas de trivia interesantes y desafiantes sobre agujeros negros en español.",
      config: {
        responseMimeType: "application/json",
        responseSchema: schema
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as TriviaQuestion[];
    }
    return [];
  } catch (error) {
    console.error("Error generating trivia:", error);
    return [];
  }
};