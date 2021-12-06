const { AuthenticationError } = require('apollo-server-express');
const { User, Portfolio, Crypto } = require('../models');
const { signToken } = require('../utils/auth');
const GraphQLJSON = require('graphql-type-json');
const cryptowatch = require('../utils/cryptowatch');

const resolvers = {
    JSON: GraphQLJSON,
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('portfolios').populate({
                    path: 'portfolios',
                    populate: 'cryptos'
                });
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        users: async (parent, args, context) => {

            return User.find({}).populate('portfolios').populate({
                path: 'portfolios',
                populate: 'cryptos'
            });
        },
        cryptoData: async (parent, args, context) => {
            const user = await User.findOne({ _id: context.user._id }).populate('portfolios').populate({
                path: 'portfolios',
                populate: 'cryptos'
            });
            console.log(" user test:", user)

            let arr = cryptowatch.cryptoInfo();
            console.log(arr);
            return { cryptoInfo: arr };
        },
        cryptoCandles: async (parent, args, context) => {
            let result = await cryptowatch.getCandlesData(args.pair);
            return { cryptoInfo: result }
        },
        cryptoDetails: async (parent, args, context) => {
            console.log(args);
            let result = await cryptowatch.cryptoDetails(args.pair);
            return { cryptoInfo: result }
        }
    },
    Mutation: {
        addUser: async (parent, { username, firstName, lastName, password }) => {
            const portfolio = await Portfolio.create({ name: username, usdBalance: 1000000, historicalBalance: [1000000] })
            const user = await User.create({ username, firstName, lastName, password });
            const token = signToken(user);

            await User.findOneAndUpdate(
                { username: username },
                // { _id: id },
                { portfolios: portfolio },
                { new: true, runValidators: true }
            )

            return { token, user };
        },
        login: async (parent, { username, password }) => {
            const user = await User.findOne({ username });

            if (!user) {
                throw new AuthenticationError('No user found with this username');
            }

            const validPassword = await user.isCorrectPassword(password);
            console.log(validPassword)

            if (!validPassword) {
                throw new AuthenticationError('Error signing in');
            }

            const token = signToken(user);

            return { token, user };
        },
        addPortfolio: async (parent, { name, usdBalance }, context) => {
            // addPortfolio: async (parent, { name, usdBalance }) => {
            if (context.user) {
                // try {
                const portfolio = await Portfolio.create({
                    name,
                    usdBalance
                });

                console.log("created portfolio")
                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    // { _id: id },
                    { $addToSet: { portfolios: portfolio } },
                    { new: true, runValidators: true }
                )
                console.log('updated user')

            }
            throw new AuthenticationError('You need to be logged in')
        },
        removePortfolio: async (parent, { portfolioId }, context) => {
            if (context.user) {
                const portfolio = await Portfolio.findOneAndDelete({
                    _id: portfolioId
                });

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { portfolios: portfolio._id } }
                )

                return portfolio;
            }
            throw new AuthenticationError('You need to be logged in');
        },
        updateBalance: async (parent, {name, deltaBalance}, context) => {
            //     console.log('hello');
            // // if (context.user) {
            //     console.log(args = " <- was your arg");
            //     console.log('i need a miracle 123')
            //     console.log(context.params);
            //     console.log(context.query);
            //     console.log(context.user);

                // let result = await cryptowatch.getCandlesData(args.pair);
                // return { cryptoInfo: result }
                // console.log(result)

                // return Portfolio.findOneAndUpdate(
                //     { name: context.user.username }, //args.username
                //     {
                //         $addToSet: {
                //             historicalBalance: {  }
                //         }
                //     },
                //     {
                //         new: true,
                //         runValidators: true,
                //     }
                // )
                // // await User.findOneAndUpdate(
                //     { _id: context.user._id },

                // )
            // }
            // throw new AuthenticationError('You need to be logged in');
        },
        buyCrypto: async (parent, { ticker, quantity, investment }, context) => {
            if (context.user) {
                // const crypto = Portfolio.findOneAndUpdate(
                //     {name: context.user.username},
                //     {
                //         $addToSet: {
                //             cryptos: { ticker, quantity, investment }
                //         }
                //     }
                // );
                return crypto = Portfolio.findAndModify({
                    query: {name: context.user.username}, 
                    update: {
                        $addToSet: {
                            cryptos: { ticker, quantity, investment },
                        },
                    upsert: true
                    }
                });

                // db.Portfolio.findAndModify({
                //     query: { name: "Andy" },     
                //     update: { $inc: { score: 1 } },     upsert: true   })

                // need portfolio id in crypto model??
                // if (!crypto) {
                //     const newCrypto = await Crypto.create({
                //         ticker: ticker,
                //         quantity: quantity,
                //         investment: investment
                //     })

                //     return Portfolio.findOneAndUpdate(
                //         { _id: portfolioId },
                //         { $addToSet: { cryptos: newCrypto } }
                //     )
                // }

                // const updatedCrypto = await Crypto.findOneAndUpdate(
                //     { ticker: ticker },
                //     { quantity: { $sum: this.quantity + quantity } },
                //     { investment: { $sum: this.investment + investment } }
                // );
                

                // return Portfolio.findOneAndUpdate(
                //     { _id: portfolioId },
                //     { $addToSet: { cryptos: updatedCrypto } } // change it to set or update
                // )
            }
            throw new AuthenticationError('You need to be logged in');
        },
        sellCrypto: async (parent, { portfolioId, ticker, quantity, investment }, context) => {
            if (context.user) {
                const updatedCrypto = await Crypto.findOneAndUpdate(
                    { ticker: ticker },
                    { quantity: { $sum: this.quantity - quantity } },
                    { investment: { $sum: this.investment - investment } } // needs to change
                );

                return Portfolio.findOneAndUpdate(
                    { _id: portfolioId },
                    { $addToSet: { cryptos: updatedCrypto } } // change it to set or update
                );
            }
        }
    }
}

module.exports = resolvers;
