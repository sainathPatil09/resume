// backend/geminiHelp/resumeAnalyzer.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const analyzeResume = async (resumeText, targetRole) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
    You are an expert ATS (Applicant Tracking System) and resume optimization specialist. 
    Analyze the following resume for a ${targetRole} position.
    
    RESUME TEXT:
    ${resumeText}
    
    INSTRUCTIONS:
    1. Calculate an ATS compatibility score (0-100%) based on how well this resume matches the ${targetRole} role.
    2. Identify keywords present in the resume that are relevant for the ${targetRole} role.
    3. List important keywords missing from the resume for the ${targetRole} role.
    4. Provide 3-5 specific improvement suggestions to enhance the resume's ATS score.
    5. Suggest how to improve achievement statements using the STAR or PAR method.
    
    Return your analysis as a JSON object with the following structure:
    {
      "atsScore": number,
      "atsScoreComment": "explanation of the score",
      "keywordsPresent": ["keyword1", "keyword2", ...],
      "keywordsMissing": ["keyword1", "keyword2", ...],
      "improvementSuggestions": ["suggestion1", "suggestion2", ...],
      "achievementSuggestions": {
        "intro": "brief explanation of STAR/PAR method",
        "examples": ["example1", "example2", ...]
      }
    }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const responseText = response.text();

    const jsonMatch =
      responseText.match(/```json\n([\s\S]*?)\n```/) ||
      responseText.match(/({[\s\S]*})/) ||
      responseText;

    let jsonData;
    if (jsonMatch && jsonMatch[1]) {
      jsonData = JSON.parse(jsonMatch[1]);
    } else {
      try {
        jsonData = JSON.parse(responseText);
      } catch (e) {
        throw new Error("Failed to parse AI response as JSON");
      }
    }

    return jsonData;
  } catch (error) {
    console.error("Error in analyzeResume:", error);
    throw error;
  }
};
