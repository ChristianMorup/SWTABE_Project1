const mongoose = require("mongoose");
const { composeMongoose } = require("graphql-compose-mongoose");
const { schemaComposer } = require("graphql-compose");
const { GraphQLString } = require("graphql");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, index: true },
  password: String,
  role: String,
});

const User = mongoose.model("user", userSchema);

const UserTC = composeMongoose(User, {});

schemaComposer.Query.addFields({
  userById: UserTC.mongooseResolvers.findById(),
  userByUsername: {
    type: UserTC,
    args: { username: GraphQLString },
    resolve: async (_, { username }) => {
      return await User.findOne().where("username").equals(username);
    },
  },
});

schemaComposer.Mutation.addFields({
  userCreateOne: UserTC.mongooseResolvers.createOne(),
});

const UserGraphQlSchema = schemaComposer.buildSchema();

module.exports = {
  User,
  UserGraphQlSchema,
};
