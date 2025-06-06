// import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: import.meta.env.VITE_OPENAI_API_KEY,
//   dangerouslyAllowBrowser: true
// });

// export const summaryOfOpenAI = async (prompt) => {

//     const response = await openai.chat.completions.create({
//         // model: "gpt-4",
//         messages: [
//             {
//                 role: "system",
//                 content: "You are a developer portfolio summarizer."
//             },
//             {
//                 role: "user",
//                 content: prompt,
//             },
//         ],
//         temperature: 0.7,
//         max_tokens: 300,
//     });

//     return response.choices[0].message.content.trim();

// };


import { GoogleGenerativeAI } from '@google/generative-ai'; 

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export const summaryOfOpenAI = async (prompt) => { 
  try {
    const result = await model.generateContent(prompt);

    const responseText = result.response.text();
    return responseText;

  } catch (error) {
    console.error("Error summarizing with Gemini:", error);
    throw new Error("Failed to get summary from AI.");
  }
};