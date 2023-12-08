require("dotenv").config();
const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI;
async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("connected to MongoDB");
  } catch {
    console.log(error);
  }
}

exports.connect = connect;
