const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, postsController.getPost);

router.post("/createSong", upload.single("file"), postsController.createSong);
// all these routes start with /post and then the URL => setup Routes

router.post('/updateSong/:id', postsController.updateSong
);

router.put("/likePost/:id", postsController.likePost);

// Configure the route for deleting a post
router.delete('/deletePost/:id', postsController.deletePost);

module.exports = router;
