const { hasRole } = require("./middleware/roleMiddleware");
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const roles = require("./roles");
const authController = require("./controllers/authController");
const hotelController = require("./controllers/hotelController");
const bookingController = require("./controllers/bookingController");

require("./db");

const isAdminFunc = hasRole(roles.Admin);

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Express API to manage hotels and rooms",
    version: "1",
    description: "This is just a demo API",
    servers: [
      {
        url: "http://localhost:3000",
        description: "Dev Server",
      },
    ],
  },
};

const options = {
  swaggerDefinition,
  apis: ["./controllers/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

const app = express();
app.use(express.json());

app.use("/users", authController);
app.use("/hotel", hotelController);
app.use("/booking", bookingController);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(3000, () => {
  console.log("App is starting...");
});
