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
async function getOHLCcandlesticks(exchange, pair, one, six) { // API credit cost 0.015
    let query = `${baseUrl}markets/${exchange}/${pair}/ohlc${apiKey1}`;

    const response = await axios.get(query);

    const candleData = response.data.result;

    // const minute = candleData[Object.keys(candleData)[0]];
    const hour = candleData[Object.keys(candleData)[5]];
    const six_hr = candleData[Object.keys(candleData)[9]];
    // const day = candleData[Object.keys(candleData)[10]];


    //returns the last 24, to signify the last 24 hours 
    one = hour.slice(-24);

    //returns the last 28, to signify the last week 
    six = six_hr.slice(-28);

    //setting empty arrays for the values of each coin at their respective time 
    var last_day = [];
    var last_week = [];

    for (let i = 0; i < one.length; i++) {
        last_day.push(one[i][4]);
    }

    for (let i = 0; i < six.length; i++) {
        last_week.push(six[i][4]);
    }

    // console.log(last_day);
    // console.log(last_week);

    // console.log(listA) // 24 entry points for the last day 
    // console.log(listB) // 6hr inteveral for the last week  
    console.log('------------------')
    // console.log(hour) //one month ago 
    // console.log('------------------')
    // console.log(day) //789 two years ago 
    // console.log('------------------')
    // console.log(week) //two years ago 

    return { last_day, last_week};
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


// //RETURNS A OBJECT OF CANDLE DATA 
async function getCandlesData(pair) {
    var sixHr = [];  
    var hour = [];
    const exchange = 'coinbase';

    const candles = await getOHLCcandlesticks(exchange, pair, sixHr, hour);
    console.log(candles);
    return candles;
}




module.exports = { getCandlesData, coinbaseCurrentPrice, getSingleMarketPrice, getAllMarketPrices, getAllMarkets, getMarketDetails, getSingle24HourSummary, getOHLCcandlesticks };



// function calcGainsOnSell() {
//     let sellPrice = (currentPrice * quantity);

//     if (sellPrice >= investment){
//         let investment = 0;
//     } else {
//         let investment = (investment - sellPrice);
//     }
// }
