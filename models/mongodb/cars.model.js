const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    make: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    rentalRate: {
      type: Number,
      required: true,
    },
  },
  {
    collection: "cars", // Specify the collection name
    timestamps: false, // Disable timestamps (createdAt, updatedAt)
  }
);

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
