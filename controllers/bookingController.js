const express = require("express");
const Hotel = require("../models/hotel");
const Booking = require("../models/booking");
const { Room, roomSchema } = require("../models/room");
const router = express.Router();
const jwt = require("jsonwebtoken");
const roles = require("../roles");
const { hasRole } = require("../middleware/roleMiddleware");

const isManagerFunc = hasRole(roles.Manager);

router.use("/:hotelName/room/:roomId", hasRole(roles.User));
router.post("/:hotelName/room/:roomId", async (req, res) => {
  const { start, end } = req.body;
  const { hotelName, roomId } = req.params;

  const booking = new Booking({
    hotelName,
    roomId,
    start,
    end,
    user: req.user.username,
  });

  //Ideally extra validation if booking aldready exists

  await booking.save();

  return res.sendStatus(201);
});

router.get("/:hotelName", async (req, res) => {
  const { hotelName } = req.params;

  const bookings = await Booking.find().where("hotelName").equals(hotelName);

  return res.send({ bookings });
});

module.exports = router;
