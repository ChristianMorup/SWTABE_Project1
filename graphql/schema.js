const { SchemaComposer } = require("graphql-compose");
const { userQueries, userMutations } = require("./user");
const { hotelQueries, hotelMutations } = require("./hotel");
const { bookingQueries, bookingMutations } = require("./booking");

const schemaComposer = new SchemaComposer();

schemaComposer.Query.addFields({
  ...userQueries,
  ...hotelQueries,
  ...bookingQueries,
});

schemaComposer.Mutation.addFields({
  ...userMutations,
  ...hotelMutations,
  ...bookingMutations,
});

module.exports = {
  graphQlSchema: schemaComposer.buildSchema(),
};
