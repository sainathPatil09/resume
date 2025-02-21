import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

export default function ResumeAnalysis() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [resumeData, setResumeData] = useState(null);

  // Mock analysis function to generate realistic resume feedback
  const generateMockAnalysis = (resumeText, targetRole) => {
    // Extract content for basic analysis
    const resumeLower = resumeText.toLowerCase();
    const targetRoleLower = targetRole.toLowerCase();

    // Common keywords based on role type
    const commonKeywords = {
      developer: [
        "javascript",
        "react",
        "node",
        "api",
        "git",
        "agile",
        "css",
        "html",
        "frontend",
        "backend",
      ],
      designer: [
        "ui",
        "ux",
        "figma",
        "sketch",
        "wireframe",
        "prototype",
        "user research",
        "usability",
      ],
      manager: [
        "leadership",
        "strategy",
        "team",
        "budget",
        "stakeholder",
        "project management",
        "agile",
      ],
      marketing: [
        "analytics",
        "campaign",
        "social media",
        "seo",
        "content",
        "strategy",
        "audience",
      ],
      data: [
        "python",
        "sql",
        "tableau",
        "analytics",
        "statistics",
        "visualization",
        "machine learning",
      ],
    };

    // Determine role category
    let roleKeywords = [];
    if (
      targetRoleLower.includes("develop") ||
      targetRoleLower.includes("engineer") ||
      targetRoleLower.includes("program")
    ) {
      roleKeywords = commonKeywords.developer;
    } else if (targetRoleLower.includes("design")) {
      roleKeywords = commonKeywords.designer;
    } else if (targetRoleLower.includes("manage")) {
      roleKeywords = commonKeywords.manager;
    } else if (targetRoleLower.includes("market")) {
      roleKeywords = commonKeywords.marketing;
    } else if (
      targetRoleLower.includes("data") ||
      targetRoleLower.includes("analy")
    ) {
      roleKeywords = commonKeywords.data;
    } else {
      // Default to general professional keywords
      roleKeywords = [
        "communication",
        "collaboration",
        "problem-solving",
        "detail-oriented",
        "project",
        "results",
      ];
    }

    // Check which keywords are present
    const keywordsPresent = roleKeywords.filter((keyword) =>
      resumeLower.includes(keyword)
    );
    const keywordsMissing = roleKeywords.filter(
      (keyword) => !resumeLower.includes(keyword)
    );

    // Calculate mock ATS score based on keyword presence and resume length
    const keywordScore = Math.floor(
      (keywordsPresent.length / roleKeywords.length) * 70
    );
    const lengthScore =
      resumeText.length > 1500 ? 25 : (resumeText.length / 1500) * 25;
    const atsScore = Math.min(98, Math.floor(keywordScore + lengthScore));

    // Generate improvement suggestions
    const improvementSuggestions = [];
    if (keywordsMissing.length > 0) {
      improvementSuggestions.push(
        `Include key skills relevant to ${targetRole}: ${keywordsMissing
          .slice(0, 3)
          .join(", ")}`
      );
    }
    if (resumeText.length < 1500) {
      improvementSuggestions.push(
        "Expand your resume with more detailed descriptions of your achievements and responsibilities"
      );
    }
    if (
      !resumeLower.includes("experience") ||
      !resumeLower.includes("education")
    ) {
      improvementSuggestions.push(
        "Ensure your resume includes clearly labeled sections for Education and Experience"
      );
    }
    if (
      !resumeLower.includes("result") &&
      !resumeLower.includes("impact") &&
      !resumeLower.includes("achiev")
    ) {
      improvementSuggestions.push(
        "Quantify your achievements with metrics and results where possible"
      );
    }

    return {
      atsScore,
      atsScoreComment:
        atsScore > 80
          ? "Great job! Your resume is well-optimized for ATS systems."
          : "Your resume needs some improvements to better match ATS requirements for this role.",
      keywordsPresent,
      keywordsMissing,
      improvementSuggestions,
      achievementSuggestions: {
        intro:
          "Consider reformatting your achievements using the STAR or PAR method (Situation/Task, Action, Result)",
        examples: [
          `Increased website conversion rate by 35% through implementation of responsive design principles and A/B testing`,
          `Reduced project delivery time by 20% by implementing an improved workflow system for the development team`,
          `Managed a team of 5 designers that delivered 30+ client projects with 95% satisfaction rate`,
        ],
      },
    };
  };

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        // Get uploaded resume data from localStorage
        const uploadedTemplate = JSON.parse(
          localStorage.getItem("uploadedTemplate")
        );

        if (!uploadedTemplate) {
          setError("No resume data found. Please upload your resume first.");
          setLoading(false);
          return;
        }

        setResumeData(uploadedTemplate);

        try {
          // Try to connect to the backend first
          const response = await fetch(
            "http://localhost:5000/api/analyze-resume",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                resumeText: uploadedTemplate.fullResumeText,
                targetRole: uploadedTemplate.targetRole,
              }),
            }
          );

          if (!response.ok) {
            throw new Error("Backend response not OK");
          }

          const data = await response.json();
          setAnalysis(data);
        } catch (err) {
          console.log("Backend connection failed, using mock analysis instead");
          // If backend connection fails, use mock analysis
          // Add a small delay to simulate API call
          setTimeout(() => {
            const mockAnalysis = generateMockAnalysis(
              uploadedTemplate.fullResumeText,
              uploadedTemplate.targetRole
            );
            setAnalysis(mockAnalysis);
          }, 1500);
        }
      } catch (err) {
        console.error("Error analyzing resume:", err);
        setError("Failed to analyze resume. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, []);

  const handleContinueToEditor = () => {
    // Store analysis results in localStorage to be used in the editor
    if (analysis) {
      localStorage.setItem("resumeAnalysis", JSON.stringify(analysis));
    }
    navigate("/resume/editor?template=custom");
  };

  const handleRetryAnalysis = async () => {
    setLoading(true);
    setError("");
    try {
      const uploadedTemplate = JSON.parse(
        localStorage.getItem("uploadedTemplate")
      );

      try {
        const response = await fetch(
          "http://localhost:5000/api/analyze-resume",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              resumeText: uploadedTemplate.fullResumeText,
              targetRole: uploadedTemplate.targetRole,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Backend response not OK");
        }

        const data = await response.json();
        setAnalysis(data);
      } catch (err) {
        // Use mock analysis if backend fails
        setTimeout(() => {
          const mockAnalysis = generateMockAnalysis(
            uploadedTemplate.fullResumeText,
            uploadedTemplate.targetRole
          );
          setAnalysis(mockAnalysis);
        }, 1500);
      }
    } catch (err) {
      setError("Failed to analyze resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-md">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          <h3 className="mt-6 text-xl font-medium">Analyzing your resume...</h3>
          <p className="mt-2 text-gray-600">
            Our AI is reviewing your resume for the {resumeData?.targetRole}{" "}
            role
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-md">
        <div className="text-center py-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mx-auto text-red-500"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <h3 className="mt-4 text-xl font-medium text-red-800">{error}</h3>
          <div className="mt-6">
            <Button onClick={handleRetryAnalysis}>Retry Analysis</Button>
            <Button
              variant="outline"
              onClick={() => navigate("/resume/template")}
              className="ml-4"
            >
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">
        Resume Analysis for {resumeData?.targetRole} Role
      </h2>

      {/* ATS Score */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-3">ATS Compatibility Score</h3>
        <div className="flex items-center">
          <div className="w-full bg-gray-200 rounded-full h-4 mr-4">
            <div
              className="bg-blue-600 h-4 rounded-full"
              style={{ width: `${analysis?.atsScore || 0}%` }}
            ></div>
          </div>
          <span className="text-lg font-medium">
            {analysis?.atsScore || 0}%
          </span>
        </div>
        <p className="mt-2 text-gray-700">
          {analysis?.atsScoreComment || "No analysis available"}
        </p>
      </div>

      {/* Keywords Analysis */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-3">Keyword Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-medium text-green-800 mb-2">
              Present Keywords
            </h4>
            {analysis?.keywordsPresent?.length ? (
              <div className="flex flex-wrap gap-2">
                {analysis.keywordsPresent.map((keyword, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-600">
                No relevant keywords found
              </p>
            )}
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h4 className="font-medium text-yellow-800 mb-2">
              Missing Keywords
            </h4>
            {analysis?.keywordsMissing?.length ? (
              <div className="flex flex-wrap gap-2">
                {analysis.keywordsMissing.map((keyword, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-600">
                No missing keywords identified
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Improvement Suggestions */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-3">Improvement Suggestions</h3>
        {analysis?.improvementSuggestions?.length ? (
          <ul className="space-y-3">
            {analysis.improvementSuggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-blue-500 mr-2 mt-1"
                >
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No improvement suggestions available</p>
        )}
      </div>

      {/* Achievements Format */}
      {analysis?.achievementSuggestions && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-3">
            Achievement Format Suggestions
          </h3>
          <div className="bg-blue-50 p-5 rounded-lg border border-blue-200">
            <p className="text-gray-700 mb-4">
              {analysis.achievementSuggestions.intro || ""}
            </p>

            {analysis.achievementSuggestions.examples?.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Examples:</h4>
                <ul className="space-y-2">
                  {analysis.achievementSuggestions.examples.map(
                    (example, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-600 mr-2">✓</span>
                        <span>{example}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-between mt-10">
        <Button variant="outline" onClick={() => navigate("/resume/template")}>
          Go Back
        </Button>
        <Button onClick={handleContinueToEditor}>
          Continue to Resume Editor
        </Button>
      </div>
    </div>
  );
}
