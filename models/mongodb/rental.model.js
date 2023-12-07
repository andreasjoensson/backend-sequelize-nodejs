const mongoose = require("mongoose");

const rentalSchema = new mongoose.Schema(
  {
    rentalDate: {
      type: Date,
      required: true,
    },
    returnDate: {
      type: Date,
    },
    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
    },
  },
  {
    collection: "rentals", // Specify the collection name
    timestamps: false, // Disable timestamps (createdAt, updatedAt)
  }
);

const Rental = mongoose.model("Rental", rentalSchema);

module.exports = Rental;
