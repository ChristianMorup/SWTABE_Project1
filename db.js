var mongoose = require("mongoose");

const url = process.env.MONGODB_URI
  ? process.env.MONGODB_URI
  : "mongodb://localhost:27017/project1";

console.log(url);

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

mongoose.connection.on("connected", () => {
  console.log(`Mongoose connected to ${url}`);
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
