const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, index: true },
  occupied: Boolean,
  size: Number,
  lastCleaned: Date,
  nonSmoking: Boolean,
});

const Room = mongoose.model("room", roomSchema);

module.exports = { Room, roomSchema };
