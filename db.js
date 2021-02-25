const mongoose = require("mongoose");

//const url = 'mongodb://localhost:27017/abe-database';

const url = process.env.MONGODB_URI;

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

main();
