// src/components/resume/ResumeForm.jsx
import { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

export const PersonalInfoForm = ({ formData, updateFormData }) => {
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case "fullName":
        return /^[A-Za-z\s]+$/.test(value) ? "" : "Please enter text only";
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? ""
          : "Please enter a valid email";
      case "phone":
        return /^\(\d{3}\)\s\d{3}-\d{4}$|^\d{10}$/.test(value)
          ? ""
          : "Please enter a valid phone number";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));

    updateFormData("personalInfo", {
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Personal Information</h2>

      <div>
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          name="fullName"
          value={formData.fullName || ""}
          onChange={handleChange}
          placeholder="John Doe"
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm">{errors.fullName}</p>
        )}
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email || ""}
          onChange={handleChange}
          placeholder="john.doe@example.com"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          name="phone"
          value={formData.phone || ""}
          onChange={handleChange}
          placeholder="(123) 456-7890"
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
      </div>

      <div>
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          name="location"
          value={formData.location || ""}
          onChange={handleChange}
          placeholder="New York, NY"
        />
      </div>

      {/* Social Media Handles */}
      <div>
        <Label htmlFor="linkedin">LinkedIn</Label>
        <Input
          id="linkedin"
          name="linkedin"
          value={formData.linkedin || ""}
          onChange={handleChange}
          placeholder="linkedin.com/in/johndoe"
        />
      </div>

      <div>
        <Label htmlFor="github">GitHub</Label>
        <Input
          id="github"
          name="github"
          value={formData.github || ""}
          onChange={handleChange}
          placeholder="github.com/johndoe"
        />
      </div>

      <div>
        <Label htmlFor="portfolio">Portfolio Website</Label>
        <Input
          id="portfolio"
          name="portfolio"
          value={formData.portfolio || ""}
          onChange={handleChange}
          placeholder="johndoe.com"
        />
      </div>

      <div>
        <Label htmlFor="summary">Professional Summary</Label>
        <textarea
          id="summary"
          name="summary"
          className="w-full h-32 p-2 border rounded-md"
          value={formData.summary || ""}
          onChange={handleChange}
          placeholder="A brief summary of your professional background and goals"
        />
      </div>
    </div>
  );
};
