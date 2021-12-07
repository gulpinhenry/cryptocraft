const { gql } = require('apollo-server-express');


const typeDefs = gql`
    scalar JSON
    scalar Date
    type User {
        _id: ID!
        username: String
        firstName: String
        lastName: String
        email: String
        portfolios: Portfolio
    }

    type Portfolio {
        _id: ID!
        name: String
        usdBalance: Float
        historicalBalance: [Float]
        cryptos: [Crypto]
    }

    type Crypto {
        name: String
        ticker: String
        quantity: Float
        investment: Float
        currentPrice: Float
        date: Date
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
        getPortfolio(name: String): Portfolio
        cryptoHistorical(name: String): cryptoData
        cryptos(portfolioId: ID!): [Crypto]
        crypto(portfolioId: ID!, ticker: String!): Crypto
        cryptoData: cryptoData
        cryptoCandles(pair: String): cryptoData
        cryptoDetails(pair: String): cryptoData
    }

    type Mutation {
        addUser(username: String!, firstName: String!, lastName: String!, password: String!): Auth
        login(username: String!, password: String!): Auth
        addPortfolio(name: String, usdBalance: Float): Portfolio
        updateBalance(name: String!): Portfolio
        updateUSDBalance(usdBalance: Float): Portfolio
        updateCryptoQuantity(quantity: Float): Crypto
        removePortfolio(portfolioId: ID!): Portfolio
        # 
        buyCrypto(name: String!, ticker: String!, quantity: Float!, investment: String!): Portfolio
        sellCrypto(ticker: String!, quantity: Float!): Portfolio
    }
`;

module.exports = typeDefs;
