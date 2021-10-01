const { graphqlHTTP } = require('express-graphql');

const schema = require('./typeDefs');
const resolvers = require('./resolvers');

const graphqlServer = graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true
});

module.exports = graphqlServer;
