import mongoose from "mongoose";

const mentorProfileSchema = new mongoose.Schema({
  designation: {
    type: String,
    require: true,
  },
  company: {
    type: [String],
    require: true,
  },
  experience: {
    type: String,
    require: true,
  },
});

const MentorProfile = mongoose.model("MentorProfile", mentorProfileSchema);

export default MentorProfile;
