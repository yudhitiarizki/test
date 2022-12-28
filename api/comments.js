// Import Library
const express = require("express");
const router = express.Router();

// Import Schemas
const Comments = require("../schemas/comments");
// const Comments = require("../schemas/comments");

// Create Comment
// router.post("/test", async (req, res) => {
//   const { name } = req.body;
//   const createTest = await Test.create({
//     name
//   });

//   res.json({
//     message: "data ayam berhasil ditambahkan",
//     data_baru: createTest });
// });

// Read
// router.get("/test", async (req, res) => {
//   const fetchTest = await Test.find();

//   const results = fetchTest.map((content) => {
// 		return {
//       testId: content.testId,
//       name: content.name
//     };
//   });

//   res.json({
//     data: results,
//   });
// });

// Delete Comment
// router.delete("/test/:testId", async (req, res) => {
//   const { testId } = req.params;

//   await Test.deleteOne({ _id:testId });
//   res.json({
//     message: "informasi berhasil dihapus",
//   });
// })

module.exports = router;
