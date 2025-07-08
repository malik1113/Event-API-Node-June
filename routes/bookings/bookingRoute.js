const express = require("express");
const router = express.Router();

const { createBooking, getAllBookings } = require("./bookingController");

router.get("/", async (req, res) => {
  try {
    const bookings = await getAllBookings();
    res.json({
      message: "success",
      payload: bookings,
    });
  } catch (error) {
    res.json({
      message: "failure",
      payload: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const booking = await createBooking(req.body);
    res.json({
      message: "success",
      payload: booking,
    });
  } catch (error) {
    res.json({
      message: "failure",
      payload: error.message,
    });
  }
});

module.exports = router;
