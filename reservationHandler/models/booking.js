const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  hotelName: String,
  roomId: String,
  start: Date,
  end: Date,
  user: String,
});

const Booking = mongoose.model("booking", bookingSchema);

module.exports = Booking;
