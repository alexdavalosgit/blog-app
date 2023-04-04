const router = require("express").Router();
const User = require("../models/User");
const BlogPost = require("../models/BlogPost");
const bcrypt = require("bcrypt");

// Update User
router.put("/:id", async (req, res) => {
  // request id matches parameter id
  if (req.body.userId === req.params.id) {
    // hash password
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(401).json("You can only update your account.");
  }
});

// Update user's password
router.put("/:id/password", async (req, res) => {
  const { id } = req.params;
  const { oldPassword, newPassword } = req.body;

  try {
    // Find user
    const user = await User.findById(id);
    // Compare old password with hashed password
    const validPassword = await bcrypt.compare(oldPassword, user.password);
    if (!validPassword) {
      return res.status(400).json("Old password is incorrect.");
    } else {
      // Hash new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      // Update user's password
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { password: hashedPassword },
        { new: true }
      );
      res.status(200).json(updatedUser);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
  }
});

// Delete User
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await BlogPost.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...");
      } catch (error) {
        res.status(500).json(error);
      }
    } catch (error) {
      res.status(404).json("User not found!");
    }
  } else {
    res.status(401).json("You can delete only your account!");
  }
});

// Get User
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(err);
  }
});

module.exports = router;
