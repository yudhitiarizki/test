const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },{
    timestamps:true
});

commentsSchema.virtual("commentId").get(function () {
  return this._id.toHexString();
});

module.exports = mongoose.model("Comments", commentsSchema);
