const mongoose = require("mongoose");

const maintenanceRecordSchema = new mongoose.Schema({
    CarID: { type: mongoose.Schema.Types.ObjectId, ref: 'Car' },
    ServiceDate: { type: Date, required: true },
    Description: { type: String },
    Cost: { type: Number }
  });
  
  const MaintenanceRecord = mongoose.model('MaintenanceRecord', maintenanceRecordSchema);
  
  module.exports = MaintenanceRecord;
  