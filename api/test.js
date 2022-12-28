// Import Library
const express = require("express");
const router = express.Router();

// Import Schemas
const Test = require("../schemas/test");

// Test connection
router.get("/testserver", (req, res) => {
  res.send("Connected to router");
});

// Create
router.post("/test", async (req, res) => {
  const { name } = req.body;
  const createTest = await Test.create({
    name
  });

  res.json({
    message: "data ayam berhasil ditambahkan",
    data_baru: createTest });
});

// Read
router.get("/test", async (req, res) => {
  const fetchTest = await Test.find();

  const results = fetchTest.map((content) => {
		return {
      testId: content.testId,
      name: content.name
    };
  });

  res.json({
    data: results,
  });
});

// Read Specific
router.get("/test/:testId", async (req, res) => {
  const { testId } = req.params;
  // Ntah kenapa virtual nggak bekerja disini.
  const content_specific = await Test.findOne({_id: testId});
  
  const results = {
      testId,
      name: content_specific.name
  };

  res.json({
    data: results,
  });
});

// Update
router.patch("/test/:testId", async (req, res) => {
  const { testId } = req.params;
  const { name } = req.body;
  await Test.updateOne({ _id: testId }, { $set: { name } });
  
  res.json({
    message: "informasi berhasil diubah",
  });
});

// Delete
router.delete("/test/:testId", async (req, res) => {
  const { testId } = req.params;

  await Test.deleteOne({ _id:testId });
  res.json({
    message: "informasi berhasil dihapus",
  });
})

module.exports = router;
