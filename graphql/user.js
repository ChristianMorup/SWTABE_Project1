const mongoose = require("mongoose");
const { composeMongoose } = require("graphql-compose-mongoose");
const { User } = require("../models/user");
const { GraphQLString } = require("graphql");

const UserTC = composeMongoose(User, {});

const userQueries = {
  userById: UserTC.mongooseResolvers.findById(),
  userByUsername: {
    type: UserTC,
    args: { username: GraphQLString },
    resolve: async (_, { username }) => {
      return await User.findOne().where("username").equals(username);
    },
  },
};

const userMutations = {
  userCreateOne: UserTC.mongooseResolvers.createOne(),
};

module.exports = {
  userQueries,
  userMutations,
};
