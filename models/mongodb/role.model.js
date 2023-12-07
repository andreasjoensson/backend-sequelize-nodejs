const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    roleName: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    collection: "roles", // Specify the collection name
    timestamps: false, // Disable timestamps (createdAt, updatedAt)
  }
);

const Role = mongoose.model("Role", roleSchema);

module.exports = Role;
