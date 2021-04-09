var mongoose = require("mongoose");
const User = require("./models/user");
const bcrypt = require("bcrypt");
const roles = require("./roles");

const url = process.env.MONGODB_URI
  ? process.env.MONGODB_URI
  : "mongodb://localhost:27017/project1";

const gracefulShutdown = (msg, callback) => {
  mongoose.connection.close(() => {
    console.log(`Mongoose disconnected through
    ${msg}`);
    callback();
  });
};

// Create a new MongoClient
async function main() {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  } catch (error) {
    console.log(error);
  }
}

mongoose.connection.on("connected", async () => {
  console.log(`Mongoose connected to ${url}`);

  if (await User.findOne().where("username").equals("admin")) return;

  const hash = await bcrypt.hash("password", 10);

  const user = new User({
    username: "admin",
    password: hash,
    role: roles.Admin,
  });

  await user.save();
});

mongoose.connection.on("error", (err) => {
  console.log("Mongoose connection error:", err);
});
mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

// For nodemon restarts
process.once("SIGUSR2", () => {
  gracefulShutdown("nodemon restart", () => {
    process.kill(process.pid, "SIGUSR2");
  });
});
// For app termination
process.on("SIGINT", () => {
  gracefulShutdown("app termination", () => {
    process.exit(0);
  });
});

main();
