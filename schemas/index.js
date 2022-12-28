const mongoose = require("mongoose");

const connect = () => {
  mongoose
  .connect('mongodb+srv://ayam:ayam@cluster0.chzg4j4.mongodb.net/ambojakulinesia?retryWrites=true&w=majority')
  .catch(err => console.log(err))
};
mongoose.set('strictQuery', true)

mongoose.connection.on("error", err => {
  console.error("MongoDB connection error", err);
});

module.exports = connect;