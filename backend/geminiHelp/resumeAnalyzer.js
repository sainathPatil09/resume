// backend/geminiHelp/resumeAnalyzer.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const analyzeResume = async (resumeText, targetRole) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY is missing");
      throw new Error("API key configuration error");
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
    You are an expert ATS (Applicant Tracking System) and resume optimization specialist with 15+ years of experience.
    Analyze the following resume for a ${targetRole} position with extreme thoroughness and accuracy.
    
    RESUME TEXT:
    ${resumeText}
    
    INSTRUCTIONS:
    1. VERY IMPORTANT: Only list keywords as "present" if they explicitly appear in the resume text. Do a strict substring search.
    2. Calculate an accurate ATS compatibility score (0-100%) based on multiple factors:
       - Relevant keywords present (40%)
       - Resume structure and formatting (20%)
       - Quantified achievements (20%)
       - Education and experience relevance (20%)
    3. Identify keywords present in the resume that are relevant for the ${targetRole} role. Be extremely strict - only list keywords actually found in the text.
    4. Research and list important keywords missing from the resume that are crucial for the ${targetRole} role, based on current industry standards.
    5. Provide 3-5 specific, actionable improvement suggestions to enhance the resume's ATS score.
    6. Suggest how to improve achievement statements using the STAR or PAR method with examples specific to the ${targetRole} role.
    
    Return your analysis as a JSON object with the following structure:
    {
      "atsScore": number,
      "atsScoreComment": "detailed explanation of the score calculation",
      "keywordsPresent": ["keyword1", "keyword2", ...],
      "keywordsMissing": ["keyword1", "keyword2", ...],
      "improvementSuggestions": ["suggestion1", "suggestion2", ...],
      "achievementSuggestions": {
        "intro": "explanation of STAR/PAR method",
        "examples": ["example1", "example2", ...]
      }
    }

    Before returning, verify that:
    1. All keywordsPresent ACTUALLY appear in the resume text
    2. The score calculation is detailed and accurate
    3. Improvement suggestions are specific and actionable
    4. The analysis is tailored specifically to the ${targetRole} role
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

    // Validate returned keywords against the actual resume text
    if (jsonData.keywordsPresent && Array.isArray(jsonData.keywordsPresent)) {
      const resumeLower = resumeText.toLowerCase();
      // Filter out any keywords that don't actually appear in the resume
      jsonData.keywordsPresent = jsonData.keywordsPresent.filter((keyword) =>
        resumeLower.includes(keyword.toLowerCase())
      );
    }

    return jsonData;
  } catch (error) {
    console.error("Error in analyzeResume:", error);
    throw error;
  }
};
