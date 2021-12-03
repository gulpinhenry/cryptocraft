const db = require('../config/connection');
const { Crypto, Portfolio, User } = require('../models');
const cryptoSeeds = require("./cryptos.json");
const portfolioSeeds = require("./portfolios.json");
const userSeeds = require("./users.json");

db.once('open', async () => {
  await User.deleteMany({});
  await User.create(userSeeds);

  console.log('all done!');
  process.exit(0);
});