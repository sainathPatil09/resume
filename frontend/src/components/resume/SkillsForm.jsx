// src/components/resume/SkillsForm.jsx
import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

export const SkillsForm = ({ skillsList = [], updateFormData }) => {
  const [skills, setSkills] = useState(
    skillsList.length > 0
      ? skillsList
      : [
          {
            id: 1,
            skill: "",
            proficiency: "",
          },
        ]
  );

  const handleChange = (id, field, value) => {
    const updatedSkills = skills.map((skill) =>
      skill.id === id ? { ...skill, [field]: value } : skill
    );
    setSkills(updatedSkills);
    updateFormData(updatedSkills);
  };

  const addSkill = () => {
    const newSkill = {
      id: Date.now(),
      skill: "",
      proficiency: "",
    };
    const updatedSkills = [...skills, newSkill];
    setSkills(updatedSkills);
    updateFormData(updatedSkills);
  };

  const removeSkill = (id) => {
    if (skills.length === 1) return;
    const updatedSkills = skills.filter((skill) => skill.id !== id);
    setSkills(updatedSkills);
    updateFormData(updatedSkills);
  };

  return (
    <div className="space-y-6">
      {skills.map((skill, index) => (
        <div key={skill.id} className="border p-4 rounded-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Skill #{index + 1}</h3>
            {skills.length > 1 && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => removeSkill(skill.id)}
              >
                Remove
              </Button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor={`skill-${skill.id}`}>Skill</Label>
              <Input
                id={`skill-${skill.id}`}
                value={skill.skill}
                onChange={(e) =>
                  handleChange(skill.id, "skill", e.target.value)
                }
                placeholder="e.g., JavaScript"
              />
            </div>

            <div>
              <Label htmlFor={`proficiency-${skill.id}`}>Proficiency</Label>
              <Input
                id={`proficiency-${skill.id}`}
                value={skill.proficiency}
                onChange={(e) =>
                  handleChange(skill.id, "proficiency", e.target.value)
                }
                placeholder="e.g., Beginner, Intermediate, Expert"
              />
            </div>
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={addSkill}
        className="w-full"
      >
        + Add Another Skill
      </Button>
    </div>
  );
};
