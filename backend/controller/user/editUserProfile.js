import UserProfile from "../../model/userProfile.js";

export const editUserProfile = async (req, res) => {
  try {
    console.log("inside user profile");
    const {
      fullName,
      email,
      phoneNumber,
      aboutMe,
      gender,
      university,
      degree,
      from,
      to,
      cgpa,
    } = req.body;

    console.log(
      fullName,
      email,
      phoneNumber,
      aboutMe,
      gender,
      university,
      degree,
      from,
      to,
      cgpa
    );

    if (
      !fullName ||
      !email ||
      !phoneNumber ||
      !aboutMe ||
      !gender ||
      !university ||
      !degree ||
      !from ||
      !to ||
      !cgpa
    ) {
      return res.status(400).json({ message: "Please fill required fileds" });
    }

    const user = await UserProfile.findOne({ email });
    if (user) {
      // edit user
      user.fullName = fullName;
      user.phoneNumber = phoneNumber;
      user.aboutMe = aboutMe;
      user.gender = gender;
      user.university = university;
      user.degree = degree;
      user.from = from;
      user.to = to;
      user.cgpa = cgpa;

      await user.save();
      return res
        .status(200)
        .json({ message: "User profile updated successfully", user });
    }

    const newUser = new UserProfile({
      fullName,
      email,
      phoneNumber,
      aboutMe,
      gender,
      university,
      degree,
      from,
      to,
      cgpa,
    });
    await newUser.save();

    if (newUser) {
      return res
        .status(201)
        .json({ message: "User profile created succesfully", newUser });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
