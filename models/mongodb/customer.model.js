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
  },
  {
    collection: "customers", // Specify the collection name
    timestamps: false, // Disable timestamps (createdAt, updatedAt)
  }
);

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
