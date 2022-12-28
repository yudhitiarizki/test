const mongoose = require("mongoose");

const foodPostsSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    foodName: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      required: true,
    },
    imageUrls: {
      type: [String],
      required: true,
    },
    likes: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  }, {
  timestamps: true
});

foodPostsSchema.virtual("postId").get(function () {
  return this._id.toHexString();
});

module.exports = mongoose.model("FoodPosts", foodPostsSchema);
