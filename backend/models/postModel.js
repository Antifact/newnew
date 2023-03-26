const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  username: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String, required: false },
  date: { type: Date, required: false }
}, {
  timestamps: true
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;