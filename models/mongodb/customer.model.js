const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role", // Reference to the Role model
      },
    ],
  },
  {
    collection: "customers", // Specify the collection name
    timestamps: false, // Disable timestamps (createdAt, updatedAt)
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        ret.CustomerID = ret._id; // Map _id to CarID
        delete ret._id; // Remove _id from the response
      },
    },
  }
);

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
