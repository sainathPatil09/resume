
import {GoogleGenerativeAI, HarmCategory, HarmBlockThreshold} from "@google/generative-ai"
import dotenv from 'dotenv'

dotenv.config()
  
  const apiKey = process.env.GEMINI_API_KEY;
//   console.log(apiKey, "apikey")
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
   export const chatSession = model.startChat({
      generationConfig,
      
    });
