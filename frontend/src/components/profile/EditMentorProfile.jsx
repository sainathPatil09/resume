import React from "react";
import { Input } from "../ui/input";

const EditMentorProfile = () => {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border border-red-400 p-10">
        <h2 className="text-xl font-medium">Be a MENTOR</h2>
        <p className="text-gray-500">
          Personalize your profile and make it uniquely yours. Update your info,
          add a bio, and showcase your expertise. Make it stand out!
        </p>

        <div>
            {/* Designation */}
          <div className="flex flex-col">
            <label className="font-medium">Designation</label>
            <Input
              type="text"
              className="w-1/2"
              // onChange={(e) => setJobPosition(e.target.value)}
              placeholder="Enter Designation"
              required
            />
          </div>
          {/* company */}
          <div className="flex flex-col">
            <label className="font-medium">Company</label>
            <Input
              type="text"
              className="w-1/2"
              // onChange={(e) => setJobPosition(e.target.value)}
              placeholder="Enter Company"
              required
            />
          </div>
          {/* expr */}
          <div className="flex flex-col">
            <label className="font-medium">Experience</label>
            <Input
              type="text"
              className="w-1/2"
              // onChange={(e) => setJobPosition(e.target.value)}
              placeholder="Enter Experience"
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditMentorProfile;
