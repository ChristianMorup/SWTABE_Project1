const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, index: true },
  occupied: Boolean,
  size: Number,
});

const Room = mongoose.model("room", roomSchema);

module.exports = { Room, roomSchema };
