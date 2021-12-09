const { AuthenticationError } = require('apollo-server-express');
const { User, Portfolio, Crypto } = require('../models');
const { signToken } = require('../utils/auth');
const GraphQLJSON = require('graphql-type-json');
const cryptowatch = require('../utils/cryptowatch');

const resolvers = {
    JSON: GraphQLJSON,
    Query: {
        //EXP 
        // me: async (parent, args, context) => {
        //     if (context.user) {
        //         let queryObject = User.findOne({ _id: context.user._id }).populate('portfolios') // looking at the documentation it looks like a Query object is returned
        //         // console.log(queryObject);
        //         let promise = queryObject.exec(); // exec() looks to wrap the result of the query in a promise
        //         let value = await promise; // resolve the promise
        //         return value; // return the resolved value
        //     }
        //     throw new AuthenticationError('You need to be logged in!');
        // },

        // LAST STABLE
        me: async (parent, args, context) => {
            if (context.user) {
                return await User.findOne({ _id: context.user._id }).populate('portfolios')
            }
            throw new AuthenticationError('You need to be logged in!');
        },

        users: async (parent, args, context) => {

            return await User.find({}).populate('portfolios').populate({
                path: 'portfolios',
                populate: 'cryptos'
            });
        },
        
        getPortfolio: async (parent, { name }) => {
            // let portfolio = await Portfolio.findOne(
            //     { name: name }
            // ).exec();
            // console.log(portfolio);

            let queryObject = Portfolio.findOne({ name: name }); // looking at the documentation it looks like a Query object is returned
            // console.log(queryObject);
            let promise = queryObject.exec(); // exec() looks to wrap the result of the query in a promise
            let value = await promise; // resolve the promise
            return value; // return the resolved value


            // return portfolio;
        },
        
        // LAST STABLE???
        // getPortfolio: async (parent, { name }) => {
        //     let portfolio = await Portfolio.findOne(
        //         { name: name }
        //     ).exec();
            
        //     console.log(portfolio);
        //     return portfolio;
        // },
        // cryptoData: async (parent, args, context) => {
        //     const user = await User.findOne({ _id: context.user._id }).populate('portfolios').populate({
        //         path: 'portfolios',
        //         populate: 'cryptos'
        //     });  // why is this even here????????
        //     // console.log(" user test:", user)

        //     let arr = await cryptowatch.cryptoInfo();
        //     // console.log(arr);
        //     return { cryptoInfo: arr };
        // },
        cryptoData: async (parent, args, context) => {
            let arr = await cryptowatch.cryptoInfo();
            // console.log(arr);
            return { cryptoInfo: arr };
        },

        cryptoCandles: async (parent, args, context) => {
            let result = await cryptowatch.getCandlesData(args.pair);
            return { cryptoInfo: result }
        },
        cryptoDetails: async (parent, args, context) => {
            // console.log("This args", args, "This args end");
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
            // console.log(validPassword)

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
        updateBalance: async (parent, { name, deltaBalance }, context) => {
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
        // EXP
        // buyCrypto: async (parent, { name, ticker, quantity, investment }, context) => {
        //     if (context.user) {
        //         let queryObject = Portfolio.findOne({ name: name }); // looking at the documentation it looks like a Query object is returned
        //         // console.log(queryObject);
        //         let promise = queryObject.exec(); // exec() looks to wrap the result of the query in a promise
        //         let portfolioUpdate = await promise; // resolve the promise
        //         //     console.log("hihihihihih");
        //         // console.log("usdbalance", portfolioUpdate.usdBalance)

        //         // if (parseFloat(investment) > portfolioUpdate.usdBalance) {
        //         //     console.log("Overdraft prevented");
        //         //     return;
        //         // }

        //         let newBalance = portfolioUpdate.usdBalance - parseFloat(investment);


        //         await Portfolio.findOneAndUpdate(
        //             { name: name },
        //             { usdBalance: newBalance },
        //             { upsert: true, new: true }
        //         );

        //         return await Portfolio.findOneAndUpdate(
        //             { name: name },
        //             {
        //                 $addToSet: {
        //                     cryptos: { ticker, quantity, investment },
        //                 }
        //             },
        //             { upsert: true, new: true }
        //         );

        //     }
        //     throw new AuthenticationError('You need to be logged in');
        // },
        // sellCrypto: async (parent, { name, ticker, quantity, investment }, context) => {
        //     if (context.user) {
        //         let queryObject = Portfolio.findOne({ name: name }); // looking at the documentation it looks like a Query object is returned
        //         // console.log(queryObject);
        //         let promise = queryObject.exec(); // exec() looks to wrap the result of the query in a promise
        //         let portfolioUpdate = await promise; // resolve the promise

        //         // console.log("cryptoquantity", portfolioUpdate.cryptos.quantity)

        //         // ====== Change?
        //         if (parseFloat(investment) < portfolioUpdate.usdBalance) {
        //             console.log("Overdraft prevented");
        //             return;
        //         }
        //         // =======

        //         let newBalance = portfolioUpdate.usdBalance + parseFloat(investment);


        //         await Portfolio.findOneAndUpdate(
        //             { name: name },
        //             { usdBalance: newBalance },
        //             { upsert: true, new: true }
        //         );

        //         return await Portfolio.findOneAndUpdate(
        //             { name: name },
        //             {
        //                 $addToSet: {
        //                     cryptos: { ticker, quantity },
        //                 }
        //             },
        //             { upsert: true, new: true }
        //         );
        //     }
        //     throw new AuthenticationError('You need to be logged in');
        // },


        // last stable
        buyCrypto: async (parent, { name, ticker, quantity, investment }, context) => {
            if (context.user) {
                const portfolioUpdate = await Portfolio.findOne(
                    { name: name }
                )
                    console.log("hihihihihih");
                console.log("usdbalance", portfolioUpdate.usdBalance)

                // if (parseFloat(investment) > portfolioUpdate.usdBalance) {
                //     console.log("Overdraft prevented");
                //     return;
                // }

                let newBalance = portfolioUpdate.usdBalance - parseFloat(investment);


                await Portfolio.findOneAndUpdate(
                    { name: name },
                    { usdBalance: newBalance },
                    { upsert: true, new: true }
                );

                return await Portfolio.findOneAndUpdate(
                    { name: name },
                    {
                        $addToSet: {
                            cryptos: { ticker, quantity, investment },
                        }
                    },
                    { upsert: true, new: true }
                );

            }
            throw new AuthenticationError('You need to be logged in');
        },
        sellCrypto: async (parent, { name, ticker, quantity, investment }, context) => {
            if (context.user) {
                const portfolioUpdate = await Portfolio.findOne(
                    { name: name }
                )

                console.log("cryptoquantity", portfolioUpdate.cryptos.quantity)

                // ====== Change?
                if (parseFloat(investment) < portfolioUpdate.usdBalance) {
                    console.log("Overdraft prevented");
                    return;
                }
                // =======

                let newBalance = portfolioUpdate.usdBalance + parseFloat(investment);


                await Portfolio.findOneAndUpdate(
                    { name: name },
                    { usdBalance: newBalance },
                    { upsert: true, new: true }
                );

                return await Portfolio.findOneAndUpdate(
                    { name: name },
                    {
                        $addToSet: {
                            cryptos: { ticker, quantity },
                        }
                    },
                    { upsert: true, new: true }
                );
            }
            throw new AuthenticationError('You need to be logged in');
        },
    }
}

module.exports = resolvers;
