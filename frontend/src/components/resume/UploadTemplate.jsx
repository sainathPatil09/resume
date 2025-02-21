// // Modified UploadTemplate.jsx
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Button } from "../ui/button";
// import { Input } from "../ui/input"; // Add this import
// import { Label } from "../ui/label"; // Add this import
// import { pdfjs } from "react-pdf";

// // Initialize PDF.js worker
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// export default function UploadTemplate() {
//   const navigate = useNavigate();
//   const [isUploading, setIsUploading] = useState(false);
//   const [error, setError] = useState("");
//   const [targetRole, setTargetRole] = useState("");
//   const [fileSelected, setFileSelected] = useState(false);
//   const [selectedFileName, setSelectedFileName] = useState("");
//   const [uploadedFile, setUploadedFile] = useState(null);

//   const handleFileSelect = (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     // Validate file type
//     if (file.type !== "application/pdf") {
//       setError("Please upload a PDF file");
//       return;
//     }

//     setFileSelected(true);
//     setSelectedFileName(file.name);
//     setUploadedFile(file);
//     setError("");
//   };

//   const handleUpload = async () => {
//     if (!uploadedFile) {
//       setError("Please select a file first");
//       return;
//     }

//     if (!targetRole.trim()) {
//       setError("Please enter your target role");
//       return;
//     }

//     setIsUploading(true);
//     setError("");

//     try {
//       // Load the PDF file
//       const fileReader = new FileReader();

//       fileReader.onload = async function () {
//         const typedarray = new Uint8Array(this.result);

//         try {
//           // Load the PDF document
//           const loadingTask = pdfjs.getDocument(typedarray);
//           const pdf = await loadingTask.promise;

//           // Extract first page text content
//           const page = await pdf.getPage(1);
//           const textContent = await page.getTextContent();
//           const text = textContent.items.map((item) => item.str).join(" ");

//           // Extract all pages for comprehensive analysis
//           let fullText = text;
//           for (let i = 2; i <= pdf.numPages; i++) {
//             const nextPage = await pdf.getPage(i);
//             const nextTextContent = await nextPage.getTextContent();
//             const nextText = nextTextContent.items
//               .map((item) => item.str)
//               .join(" ");
//             fullText += " " + nextText;
//           }

//           // Extract potential resume sections
//           const extractedData = parseResumeText(fullText);

//           // Store the extracted data
//           localStorage.setItem(
//             "uploadedTemplate",
//             JSON.stringify({
//               pdfData: extractedData,
//               originalFileName: uploadedFile.name,
//               targetRole: targetRole,
//               fullResumeText: fullText,
//             })
//           );

//           // Navigate to the editor
//           navigate("/resume/editor?template=custom");
//         } catch (error) {
//           console.error("Error parsing PDF:", error);
//           setError("Unable to process this PDF. Please try another template.");
//         }
//       };

