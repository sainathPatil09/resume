// src/components/resume/ExperienceForm.jsx
import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

export const ExperienceForm = ({ experienceList = [], updateFormData }) => {
  const [experience, setExperience] = useState(
    experienceList.length > 0
      ? experienceList
      : [
          {
            id: 1,
            company: "",
            position: "",
            startDate: "",
            endDate: "",
            description: "",
          },
        ]
  );

  const handleChange = (id, field, value) => {
    const updatedExperience = experience.map((exp) =>
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    setExperience(updatedExperience);
    updateFormData(updatedExperience);
  };

  const addExperience = () => {
    const newExperience = {
      id: Date.now(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
    };
    const updatedExperience = [...experience, newExperience];
    setExperience(updatedExperience);
    updateFormData(updatedExperience);
  };

  const removeExperience = (id) => {
    if (experience.length === 1) return;
    const updatedExperience = experience.filter((exp) => exp.id !== id);
    setExperience(updatedExperience);
    updateFormData(updatedExperience);
  };

  return (
    <div className="space-y-6">
      {experience.map((exp, index) => (
        <div key={exp.id} className="border p-4 rounded-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Experience #{index + 1}</h3>
            {experience.length > 1 && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => removeExperience(exp.id)}
              >
                Remove
              </Button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor={`company-${exp.id}`}>Company</Label>
              <Input
                id={`company-${exp.id}`}
                value={exp.company}
                onChange={(e) =>
                  handleChange(exp.id, "company", e.target.value)
                }
                placeholder="Company Name"
              />
            </div>

            <div>
              <Label htmlFor={`position-${exp.id}`}>Position</Label>
              <Input
                id={`position-${exp.id}`}
                value={exp.position}
                onChange={(e) =>
                  handleChange(exp.id, "position", e.target.value)
                }
                placeholder="Software Engineer"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor={`start-${exp.id}`}>Start Date</Label>
                <Input
                  id={`start-${exp.id}`}
                  type="month"
                  value={exp.startDate}
                  onChange={(e) =>
                    handleChange(exp.id, "startDate", e.target.value)
                  }
                />
              </div>

              <div>
                <Label htmlFor={`end-${exp.id}`}>End Date</Label>
                <Input
                  id={`end-${exp.id}`}
                  type="month"
                  value={exp.endDate}
                  onChange={(e) =>
                    handleChange(exp.id, "endDate", e.target.value)
                  }
                />
              </div>
            </div>
          </div>

          <div className="mt-4">
            <Label htmlFor={`description-${exp.id}`}>Description</Label>
            <textarea
              id={`description-${exp.id}`}
              className="w-full h-24 p-2 border rounded-md"
              value={exp.description}
              onChange={(e) =>
                handleChange(exp.id, "description", e.target.value)
              }
              placeholder="Describe your responsibilities, achievements, etc."
            />
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={addExperience}
        className="w-full"
      >
        + Add Another Experience
      </Button>
    </div>
  );
};
