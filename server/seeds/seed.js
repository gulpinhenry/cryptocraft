const db = require('../config/connection');
const { Crypto, Portfolio, User } = require('../models');
const cryptoSeeds = require("./cryptos.json");
const portfolioSeeds = require("./portfolios.json");
const userSeeds = require("./users.json");

console.log("in seed");
db.then(async () => {
  console.log("in seed 0.5");
  await User.deleteMany({});
  await Portfolio.deleteMany({});
  await Crypto.deleteMany({});
  console.log("in seed 1");
  // bulk create each model
  const users = await User.insertMany(userSeeds);
  const portfolios = await Portfolio.insertMany(portfolioSeeds);
  const cryptos = await Crypto.insertMany(cryptoSeeds);
  console.log("in seed 2");
  for (newPortfolio of portfolios) {
    console.log("in seed 3");
    // randomly add each portfolio to a user
    const tempUser = users[Math.floor(Math.random() * users.length)];
    tempUser.portfolios.push(newPortfolio._id);
    await tempUser.save();

    // randomly add a crypto to a portfolio
    const tempCrypto = cryptos[Math.floor(Math.random() * cryptos.length)];
    newPortfolio.cryptos.push(tempCrypto._id);
    await newPortfolio.save();

  }

  console.log('all done!');
  process.exit(0);
});
console.log("end");