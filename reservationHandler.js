const http = require("http");
const { subscribe, sendMessage } = require("./messageQueue");
const Booking = require("./models/booking");

const requestListener = (req, res) => {
  //something
};

const server = http.createServer(requestListener);

subscribe("bookings", async (msg) => {
  const bookingMessage = JSON.parse(msg);

  const booking = new Booking({ ...bookingMessage });

  await booking.save();

  sendMessage({ ...bookingMessage }, "confirmation");
});

server.listen(3001);
