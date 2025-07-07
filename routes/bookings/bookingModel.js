const mongoose = require("mongoose")

const ObjectId = mongoose.Schema.Types.ObjectId;

const bookingSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    event: {
        type: ObjectId,
        ref: "Event",
        required: true
    },
    quantity: {
        type: Number,
        min: 1,
        required: true
    },
    totalPrice: {
        type: Number
    },
    status: {
        type: String,
        required: true,
        default: "confirmed"
    }
}, {
    timestamps: true
})

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking