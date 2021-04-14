const http = require("http");
const { subscribe, sendMessage } = require("./messageQueue");
const Booking = require("./models/booking");

require("./db");

subscribe("bookings", async (msg) => {
  const bookingMessage = JSON.parse(msg.content.toString("utf8"));

  console.log("received booking: ", bookingMessage);

  const booking = new Booking({ ...bookingMessage });

  await booking.save();

  sendMessage({ ...bookingMessage }, "confirmation");
});

const server = http.createServer(() => {});

server.listen(3001);
