const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth.js");

const Post = require("../models/Post");

//route POST api/auth/register
//private access
router.post("/", verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;

  //Validation
  if (!title) {
    return res
      .status(400)
      .json({ success: false, message: "Title is required" });
  }

  try {
    const newPost = new Post({
      title,
      description,
      url: url.startsWith("https://") ? url : `https://${url}`,
      status: status || "TO LEARN",
      user: req.userId,
    });

    await newPost.save();

    res.json({ success: true, message: "Create Success!", post: newPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

//@route GET api/posts
//GET post
//@access Private
router.get("/", verifyToken, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.userId }).populate("user", [
      "username",
    ]);
    res.json({ success: true, posts });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route PUT api/posts
// Update post
// @access Private
router.put("/:id", verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;

  // Simple validation
  if (!title)
    return res
      .status(400)
      .json({ success: false, message: "Title is required" });

  try {
    let updatedPost = {
      title,
      description,
      url: url.startsWith("https://") ? url : `https://${url}`,
      status: status || "TO LEARN",
    };

    const postUpdateCondition = { _id: req.params.id, user: req.userId };

    updatedPost = await Post.findOneAndUpdate(
      postUpdateCondition,
      updatedPost,
      { new: true }
    );

    // User not authorised to update post or post not found
    if (!updatedPost)
      return res.status(401).json({
        success: false,
        message: "Post not found or user not authorised",
      });

    res.json({
      success: true,
      message: "Update Success!",
      post: updatedPost,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route DELETE api/posts
// Delete post
// @access Private
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const postDeleteCondition = { _id: req.params.id, user: req.userId };
    const deletedPost = await Post.findOneAndDelete(postDeleteCondition);

    // User not authorised or post not found
    if (!deletedPost)
      return res.status(401).json({
        success: false,
        message: "Post not found or user not authorised",
      });

    res.json({ success: true, message: "Delete Success!", post: deletedPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
