


import { GoogleGenerativeAI } from '@google/generative-ai'; 

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export const summaryOfOpenAI = async (prompt) => {
  try {
    const result = await model.generateContent(prompt);
    
    let responseText;
    try {
      responseText = result.response.text(); 
    } catch (err) {
      console.error("Failed to parse Gemini response text:", err, result);
      throw new Error("AI returned an invalid response.");
    }

    console.log("✅ AI summary response:", responseText);

    return responseText.trim();
  } catch (error) {
    console.error("Error summarizing with Gemini:", error);
    throw new Error("Failed to get summary from AI.");
  }
};
