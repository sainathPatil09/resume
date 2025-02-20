// src/components/resume/AchievementsForm.jsx
import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

export const AchievementsForm = ({ achievementsList = [], updateFormData }) => {
  const [achievements, setAchievements] = useState(
    achievementsList.length > 0
      ? achievementsList
      : [
          {
            id: 1,
            title: "",
            description: "",
            date: "",
          },
        ]
  );

  const handleChange = (id, field, value) => {
    const updatedAchievements = achievements.map((achievement) =>
      achievement.id === id ? { ...achievement, [field]: value } : achievement
    );
    setAchievements(updatedAchievements);
    updateFormData(updatedAchievements);
  };

  const addAchievement = () => {
    const newAchievement = {
      id: Date.now(),
      title: "",
      description: "",
      date: "",
    };
    const updatedAchievements = [...achievements, newAchievement];
    setAchievements(updatedAchievements);
    updateFormData(updatedAchievements);
  };

  const removeAchievement = (id) => {
    if (achievements.length === 1) return;
    const updatedAchievements = achievements.filter(
      (achievement) => achievement.id !== id
    );
    setAchievements(updatedAchievements);
    updateFormData(updatedAchievements);
  };

  return (
    <div className="space-y-6">
      {achievements.map((achievement, index) => (
        <div key={achievement.id} className="border p-4 rounded-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Achievement #{index + 1}</h3>
            {achievements.length > 1 && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => removeAchievement(achievement.id)}
              >
                Remove
              </Button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor={`title-${achievement.id}`}>Title</Label>
              <Input
                id={`title-${achievement.id}`}
                value={achievement.title}
                onChange={(e) =>
                  handleChange(achievement.id, "title", e.target.value)
                }
                placeholder="e.g., Hackathon Winner"
              />
            </div>

            <div>
              <Label htmlFor={`date-${achievement.id}`}>Date</Label>
              <Input
                id={`date-${achievement.id}`}
                type="month"
                value={achievement.date}
                onChange={(e) =>
                  handleChange(achievement.id, "date", e.target.value)
                }
              />
            </div>
          </div>

          <div className="mt-4">
            <Label htmlFor={`description-${achievement.id}`}>Description</Label>
            <textarea
              id={`description-${achievement.id}`}
              className="w-full h-24 p-2 border rounded-md"
              value={achievement.description}
              onChange={(e) =>
                handleChange(achievement.id, "description", e.target.value)
              }
              placeholder="Describe the achievement or recognition."
            />
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={addAchievement}
        className="w-full"
      >
        + Add Another Achievement
      </Button>
    </div>
  );
};
