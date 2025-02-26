import MentorProfile from "../../model/mentorProfile.js";
import UserProfile from "../../model/userProfile.js";

export const editMentorProfile = async (req, res) => {
  try {
    const { designation, company, experience, email } = req.body;
    console.log(designation, company, experience, email);

    if (!designation || !company || !experience) {
      return res.status(400).json({ message: "Please fill required fileds" });
    }

    const user = await UserProfile.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Please create profile first" });
    }

    const newMentor = new MentorProfile({
      designation,
      company,
      experience,
    });
    await newMentor.save();

    if (newMentor) {
      return res
        .status(201)
        .json({ message: "Mentor profile created succesfully", newMentor });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
