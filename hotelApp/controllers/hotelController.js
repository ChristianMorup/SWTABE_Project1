const express = require("express");
const Hotel = require("../models/hotel");
const { Room, roomSchema } = require("../models/room");
const router = express.Router();
const jwt = require("jsonwebtoken");
const roles = require("../roles");
const { hasRole } = require("../middleware/roleMiddleware");

const isManagerFunc = hasRole(roles.Manager);

router.use("/", hasRole(roles.Manager));
router.post("/", async (req, res) => {
  const { name, address, email } = req.body;

  const hotel = new Hotel({
    name,
    address,
    email,
    managerUsername: req.user.username,
  });

  await hotel.save();

  return res.sendStatus(201);
});

router.use("/:hotelName/room", hasRole(roles.Manager));
router.post("/:hotelName/room", async (req, res) => {
  const { roomId, size } = req.body;
  const { hotelName } = req.params;

  const hotel = await Hotel.findOne().where("name").equals(hotelName);

  if (
    !hotel ||
    hotel.managerUsername !== req.user.username ||
    hotel.rooms.find((r) => r.id === roomId)
  ) {
    return res.sendStatus(400);
  }

  const room = new Room({
    id: roomId,
    size,
  });

  hotel.rooms.push(room);

  await hotel.save();

  return res.sendStatus(201);
});

router.get("/:hotelName", async (req, res) => {
  const { hotelName } = req.params;

  const hotel = await Hotel.findOne().where("name").equals(hotelName);

  if (!hotel) {
    return res.sendStatus(404);
  }

  return res.send(hotel);
});

module.exports = router;
