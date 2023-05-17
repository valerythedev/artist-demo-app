const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id });
      res.render("profile.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getSong: async (req, res) => {
    try {
      const songs = await Post.find().sort({ createdAt: "desc" }).lean();
      res.render("song.ejs", { songs: songs });
    } catch (err) {
      console.log(err);
    }
  },
  getSongs: async (req, res) => {
    try {
      const songs = await Post.find().sort({ createdAt: "desc" }).lean();
      res.render("songs.ejs", { songs: songs });
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.render("post.ejs", { post: post, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  createSong: async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      await Post.create({
        songName: req.body.songName,
        image:result.secure_url,
        cloudinaryId:result.public_id,
        artistName: req.body.artistName,
        lyrics: req.body.lyrics,
        songWriter: req.body.songWriter,
        producer: req.body.producer,
        user: req.user.id,
        dateRelease:req.body.dateRelease
      });
      console.log("Post has been added!");
      res.redirect("/songs");
    } catch (err) {
      console.log(err);
    }
  },
  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/songs");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
