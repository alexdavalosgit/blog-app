const router = require("express").Router();
const User = require("../models/User");
const BlogPost = require("../models/BlogPost");
const { findByIdAndUpdate } = require("../models/BlogPost");

// Create Post
router.post("/", async (req, res) => {
  const newPost = new BlogPost(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update Post
router.put("/:id", async (req, res) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id);
    // Check if post belongs to user
    if (blogPost.username === req.body.username) {
      try {
        const updatedBlogPost = await BlogPost.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedBlogPost);
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(401).json("You can only update your own posts.");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete Post
router.delete("/:id", async (req, res) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id);
    // Check if post belongs to user
    if (blogPost.username === req.body.username) {
      try {
        await blogPost.delete();
        res.status(200).json("Blog Post has been deleted.");
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(401).json("You can only delete your own posts.");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get Post
router.get("/:id", async (req, res) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id);
    res.status(200).json(blogPost);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get All Post
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catergoryName = req.query.cat;
  try {
    let blogPosts;
    if (username) {
      blogPosts = await BlogPost.find({ username });
    } else if (catergoryName) {
      blogPosts = await BlogPost.find({
        categories: {
          $in: [catergoryName],
        },
      });
    } else {
      blogPosts = await BlogPost.find();
    }
    res.status(200).json(blogPosts);
  } catch (error) {
    res.status(500).json(err);
  }
});

// Get All Post by ID
router.get("/:id", async (req, res) => {});

module.exports = router;
