const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    Make: {
      type: String,
      required: true,
    },
    Model: {
      type: String,
      required: true,
    },
    Year: {
      type: Number,
      required: true,
    },
    RentalRate: {
      type: Number,
      required: true,
    },
  },
  {
    collection: "cars", // Specify the collection name
    timestamps: false, // Disable timestamps (createdAt, updatedAt
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        ret.CarID = ret._id; // Map _id to CarID
        delete ret._id; // Remove _id from the response
      },
    },
  }
);

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
