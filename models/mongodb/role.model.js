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
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        ret.RoleID = ret._id; // Map _id to CarID
        delete ret._id; // Remove _id from the response
      },
    },
  }
);

const Role = mongoose.model("Role", roleSchema);

module.exports = Role;
