const mongoose = require("mongoose");

const rentalSchema = new mongoose.Schema(
  {
    RentalDate: {
      type: Date,
      required: true,
    },
    ReturnDate: {
      type: Date,
    },
    Car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
    },
    Customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
    Location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
    },
  },
  {
    collection: "rentals", // Specify the collection name
    timestamps: false, // Disable timestamps (createdAt, updatedAt)
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        console.log("ret", ret);
        ret.RentalID = ret._id; // Map _id to CarID
        ret.CarID = ret.Car._id;
        ret.CustomerID = ret.Customer.id;
        ret.LocationID = ret.Location._id;
        delete ret._id; // Remove _id from the response
      },
    },
  }
);

const Rental = mongoose.model("Rental", rentalSchema);

module.exports = Rental;
