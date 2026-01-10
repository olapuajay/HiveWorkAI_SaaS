import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

export const callGemini = async (prompt) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
};
