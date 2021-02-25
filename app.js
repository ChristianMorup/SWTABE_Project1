const { hasRole } = require("./middleware/roleMiddleware");
const express = require("express");
const roles = require("./roles");
const authController = require("./controllers/authController");
require("./db");

const isAdminFunc = hasRole(roles.Admin);

const app = express();
app.use(express.json());

app.use("/users", authController);

app.get("/", (req, res, next) => {
  res.send("Hello world 2");
});

app.listen(3000, () => {
  console.log("App is starting...");
});
