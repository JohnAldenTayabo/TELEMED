const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, // Use ObjectId for references
      ref: "users", // Link to the 'users' collection
      required: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId, // Use ObjectId for references
      ref: "doctors", // Link to the 'doctors' collection
      required: true,
    },
    doctorInfo: {
      type: Object, // ✅ Correctly type as an Object
      required: true,
    },
    userInfo: {
      type: Object, // ✅ Correctly type as an Object
      required: true,
    },
    date: {
      type: String, // Keep as String for "DD-MM-YYYY" format
      required: true,
    },
    time: {
      type: String, // Keep as String for "HH:mm" format
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "pending",
    },
  },
  { timestamps: true }
);

const appointmentModel = mongoose.model("appointments", appointmentSchema);

module.exports = appointmentModel;
