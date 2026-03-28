const { GraphQLScalarType } = require('graphql');

// A simple custom scalar to handle arbitrary JSON for the postData mutation
const JSONScalar = new GraphQLScalarType({
  name: 'JSON',
  description: 'Arbitrary JSON object',
  serialize(value) {
    return value;
  },
  parseValue(value) {
    return value;
  },
  parseLiteral(ast) {
    return null; 
  }
});

const resolvers = {
  JSON: JSONScalar,
  Query: {
    welcome: () => 'Welcome to the simple GraphQL server!',
    getEnvValue: () => process.env.TEST_ENV_VAR || 'No value found from .env',
    getUser: (_, { id }) => ({
      message: `Fetched detail for user ${id}`,
      data: { id, name: `User ${id}` }
    })
  },
  Mutation: {
    postData: (_, { data }) => {
      if (!data || Object.keys(data).length === 0) {
        throw new Error('No data provided in the request body');
      }
      return {
        message: 'Data received successfully',
        receivedData: data
      };
    }
  }
};

module.exports = resolvers;
