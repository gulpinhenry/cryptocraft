const { Schema } = require("mongoose");

const cryptoSchema = require("./Crypto");

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `portfolio` array in User.js
const portfolioSchema = new Schema(
  {
    // name of portfolio
    name: {
      type: String,
      required: true,
    },
    // buying power, how much I can purchase or spend, not needed for now
    usdBalance: {
      type: Number,
      default: 1000000,
      //required: true,
    },
    // used to log the changes in balance from market shifts
    historicalBalance: {
      type: [Number],
      default: []
    },

    cryptos: [cryptoSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// when we query a portfolio, we can get the get the net gains, we probably dont need it now, but it can be used for later
portfolioSchema.virtual("gain").get(function () {
  return this.cryptos.length; //change this
});

// when we query a portfolio, we'll also get another field called `cryptoBalance` with an aggregate of all cryptos
// sum of all cryptos in portfolio, excluding usd, total assets is crytoBalance + usdBalance
portfolioSchema.virtual("cryptoBalance").get(function () {
  return this.cryptos.length; //change this
});


module.exports = portfolioSchema;
