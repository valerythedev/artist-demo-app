const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  songName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  cloudinaryId: {
    type: String,
    required: true,
  },
  artistName: {
    type: String,
    required: true,
  },
  lyrics: {
    type: String, // Updated to String as per the template
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  songWriter: {
    type: String,
    required: true,
  },
  producer: {
    type: String,
    required: true,
  },
  dateRelease:{
    type: Date,
    required:true,
    
  }
});

module.exports = mongoose.model('Post', PostSchema);