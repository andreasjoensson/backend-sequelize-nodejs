const mongoose = require("mongoose");

const accessorySchema = new mongoose.Schema({
    CarID: { type: mongoose.Schema.Types.ObjectId, ref: 'Car' },
    Name: { type: String, required: true },
    Description: { type: String }
  });
  
  const Accessory = mongoose.model('Accessory', accessorySchema);
  
  module.exports = Accessory;
  