const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  imageLink: String,
  imageName: String,
  title: String,
  phone: String,
  position: String,
  education: String,
  experience: String,
  subject: String,
  classLevel: String,
  location: String
});

module.exports = mongoose.model("Teacher", teacherSchema);
