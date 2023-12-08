const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Address: {
      type: String,
      required: true,
    },
  },
  {
    collection: "locations", // Specify the collection name
    timestamps: false, // Disable timestamps (createdAt, updatedAt)
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        ret.LocationID = ret._id; // Map _id to CarID
        delete ret._id; // Remove _id from the response
      },
    },
  }
);

const Location = mongoose.model("Location", locationSchema);

module.exports = Location;
