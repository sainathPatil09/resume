// src/lib/resumeUtils.js
export const defaultTemplates = [
  {
    id: "template1",
    name: "Professional",
    thumbnail: "/templates/professional.png",
  },
  {
    id: "template2",
    name: "Creative",
    thumbnail: "/templates/creative.png",
  },
  {
    id: "template3",
    name: "Academic",
    thumbnail: "/templates/academic.png",
  },
];

// Convert uploaded file to usable template object
export const processUploadedTemplate = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        // For image templates
        const templateData = {
          id: `custom-${Date.now()}`,
          name: file.name.split(".")[0],
          thumbnail: event.target.result,
          isCustom: true,
        };
        resolve(templateData);
      } catch (error) {
        reject("Invalid template format");
      }
    };

    reader.onerror = () => reject("Error reading file");
    reader.readAsDataURL(file);
  });
};

// Generate PDF from resume data and template
export const generateResumePDF = (resumeData, templateId) => {
  // This would connect to a PDF generation library
  // For hackathon purposes, this is a placeholder
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`resume-${Date.now()}.pdf`);
    }, 1000);
  });
};
