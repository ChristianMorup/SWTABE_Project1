const { hasRole } = require("./middleware/roleMiddleware");
const express = require("express");
const roles = require("./roles");
const authController = require("./controllers/authController");
const hotelController = require("./controllers/hotelController");
const bookingController = require("./controllers/bookingController");

require("./db");

const isAdminFunc = hasRole(roles.Admin);

const app = express();
app.use(express.json());

app.use("/users", authController);
app.use("/hotel", hotelController);
app.use("/booking", bookingController);

app.get("/", (req, res, next) => {
  res.send("Hello world 2");
});

app.listen(3000, () => {
  console.log("App is starting...");
});
