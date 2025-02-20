// src/components/resume/UploadTemplate.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { pdfjs } from "react-pdf";

// Initialize PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function UploadTemplate() {
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (file.type !== "application/pdf") {
      setError("Please upload a PDF file");
      return;
    }

    setIsUploading(true);
    setError("");

    try {
      // Load the PDF file
      const fileReader = new FileReader();

      fileReader.onload = async function () {
        const typedarray = new Uint8Array(this.result);

        try {
          // Load the PDF document
          const loadingTask = pdfjs.getDocument(typedarray);
          const pdf = await loadingTask.promise;

          // Extract first page text content
          const page = await pdf.getPage(1);
          const textContent = await page.getTextContent();
          const text = textContent.items.map((item) => item.str).join(" ");

          // Extract potential resume sections
          const extractedData = parseResumeText(text);

          // Store the extracted data
          localStorage.setItem(
            "uploadedTemplate",
            JSON.stringify({
              pdfData: extractedData,
              originalFileName: file.name,
            })
          );

          // Navigate to the editor
          navigate("/resume/editor?template=custom");
        } catch (error) {
          console.error("Error parsing PDF:", error);
          setError("Unable to process this PDF. Please try another template.");
        }
      };

      fileReader.readAsArrayBuffer(file);
    } catch (error) {
      setError("Failed to upload template");
    } finally {
      setIsUploading(false);
    }
  };

  const parseResumeText = (text) => {
    // Basic parsing logic - in a real application, this would be more sophisticated
    const data = {
      personalInfo: {},
      sections: {},
    };

    // Try to extract name (assuming it's at the beginning)
    const nameMatch = text.match(/^([A-Za-z\s]+)/);
    if (nameMatch) {
      data.personalInfo.fullName = nameMatch[0].trim();
    }

    // Try to extract email
    const emailMatch = text.match(
      /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
    );
    if (emailMatch) {
      data.personalInfo.email = emailMatch[0];
    }

    // Try to extract phone number
    const phoneMatch = text.match(
      /(\+\d{1,3}[\s-])?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}/
    );
    if (phoneMatch) {
      data.personalInfo.phone = phoneMatch[0];
    }

    // Check for common sections
    const sections = [
      { name: "education", patterns: ["EDUCATION", "Academic Background"] },
      {
        name: "experience",
        patterns: ["EXPERIENCE", "WORK EXPERIENCE", "Professional Experience"],
      },
      {
        name: "skills",
        patterns: ["SKILLS", "Technical Skills", "Key Skills"],
      },
      { name: "projects", patterns: ["PROJECTS", "Key Projects"] },
    ];

    sections.forEach((section) => {
      section.patterns.forEach((pattern) => {
        if (text.includes(pattern)) {
          data.sections[section.name] = true;
        }
      });
    });

    return data;
  };

  return (
    <div className="border-dashed border-2 border-blue-300 rounded-lg p-8 text-center">
      <input
        type="file"
        id="template-upload"
        accept=".pdf"
        className="hidden"
        onChange={handleFileUpload}
      />

      <div className="mb-4">
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
          className="mx-auto text-blue-500"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="17 8 12 3 7 8"></polyline>
          <line x1="12" y1="3" x2="12" y2="15"></line>
        </svg>
      </div>

      <p className="text-lg mb-4">Upload a custom PDF template</p>

      <label htmlFor="template-upload">
        <Button variant="outline" className="mb-4" disabled={isUploading}>
          {isUploading ? "Processing..." : "Choose Template File"}
        </Button>
      </label>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <p className="text-sm text-gray-500">
        Upload your existing resume as a PDF to use as a template. We'll try to
        extract information to help you get started faster.
      </p>
    </div>
  );
}
