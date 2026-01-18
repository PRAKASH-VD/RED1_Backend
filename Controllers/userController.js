import User from "../Models/userModel.js";

export const updateMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = req.body.name || user.name;
    user.age = req.body.age || user.age;
    user.phone = req.body.phone || user.phone;

    if (req.file) {
      user.avatar = `/uploads/avatars/${req.file.filename}`;
    }

    await user.save();

    res.status(200).json({
      message: "Profile updated",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: "Profile update failed" });
  }
};
