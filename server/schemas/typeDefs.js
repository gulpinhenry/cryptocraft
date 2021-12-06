const { gql } = require('apollo-server-express');


const typeDefs = gql`
    scalar JSON
    type User {
        _id: ID!
        username: String
        firstName: String
        lastName: String
        email: String
        portfolios: [Portfolio]
    }

    type Portfolio {
        _id: ID!
        name: String
        cryptos: [Crypto]
        usdBalance: Float
        cryptoBalance: Float
        historicalBalance: [Float]
        gain: Float
    }

    type Crypto {
        _id: ID!
        ticker: String!
        name: String!
        quantity: Float
        investment: Float
        currentPrice: Float
        minutelyPrice: [Float]
        hourlyPrice: [Float]
        weeklyPrice: [Float]
    }

    type Auth {
        token: ID!
        user: User
    }

    type cryptoData {
        cryptoInfo: JSON
    }

    type Query {
        me: User
        users: [User]
        user(username: String!): User
        portfolios(username: String!): [Portfolio]
        portfolio(username: String, portfolioId: ID!): Portfolio
        cryptos(portfolioId: ID!): [Crypto]
        crypto(portfolioId: ID!, ticker: String!): Crypto
        cryptoData: cryptoData
        cryptoCandles(pair: String): cryptoData
    }

    type Mutation {
        addUser(username: String!, firstName: String!, lastName: String!, password: String!): Auth
        login(username: String!, password: String!): Auth
        addPortfolio(name: String, usdBalance: Float): Portfolio
        removePortfolio(portfolioId: ID!): Portfolio
        buyCrypto(ticker: String!, quantity: Float!, investment: Float!): Portfolio
        sellCrypto(ticker: String!, quantity: Float!): Portfolio
    }
`;

module.exports = typeDefs;
