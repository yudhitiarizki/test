// Import Library
const express = require("express");
const router = express.Router();

// Import Schemas
const Foods = require("../schemas/foodPosts");

// Region List
router.get("/food/region/:region", async (req, res) => {
  const {region} = req.params
  const format_region = region.toLowerCase().split('_').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ')
  const fetchRegion = await Foods.find({region: format_region, status: "approved"} );

  const results = fetchRegion.map((content) => {
		return {
      postId: content.postId,
      foodName: content.foodName,
      likes: content.likes,
      foodImage: content.imageUrls[0],
    };
  });

  res.json({
    data: results,
  });
});

// Rating List
router.get("/food/rating", async (req, res) => {
  const fetchRating = await Foods.find({status: "approved"}, null, {limit:10} );

  const results = fetchRating.map((content) => {
		return {
      postId: content.postId,
      foodName: content.foodName,
      region: content.region,
      likes: content.likes,
      foodImage: content.imageUrls,
      description: content.description
    };
  });

  const results_sorted = results.sort((a,b)=>{
    return b.likes - a.likes
  });

  res.json({
    data: results_sorted,
  });
});


module.exports = router;
