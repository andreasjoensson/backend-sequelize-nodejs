const mongoose = require("mongoose");


const trafficViolationSchema = new mongoose.Schema({
    CarID: { type: mongoose.Schema.Types.ObjectId, ref: 'Car' },
    DateOfViolation: { type: Date, required: true },
    Description: { type: String, required: true },
    FineAmount: { type: Number },
    Paid: { type: Boolean, default: false }
  });
  
  const TrafficViolation = mongoose.model('TrafficViolation', trafficViolationSchema);
  
  module.exports = TrafficViolation;
  