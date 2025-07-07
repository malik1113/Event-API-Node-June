const Event = require("./eventModel");

// Create Event
const createEvent = async (eventData) => {
    try {
        const newEvent = await Event.create(eventData)
        return newEvent
    } catch (error) {
        throw error;
    }
} 

// Get Event By Id
const getEventById = async (id) => {
    try {
        const event = await Event.findById(id)
        return event;
    } catch (error) {
        throw error;
    }
}

// Get All Events
const getEvents = async () => {
    try {
        const events = await Event.find()
        return events
    } catch (error) {
        throw error
    }
}


module.exports = {
    createEvent,
    getEvents,
    getEventById
}