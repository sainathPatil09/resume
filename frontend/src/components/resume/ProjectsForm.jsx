// src/components/resume/ProjectsForm.jsx
import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

export const ProjectsForm = ({ projectsList = [], updateFormData }) => {
  const [projects, setProjects] = useState(
    projectsList.length > 0
      ? projectsList
      : [
          {
            id: 1,
            title: "",
            description: "",
            technologies: "",
            startDate: "",
            endDate: "",
          },
        ]
  );

  const handleChange = (id, field, value) => {
    const updatedProjects = projects.map((project) =>
      project.id === id ? { ...project, [field]: value } : project
    );
    setProjects(updatedProjects);
    updateFormData(updatedProjects);
  };

  const addProject = () => {
    const newProject = {
      id: Date.now(),
      title: "",
      description: "",
      technologies: "",
      startDate: "",
      endDate: "",
    };
    const updatedProjects = [...projects, newProject];
    setProjects(updatedProjects);
    updateFormData(updatedProjects);
  };

  const removeProject = (id) => {
    if (projects.length === 1) return;
    const updatedProjects = projects.filter((project) => project.id !== id);
    setProjects(updatedProjects);
    updateFormData(updatedProjects);
  };

  return (
    <div className="space-y-6">
      {projects.map((project, index) => (
        <div key={project.id} className="border p-4 rounded-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Project #{index + 1}</h3>
            {projects.length > 1 && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => removeProject(project.id)}
              >
                Remove
              </Button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor={`title-${project.id}`}>Project Title</Label>
              <Input
                id={`title-${project.id}`}
                value={project.title}
                onChange={(e) =>
                  handleChange(project.id, "title", e.target.value)
                }
                placeholder="e.g., AI-Powered Finance App"
              />
            </div>

            <div>
              <Label htmlFor={`technologies-${project.id}`}>
                Technologies Used
              </Label>
              <Input
                id={`technologies-${project.id}`}
                value={project.technologies}
                onChange={(e) =>
                  handleChange(project.id, "technologies", e.target.value)
                }
                placeholder="e.g., React, Node.js, MongoDB"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor={`start-${project.id}`}>Start Date</Label>
                <Input
                  id={`start-${project.id}`}
                  type="month"
                  value={project.startDate}
                  onChange={(e) =>
                    handleChange(project.id, "startDate", e.target.value)
                  }
                />
              </div>

              <div>
                <Label htmlFor={`end-${project.id}`}>End Date</Label>
                <Input
                  id={`end-${project.id}`}
                  type="month"
                  value={project.endDate}
                  onChange={(e) =>
                    handleChange(project.id, "endDate", e.target.value)
                  }
                />
              </div>
            </div>
          </div>

          <div className="mt-4">
            <Label htmlFor={`description-${project.id}`}>Description</Label>
            <textarea
              id={`description-${project.id}`}
              className="w-full h-24 p-2 border rounded-md"
              value={project.description}
              onChange={(e) =>
                handleChange(project.id, "description", e.target.value)
              }
              placeholder="Describe the project, key features, or your contributions."
            />
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={addProject}
        className="w-full"
      >
        + Add Another Project
      </Button>
    </div>
  );
};
