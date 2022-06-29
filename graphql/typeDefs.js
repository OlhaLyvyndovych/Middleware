const { gql } = require('apollo-server');

const typeDefs = gql`
type Post {
    id: ID!
    title: String
    body: String
    category: String
}
type Query {
    posts: [Post!]!
}
type Mutation {
    createPost(title: String!, body: String, category: String!): Post
}
`;

module.exports = typeDefs;