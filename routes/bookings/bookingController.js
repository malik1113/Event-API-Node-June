const Booking = require("./bookingModel");
// add getEventById function for ticket availability and pricing data
const { getEventById } = require("../events/eventController");
const Event = require("../events/eventModel");

const getAllBookings = async () => {
  try {
    const bookings = await Booking.find()
      .populate("user", "username email -_id")
      .populate("event", "title -_id");
    return bookings;
  } catch (error) {
    throw error;
  }
};

const createBooking = async (bookingData) => {
  try {
    // utilize our existing controller to grab the event by its ID in order for us to calculate the price
    // bookingData.event - id of the event we're looking for
    const event = await getEventById(bookingData.event);

    // event.availableTickets -= bookingData.quantity;
    const newAvailableTickets = event.availableTickets - bookingData.quantity;

    // console.log("NEW TICKETS: " + newAvailableTickets)

    // bookingData.event - the event id
    await Event.findByIdAndUpdate(bookingData.event, {
      availableTickets: newAvailableTickets,
    });

    // copying everything from our booking data into a new object that we are free to modify
    const calculatedBookingData = {
      user: bookingData.user,
      event: bookingData.event,
      quantity: bookingData.quantity,
      status: bookingData.status,
      //totalPrice: our total price calculation
      totalPrice: bookingData.quantity * event.price,
    };

    const newBooking = await Booking.create(calculatedBookingData);
    return newBooking;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createBooking,
  getAllBookings,
};
