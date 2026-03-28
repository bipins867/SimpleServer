const typeDefs = `#graphql
  scalar JSON

  type User {
    id: ID!
    name: String!
  }

  type UserResponse {
    message: String!
    data: User
  }

  type DataResponse {
    message: String!
    receivedData: JSON
  }

  type Query {
    welcome: String!
    getUser(id: ID!): UserResponse!
    getEnvValue: String!
  }

  type Mutation {
    postData(data: JSON): DataResponse!
  }
`;

module.exports = typeDefs;
