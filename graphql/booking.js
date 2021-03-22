const { composeMongoose } = require("graphql-compose-mongoose");
const { GraphQLString, GraphQLList } = require("graphql");
const Booking = require("../models/booking");

const BookingTC = composeMongoose(Booking, {});

const bookingQueries = {
  bookingsByHotelName: {
    type: [BookingTC],
    args: { hotelName: GraphQLString },
    resolve: async (_, { hotelName }) => {
      const bookings = await Booking.find()
        .where("hotelName")
        .equals(hotelName);

      return bookings;
    },
  },
};

const bookingMutations = {
  createBooking: BookingTC.mongooseResolvers.createOne(),
};

module.exports = {
  bookingQueries,
  bookingMutations,
};
