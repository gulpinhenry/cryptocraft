const { AuthenticationError } = require('apollo-server-express');
const { User, Portfolio, Crypto } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id });
            }
            throw new AuthenticationError('You need to be logged in!');
        }
    },
    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user found with this email address');
            }

            const validPassword = await user.isCorrectPassword(password);

            if (!validPassword) {
                throw new AuthenticationError('Error signing in');
            }

            const token = signToken(user);
            
            return { token, user };
        },
        addPortfolio: async (parent, { name, usdBalance }, context) => {
            if (context.user) {
                const portfolio = await Portfolio.create({
                    name,
                    usdBalance
                });

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { portfolios: portfolio } },
                    { new: true, runValidators: true }
                )
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
        // buyCrypto: async (parent, { portfolioId, ticker }, context) => {
        //     if (context.user) {


        //         return Portfolio.findOneAndUpdate(
        //             { _id: portfolioId },
        //             {
        //                 $addToSet: ''
        //             }
        //         )
        //     }
        // }
    }
}

module.exports = resolvers;