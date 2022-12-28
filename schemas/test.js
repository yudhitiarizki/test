const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

testSchema.virtual("testId").get(function () {
    return this._id.toHexString();
});

module.exports = mongoose.model('Test', testSchema)