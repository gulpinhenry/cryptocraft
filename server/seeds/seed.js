const db = require('../config/connection');
const { Crypto, Portfolio, User } = require('../models');
const cryptoSeeds = require("./cryptos.json");
const portfolioSeeds = require("./portfolios.json");
const userSeeds = require("./users.json");

db.once('open', async () => {
  await Thought.deleteMany({});
  await Thought.create(thoughtSeeds);

  console.log('all done!');
  process.exit(0);
});