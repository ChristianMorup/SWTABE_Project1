const mongoose = require("mongoose");
const { Room, roomSchema } = require("./room");

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, index: true },
  address: String,
  email: String,
  managerUsername: String,
  rooms: [roomSchema],
});

const Hotel = mongoose.model("hotel", hotelSchema);

module.exports = Hotel;
