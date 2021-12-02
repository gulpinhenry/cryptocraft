const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String
        email: String
        password: String
        portfolios: [Portfolio]
    }

    type Portfolio {
        _id: ID!
        name: String
        cryptos: [Crypto]
        usdBalance: Number
        cryptoBalance: Number
        historicalBalance: [Number]
        gain: Number
    }

    type Crypto {
        _id: ID!
        ticker: String!
        name: String!
        quantity: Number
        investment: Number
        currentPrice: Number
        minutelyPrice: [Number]
        hourlyPrice: [Number]
        weeklyPrice: [Number]
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        users: [User]
        user(username: String!): User
        portfolios(username: String!): [Portfolio]
        portfolio(username: String, portfolioId: ID!): Portfolio
        cryptos(portfolioId: ID!): [Crypto]
        crypto(portfolioId: ID!, ticker: String!): Crypto
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        addPortfolio(name: String, usdBalance: Number!): Portfolio
        buyCrypto(ticker: String!, quantity: Number!, investment: Number!): Portfolio
        sellCrypto(ticker: String!, quantity: Number!): Portfolio
    }
`;

module.exports = typeDefs;