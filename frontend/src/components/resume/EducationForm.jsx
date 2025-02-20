// src/components/resume/EducationForm.jsx
import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

export const EducationForm = ({ educationList = [], updateFormData }) => {
  const [education, setEducation] = useState(
    educationList.length > 0
      ? educationList
      : [
          {
            id: 1,
            institution: "",
            degree: "",
            fieldOfStudy: "",
            startDate: "",
            endDate: "",
            description: "",
          },
        ]
  );

  const handleChange = (id, field, value) => {
    const updatedEducation = education.map((edu) =>
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    setEducation(updatedEducation);
    updateFormData(updatedEducation);
  };

  const addEducation = () => {
    const newEducation = {
      id: Date.now(),
      institution: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
      description: "",
    };
    const updatedEducation = [...education, newEducation];
    setEducation(updatedEducation);
    updateFormData(updatedEducation);
  };

  const removeEducation = (id) => {
    if (education.length === 1) return;
    const updatedEducation = education.filter((edu) => edu.id !== id);
    setEducation(updatedEducation);
    updateFormData(updatedEducation);
  };

  return (
    <div className="space-y-6">
      {education.map((edu, index) => (
        <div key={edu.id} className="border p-4 rounded-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Education #{index + 1}</h3>
            {education.length > 1 && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => removeEducation(edu.id)}
              >
                Remove
              </Button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor={`institution-${edu.id}`}>Institution</Label>
              <Input
                id={`institution-${edu.id}`}
                value={edu.institution}
                onChange={(e) =>
                  handleChange(edu.id, "institution", e.target.value)
                }
                placeholder="University Name"
              />
            </div>

            <div>
              <Label htmlFor={`degree-${edu.id}`}>Degree</Label>
              <Input
                id={`degree-${edu.id}`}
                value={edu.degree}
                onChange={(e) => handleChange(edu.id, "degree", e.target.value)}
                placeholder="Bachelor of Science"
              />
            </div>

            <div>
              <Label htmlFor={`field-${edu.id}`}>Field of Study</Label>
              <Input
                id={`field-${edu.id}`}
                value={edu.fieldOfStudy}
                onChange={(e) =>
                  handleChange(edu.id, "fieldOfStudy", e.target.value)
                }
                placeholder="Computer Science"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor={`start-${edu.id}`}>Start Date</Label>
                <Input
                  id={`start-${edu.id}`}
                  type="month"
                  value={edu.startDate}
                  onChange={(e) =>
                    handleChange(edu.id, "startDate", e.target.value)
                  }
                />
              </div>

              <div>
                <Label htmlFor={`end-${edu.id}`}>End Date</Label>
                <Input
                  id={`end-${edu.id}`}
                  type="month"
                  value={edu.endDate}
                  onChange={(e) =>
                    handleChange(edu.id, "endDate", e.target.value)
                  }
                />
              </div>
            </div>
          </div>

          <div className="mt-4">
            <Label htmlFor={`description-${edu.id}`}>Description</Label>
            <textarea
              id={`description-${edu.id}`}
              className="w-full h-24 p-2 border rounded-md"
              value={edu.description}
              onChange={(e) =>
                handleChange(edu.id, "description", e.target.value)
              }
              placeholder="Describe your achievements, coursework, etc."
            />
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={addEducation}
        className="w-full"
      >
        + Add Another Education
      </Button>
    </div>
  );
};
