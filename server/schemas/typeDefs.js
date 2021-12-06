const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
    }

    type Photo {
        _id: ID
        photographer: String
        fileName: String
        title: String
        description: String
    }
    
    type Query {
        me: User
        users: [User]
        photos: [Photo]
    }
    
    type Auth {
        token: ID!
        user: User
    }  

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
    }
`;

module.exports = typeDefs;
