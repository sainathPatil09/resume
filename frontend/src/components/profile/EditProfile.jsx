import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const EditProfile = () => {
  const handleOnSubmit = () => {};
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border border-red-400 p-10">
        <h2 className="text-xl font-medium">Edit Your Profile</h2>
        <p className="text-gray-500">
          Personalize your profile and make it uniquely yours. Update your info,
          add a bio, and showcase your expertise. Make it stand out!
        </p>

        <div>
          <form onSubmit={handleOnSubmit}>
            <div className="flex flex-col gap-3">
              <div className="flex justify-start items-center gap-5">
                <img
                  className="w-20 h-20 rounded-full border border-blue-600"
                  src="/resume-pic.avif"
                  alt="Userimage"
                />

                <p>update your profile picture</p>
              </div>
              {/* full name */}
              <div className="flex flex-col">
                <label className="font-medium">Full Name</label>
                <Input
                  type="text"
                  className="w-1/2"
                  // onChange={(e) => setJobPosition(e.target.value)}
                  placeholder="Enter Full Name"
                  required
                />
              </div>
              {/* email */}
              <div className="flex flex-col">
                <label className="font-medium">Email</label>
                <Input
                  type="email"
                  className="w-1/2"
                  // onChange={(e) => setJobPosition(e.target.value)}
                  placeholder="Enter Email"
                  required
                />
              </div>
              {/* phone number */}
              <div className="flex flex-col">
                <label className="font-medium">Phone Number</label>
                <Input
                  type="number"
                  className="w-1/2"
                  // onChange={(e) => setJobPosition(e.target.value)}
                  placeholder="Enter Phone Number"
                  required
                />
              </div>
              {/* about me */}
              <div className="flex flex-col">
                <label className="font-medium">About me</label>
                <Textarea
                  className="w-1/2"
                  // onChange={(e) => setJobDesc(e.target.value)}
                  placeholder="Brief About you"
                  required
                />
              </div>
              {/* gender */}
              <div>
                <label className="font-medium">Gender</label>
                <RadioGroup defaultValue="option-one" className=" border w-1/2 p-2 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
