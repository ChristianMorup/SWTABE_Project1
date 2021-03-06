const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const router = express.Router();
const jwt = require("jsonwebtoken");
const roles = require("../roles");
const { hasRole } = require("../middleware/roleMiddleware");

const isAdminFunc = hasRole(roles.Admin);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Log in using username and password
 *     description: Use credentials to log in. If successfull it returns a jwt which is valid for an hour
 *     responses:
 *      200:
 *        description: Login succesful
 *        schema:
 *          title: Token object
 *          type: object
 *          items:
 *            title: token
 *            type: string
 *      401:
 *        description: Could not authenticate
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username.
 *                 example: admin
 *               password:
 *                 type: string
 *                 description: The password.
 *                 example: password
 */
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne().where("username").equals(username);

  if (!user) return res.sendStatus(401);

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) return res.sendStatus(401);

  const token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
      role: user.role,
      username: user.username,
    },
    "secret"
  );

  return res.send({ token });
});

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  const user = new User({ username, password: hash, role: roles.User });

  try {
    await user.save();
  } catch (error) {
    return res.sendStatus(400);
  }

  return res.sendStatus(200);
});

router.use("/promote", isAdminFunc);
router.put("/promote", async (req, res) => {
  const { username } = req.body;

  const user = await User.findOne().where("username").equals(username);

  if (!user) return res.sendStatus(404);

  user.role = roles.Manager;

  await user.save();

  return res.sendStatus(200);
});

module.exports = router;
