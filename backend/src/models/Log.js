const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  log: {
    type: String,  // Store the encrypted log
    required: true,
  },
}, {
  timestamps: true,  // Automatically adds `createdAt` and `updatedAt` fields
});

const Log = mongoose.model("Log", logSchema);
module.exports = Log;
