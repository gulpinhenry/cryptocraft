const express = require('express');
const path = require('path');
const db = require('./config/connection');
// const routes = require('./routes');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');

const { unixPrice, cryptoDetails, getNameandTicker, getCandlesData, getAllMarketPrices, coinbaseCurrentPrice, getSingleMarketPrice, getAllMarkets, getMarketDetails, getSingle24HourSummary, getOHLCcandlesticks, cryptoInfo } = require('./utils/cryptowatch');


const app = express();
const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
})

server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));
// }

// app.use(routes);
// app.get('*', (req, res) => {
// res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

db.then(() => {
  app.listen(PORT, () => {
    console.log(`🌍 Now listening on localhost:${PORT}`);
    // console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`)
  });
});

// getAllMarketPrices();
// coinbaseCurrentPrice();
// getAllMarkets();
// getSingleMarketPrice("coinbase-pro", "btcusd");
// getSingleMarketPrice("binance", "btcbusd");
// getAllMarketPrices();
// getMarketDetails("binance", "btcbusd");
// getAll24HourSummary();
// getSingle24HourSummary();
// getOHLCcandlesticks("binance", "btcbusd", [], []);
// getCandlesData('btcusd');
// getNameandTicker();
// cryptoInfo();
// cryptoDetails('btc');
cryptoTest("coinbase-pro", 'btcusd');

