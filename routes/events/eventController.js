const Event = require("./eventModel");

// Create Event
const createEvent = async (eventData) => {
  try {
    const newEvent = await Event.create(eventData);
    return newEvent;
  } catch (error) {
    throw error;
  }
};

// Get Event By Id
const getEventById = async (id) => {
  try {
    const event = await Event.findById(id);
    return event;
  } catch (error) {
    throw error;
  }
};

// Get All Events
// query req.query - what we pass into our getEvents function
const getEvents = async (filterQueries) => {
  try {
    // keep track of filters
    const queryObject = {};

    // keep track of sorts and sort order
    const sortObject = {};

    // if we have a category query
    if (filterQueries.category) {
      // add the property to our object with the query as the value
      queryObject.category = filterQueries.category;
      /* 
        queryObject = {
            category: filterQueries.category
        }
        */
    }

    if (filterQueries.minPrice && filterQueries.maxPrice) {
      // queryObject.minPrice = Number(filterQueries.minPrice)
      // queryObject.maxPrice = Number(filterQueries.maxPrice)

      // greater than or equal to min
      // AND less than or equal to max
      // $gte and $lte are used in mongoose for filtering by ranges
      queryObject.price = {
        $gte: Number(filterQueries.minPrice),
        $lte: Number(filterQueries.maxPrice),
      };
    }

    if (filterQueries.sortBy) {
      if (filterQueries.sortOrder === "desc") {
        sortObject[filterQueries.sortBy] = -1;
      } else {
        //sortBy = 1
        // will evaluate to price - adds the price key to our sortObject
        sortObject[filterQueries.sortBy] = 1; // 1 for ascending
        // sortObject["price"] -> sortObject.price
      }
    }

    /* OR
    if(filterQueries.sortBy === "price"){
        sortObject.price = 1 //for ascending
    }
    */

    // filterQueries.category
    // filterQueries.minPrice
    // .find() keys - what you are trying to filter by
    // const events = await Event.find({ category: filterQueries.category });
    // .sort(key: 1) = ascending sort
    // .sort(key: -1) = descending sort
    // queryObject /events?category=price -> { category: price  }
    const events = await Event.find(queryObject).sort(sortObject);
    return events;
  } catch (error) {
    throw error;
  }
};

// way to figure what event we are updating - event id /:eventId
// req.params.eventId

// what to update - everything specified in req.body
const updateEventById = async (eventId, eventData) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
        eventId, 
        eventData, 
        {new: true}); // allows it to return updated data
    console.log("updated");
    console.log(updatedEvent);
    return updatedEvent;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createEvent,
  getEvents,
  getEventById,
  updateEventById,
};
