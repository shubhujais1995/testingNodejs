const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please add user name"],
  },
  email: {
    type: String,
    required: [true, "Please add user email address"],
    unique: [true, "Email address already taken"],
  },
  role: {
    type: String,
    enum: ["admin", "user", "superAdmin"],
    required: [true, "Please add user role"],
  },
  password: {
    type: String,
    required: [true, "Please add user Password"],
  },
  confirmationPassword: {
    type: String,
    required: [true, "Please add confirmation Password"]
  }
},{
  timestamps: true
});

module.exports = mongoose.model("Candidate", userSchema);
