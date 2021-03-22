const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { graphQlSchema } = require("./graphql/schema");
require("./db");

const app = express();
app.use(express.json());
app.use(
  "/",
  graphqlHTTP({
    schema: graphQlSchema,
    graphiql: true,
  })
);

app.listen(3000, () => {
  console.log("App is starting...");
});
