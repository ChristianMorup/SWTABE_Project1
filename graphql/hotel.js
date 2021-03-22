const { composeMongoose } = require("graphql-compose-mongoose");
const { Room } = require("../models/room");
const { GraphQLString, GraphQLInt } = require("graphql");
const Hotel = require("../models/hotel");

const RoomTC = composeMongoose(Room, {});
const HotelTC = composeMongoose(Hotel, {});

const hotelQueries = {
  hotelByName: {
    type: HotelTC,
    args: { hotelName: GraphQLString },
    resolve: async (_, { hotelName }) => {
      const hotel = await Hotel.findOne().where("name").equals(hotelName);
      if (!hotel) {
        throw new Error("No hotel exists with that name.");
      }

      return await Hotel.findOne().where("name").equals(hotelName);
    },
  },
};

const hotelMutations = {
  createHotel: HotelTC.mongooseResolvers.createOne(),
  createRoomInHotel: {
    type: RoomTC,
    args: {
      hotelName: GraphQLString,
      roomId: GraphQLString,
      roomSize: GraphQLInt,
      managerName: GraphQLString,
    },
    resolve: async (_, { hotelName, roomId, roomSize, managerName }) => {
      const hotel = await Hotel.findOne().where("name").equals(hotelName);

      if (!hotel || hotel.managerUsername !== managerName) {
        throw new Error("Hotel does not exist");
      }

      const room = new Room({
        id: roomId,
        roomSize,
        lastCleaned: new Date(),
        nonSmoking: true,
        occupied: false,
      });

      hotel.rooms.push(room);

      await hotel.save();

      return room;
    },
  },
};

module.exports = {
  hotelQueries,
  hotelMutations,
};
