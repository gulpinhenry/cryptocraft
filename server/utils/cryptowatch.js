const axios = require("axios");
const { JsonWebTokenError } = require("jsonwebtoken");
require('dotenv').config();
const baseUrl = 'https://api.cryptowat.ch/';
const apiKey1 = `?apikey=${process.env.API_KEY1}`;  // API credit allowance of 10 per day 
var keyedCoins = [];


// GET ALL MARKETS
async function getAllMarkets() { // API credit cost .003
    let query = `${baseUrl}markets${apiKey1}`;

    const response = await axios.get(query);

    crypto_data = response.data.result;

    var filter = [];


    for (let i = 0; i < crypto_data.length; i++) {
        if (crypto_data[i].active === true
            && crypto_data[i].pair.slice(-3) == 'usd'
            && crypto_data[i].exchange == 'coinbase-pro') {
            filter.push(crypto_data[i]);
        }
    }
    // console.log(filter);
    return filter;

}

// GET ALL MARKETS-DETAILS
async function getMarketDetails(exchange, pair) { // API credit cost .002
    let query = `${baseUrl}markets/${exchange}/${pair}${apiKey1}`;

    const response = await axios.get(query);
    console.log(response.data);
}
// {
//     id: 99,
//     exchange: 'kraken',
//     pair: 'ethgbp',
//     active: true,
//     route: 'https://api.cryptowat.ch/markets/kraken/ethgbp'
//   },



// GET SINGLE PRICE - Alex Custom
async function getSingleMarketPrice(exchange, pair) { // API credit cost 0.005
    let query = `${baseUrl}markets/${exchange}/${pair}/price${apiKey1}`;

    const response = await axios.get(query);
    let singlePrice = response.data.result.price;
    console.log(singlePrice);
    keyedCoins.push({ 'name': pair, "currentPrice": singlePrice })
    console.log(keyedCoins, keyedCoins.length);
    // console.log(response.data);
}

// GET ALL MARKET PRICE
async function getAllMarketPrices() { // API credit cost 0.005
    let query = `${baseUrl}markets/prices${apiKey1}`;

    const response = await axios.get(query);
    console.log(response.data);
}


// GET SINGLE 24-HOUR DATA
async function getSingle24HourSummary(exchange, pair) { // API credit cost 0.005
    let query = `${baseUrl}markets/${exchange}/${pair}/summary${apiKey1}`;

    const response = await axios.get(query);
    console.log(response.data);
}


// GET SINGLE OHLC CANDLESTICKS
async function getOHLCcandlesticks(exchange, pair) { // API credit cost 0.015
    let query = `${baseUrl}markets/${exchange}/${pair}/ohlc${apiKey1}`;

    const response = await axios.get(query);
    console.log(response.data);
}

//GET SINGLE OHLC CANDLESTICKS FOR 
async function getOHLCcandlesticks(exchange, pair) { // API credit cost 0.015
    let query = `${baseUrl}markets/${exchange}/${pair}/ohlc${apiKey1}`;

    const response = await axios.get(query);

    const candleData = response.data.result;

    const minute = candleData[Object.keys(candleData)[0]];
    const hour = candleData[Object.keys(candleData)[5]];
    const day = candleData[Object.keys(candleData)[10]];
    const week = candleData[Object.keys(candleData)[12]];
    console.log(minute) // 
    console.log('------------------')
    // console.log(hour) //one month ago 
    // console.log('------------------')
    // console.log(day) //789 two years ago 
    // console.log('------------------')
    // console.log(week) //two years ago 
}


async function coinbaseCurrentPrice() {
    let filtered = await getAllMarkets();
    for (var i = 0; i < filtered.length; i++) {
        let cwPair = filtered[i].pair
        console.log(cwPair);
        getSingleMarketPrice("coinbase-pro", cwPair);
        // keyedCoins.push({ 'name': cwPair, "currentPrice": singlePrice })
    };
}



module.exports = { coinbaseCurrentPrice, getSingleMarketPrice, getAllMarketPrices, getAllMarkets, getMarketDetails, getSingle24HourSummary, getOHLCcandlesticks };


// function calcGainsOnSell() {
//     let sellPrice = (currentPrice * quantity);

//     if (sellPrice >= investment){
//         let investment = 0;
//     } else {
//         let investment = (investment - sellPrice);
//     }
// }
