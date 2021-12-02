const { Schema} = require('mongoose');

const cryptoSchema = require('./Crypto');

const portfolioSchema = new Schema(
  {
      // name of portfolio
      name: {
        type: String,
        required: true,
      },
      // buying power, how much I can purchase or spend
      usdBalance: {
        type: Number,
        required: true,
      },
      // total assets in portfolio
      cryptoBalance: {
        type: Number,
        required: true,
      },
      // used to log the changes in balance from market shifts
      historicalBalance: {
        type: [Number],
        required: true,
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
portfolioSchema.virtual('gain').get(function () {
    return this.cryptos.length; //change this
  });

// when we query a portfolio, we'll also get another field called `cryptoBalance` with an aggregate of all cryptos
portfolioSchema.virtual('cryptoBalance').get(function () {
  return this.cryptos.length; //change this
});


module.exports = portfolioSchema;