//       fileReader.readAsArrayBuffer(uploadedFile);
//     } catch (error) {
//       setError("Failed to upload template");
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const parseResumeText = (text) => {
//     // Basic parsing logic - in a real application, this would be more sophisticated
//     const data = {
//       personalInfo: {},
//       sections: {},
//       rawText: text,
//     };

//     // Try to extract name (assuming it's at the beginning)
//     const nameMatch = text.match(/^([A-Za-z\s]+)/);
//     if (nameMatch) {
//       data.personalInfo.fullName = nameMatch[0].trim();
//     }

//     // Try to extract email
//     const emailMatch = text.match(
//       /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
//     );
//     if (emailMatch) {
//       data.personalInfo.email = emailMatch[0];
//     }

//     // Try to extract phone number
//     const phoneMatch = text.match(
//       /(\+\d{1,3}[\s-])?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}/
//     );
//     if (phoneMatch) {
//       data.personalInfo.phone = phoneMatch[0];
//     }

//     // Check for common sections
//     const sections = [
//       { name: "education", patterns: ["EDUCATION", "Academic Background"] },
//       {
//         name: "experience",
//         patterns: ["EXPERIENCE", "WORK EXPERIENCE", "Professional Experience"],
//       },
//       {
//         name: "skills",
//         patterns: ["SKILLS", "Technical Skills", "Key Skills"],
//       },
//       { name: "projects", patterns: ["PROJECTS", "Key Projects"] },
//     ];

//     sections.forEach((section) => {
//       section.patterns.forEach((pattern) => {
//         if (text.includes(pattern)) {
//           data.sections[section.name] = true;
//         }
//       });
//     });

//     return data;
//   };

//   return (
//     <div className="border-dashed border-2 border-blue-300 rounded-lg p-8">
//       <div className="mb-6 text-center">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="48"
//           height="48"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           className="mx-auto text-blue-500"
//         >
//           <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
//           <polyline points="17 8 12 3 7 8"></polyline>
//           <line x1="12" y1="3" x2="12" y2="15"></line>
//         </svg>
//         <p className="text-lg mb-4 mt-2">Upload your resume for AI analysis</p>
//       </div>

//       <div className="space-y-4">
//         <div>
//           <Label htmlFor="target-role" className="block mb-2">
//             What role are you targeting?
//           </Label>
//           <Input
//             id="target-role"
//             placeholder="e.g., Frontend Developer, Product Manager, Data Scientist"
//             value={targetRole}
//             onChange={(e) => setTargetRole(e.target.value)}
//             className="w-full mb-4"
//           />
//         </div>

//         <div className="mb-4">
//           <input
//             type="file"
//             id="template-upload"
//             accept=".pdf"
//             className="hidden"
//             onChange={handleFileSelect}
//           />

//           <div className="flex items-center gap-3 mb-2">
//             <label htmlFor="template-upload">
//               <Button variant="outline" className="mb-0">
//                 Choose Resume File (PDF)
//               </Button>
//             </label>
//             {fileSelected && (
//               <span className="text-sm text-gray-600">{selectedFileName}</span>
//             )}
//           </div>
//         </div>

//         {error && <p className="text-red-500 mb-4">{error}</p>}

//         <Button
//           onClick={handleUpload}
//           disabled={isUploading || !fileSelected}
//           className="w-full"
//         >
//           {isUploading ? "Analyzing Resume..." : "Analyze My Resume"}
//         </Button>

//         <p className="text-sm text-gray-500 mt-4">
//           Upload your existing resume as a PDF. Our AI will analyze it against
//           your target role and provide suggestions to improve your ATS score and
//           highlight relevant keywords.
//         </p>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { pdfjs } from "react-pdf";

// Set the worker to use the same version as your react-pdf package
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js`;

export default function UploadTemplate() {
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [fileSelected, setFileSelected] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setError("Please upload a PDF file");
      return;
    }

    setFileSelected(true);
    setSelectedFileName(file.name);
    setUploadedFile(file);
    setError("");
  };

  const handleUpload = async () => {
    if (!uploadedFile) {
      setError("Please select a file first");
      return;
    }

    if (!targetRole.trim()) {
      setError("Please enter your target role");
      return;
    }

    setIsUploading(true);
    setError("");

    try {
      const fileReader = new FileReader();

      fileReader.onload = async function () {
        const typedarray = new Uint8Array(this.result);

        try {
          const loadingTask = pdfjs.getDocument(typedarray);
          const pdf = await loadingTask.promise;

          const page = await pdf.getPage(1);
          const textContent = await page.getTextContent();
          const text = textContent.items.map((item) => item.str).join(" ");

          let fullText = text;
          for (let i = 2; i <= pdf.numPages; i++) {
            const nextPage = await pdf.getPage(i);
            const nextTextContent = await nextPage.getTextContent();
            const nextText = nextTextContent.items
              .map((item) => item.str)
              .join(" ");
            fullText += " " + nextText;
          }

          const extractedData = parseResumeText(fullText);

          localStorage.setItem(
            "uploadedTemplate",
            JSON.stringify({
              pdfData: extractedData,
              originalFileName: uploadedFile.name,
              targetRole: targetRole,
              fullResumeText: fullText,
            })
          );

          navigate("/resume/analysis");
        } catch (error) {
          console.error("Error parsing PDF:", error);
          setError("Unable to process this PDF. Please try another template.");
        }
      };

      fileReader.readAsArrayBuffer(uploadedFile);
    } catch (error) {
      console.error("Upload error:", error);
      setError("Failed to upload template");
    } finally {
      setIsUploading(false);
    }
  };

  const parseResumeText = (text) => {
    const data = {
      personalInfo: {},
      sections: {},
      rawText: text,
    };

    const nameMatch = text.match(/^([A-Za-z\s]+)/);
    if (nameMatch) {
      data.personalInfo.fullName = nameMatch[0].trim();
    }

    const emailMatch = text.match(
      /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
    );
    if (emailMatch) {
      data.personalInfo.email = emailMatch[0];
    }

    const phoneMatch = text.match(
      /(\+\d{1,3}[\s-])?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}/
    );
    if (phoneMatch) {
      data.personalInfo.phone = phoneMatch[0];
    }

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
    <div className="border-dashed border-2 border-blue-300 rounded-lg p-8">
      <div className="mb-6 text-center">
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
        <p className="text-lg mb-4 mt-2">Upload your resume for AI analysis</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="target-role" className="block mb-2">
            What role are you targeting?
          </Label>
          <Input
            id="target-role"
            placeholder="e.g., Frontend Developer"
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            className="w-full mb-4"
          />
        </div>
        <div className="mb-4">
          <input
            type="file"
            id="template-upload"
            accept=".pdf"
            className="hidden"
            onChange={handleFileSelect}
          />

          <Button
            variant="outline"
            className="mb-0"
            onClick={() => document.getElementById("template-upload").click()}
          >
            Choose Resume File (PDF)
          </Button>

          {fileSelected && (
            <span className="text-sm text-gray-600 ml-2">
              {selectedFileName}
            </span>
          )}
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <Button
          onClick={handleUpload}
          disabled={isUploading || !fileSelected}
          className="w-full"
        >
          {isUploading ? "Analyzing Resume..." : "Analyze My Resume"}
        </Button>

        <p className="text-sm text-gray-500 mt-4">
          Upload your existing resume as a PDF. Our AI will analyze it against
          your target role and provide suggestions to improve your ATS score and
          highlight relevant keywords.
        </p>
      </div>
    </div>
  );
}
