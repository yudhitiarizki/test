// Import Library
const express = require("express");
const router = express.Router();

// Import Schemas
const Foods = require("../schemas/foodPosts");

// Detail
router.get("/food/detail/:foodName", async (req, res) => {
  const {foodName} = req.params
  const format_foodName = foodName.split('_').join(' ')
  const fetchDetail = await Foods.findOne({foodName: format_foodName, status: "approved"} );

  const results = {
    postId: fetchDetail.postId,
    foodName: fetchDetail.foodName,
    region: fetchDetail.region,
    likes: fetchDetail.likes,
    foodImage: fetchDetail.imageUrls,
    description: fetchDetail.description
  };

  res.json({
    data: results,
  });
});

module.exports = router;
