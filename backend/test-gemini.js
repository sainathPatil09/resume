// backend/test-gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
console.log("API key exists:", !!apiKey);
console.log("API key first 5 chars:", apiKey ? apiKey.substring(0, 5) : "none");

const genAI = new GoogleGenerativeAI(apiKey);

async function testGemini() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent("Hello, test message");
    console.log("Response:", result.response.text());
    console.log("Test successful!");
  } catch (error) {
    console.error("Gemini test failed:", error);
  }
}

testGemini();
