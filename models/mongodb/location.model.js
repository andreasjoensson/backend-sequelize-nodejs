const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    collection: "locations", // Specify the collection name
    timestamps: false, // Disable timestamps (createdAt, updatedAt)
  }
);

const Location = mongoose.model("Location", locationSchema);

module.exports = Location;
