const mongoose = require("mongoose");

const insurancePolicySchema = new mongoose.Schema({
    CarID: { type: mongoose.Schema.Types.ObjectId, ref: 'Car' },
    Provider: { type: String, required: true },
    PolicyNumber: { type: String, required: true },
    ExpirationDate: { type: Date, required: true }
  });
  
  const InsurancePolicy = mongoose.model('InsurancePolicy', insurancePolicySchema);
  
  module.exports = InsurancePolicy;
  