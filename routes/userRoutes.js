const express = require("express");
const {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  getAllNotificationController,
  deleteAllNotificationController,
  getAllDoctorsController, // FIXED
  bookAppointmentController, // FIXED
  bookingAvailabilityController,
  userAppointmentsController,
} = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

//router object
const router = express.Router();

//routes
// LOGIN || POST
router.post("/login", loginController);

// REGISTER || POST
router.post("/register", registerController);

// AUTH || POST
router.post("/getUserData", authMiddleware, authController);

// APPLY DOCTOR || POST
router.post("/apply-doctor", authMiddleware, applyDoctorController);

// NOTIFICATION DOCTOR || POST
router.post(
  "/get-all-notification",
  authMiddleware,
  getAllNotificationController
);
// NOTIFICATION DOCTOR || POST
router.post(
  "/delete-all-notification",
  authMiddleware,
  deleteAllNotificationController
);

// GET ALL DOCTORS
router.get("/getAllDoctors", authMiddleware, getAllDoctorsController); // FIXED

// BOOK APPOINTMENT
router.post("/book-appointment", authMiddleware, bookAppointmentController); // FIXED

// BOOKING AVAILABILITY
router.post(
  "/booking-availability", // FIXED
  authMiddleware,
  bookingAvailabilityController
);

// APPOINTMENTS LIST
router.get("/user-appointments", authMiddleware, userAppointmentsController);

module.exports = router;
