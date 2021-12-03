const axios = require("axios");
require('dotenv').config();
const baseUrl = 'https://api.cryptowat.ch/';
const apiKey1 = `?apikey=${process.env.API_KEY1}`;  // API credit allowance of 10 per day 
// const apiKey2 = `?apikey=${process.env.API_KEY2}`; // API credit allowance of 10 per day
const apiKey2 = ``; // API credit allowance of 10 per day -- CURRENTLY ANON KEY
// var exchange = 'bitfinex';
// var pair = 'btcusd';


// Chooses a random API key to increase the amount of calls we have.
function getRandomAPIkey() {
    let keyNumber = (Math.floor(Math.random() * 2) + 1);
    console.log(keyNumber);
    if (keyNumber === 1) {
        return apiKey1;
    } else if (keyNumber === 2) {
        return apiKey2;
    }
}


// GET ALL MARKETS
async function getAllMarkets() { // API credit cost .003
    // let query = `${baseUrl}markets${getRandomAPIkey()}`;
    let query = `${baseUrl}markets${apiKey1}`;

    const response = await axios.get(query);
    console.log(response.data);
}

// GET ALL MARKETS-DETAILS
async function getMarketDetails(exchange, pair) { // API credit cost .002
    // let query = `${baseUrl}markets/${exchange}/${pair}${getRandomAPIkey()}`;
    let query = `${baseUrl}markets/${exchange}/${pair}${apiKey1}`;

    const response = await axios.get(query);
    console.log(response.data);
}

// GET SINGLE PRICE
async function getSingleMarketPrice(exchange, pair) { // API credit cost 0.005
    // let query = `${baseUrl}markets/${exchange}/${pair}/price${getRandomAPIkey()}`;
    let query = `${baseUrl}markets/${exchange}/${pair}/price${apiKey1}`;

    const response = await axios.get(query);
    console.log(response.data);
}

// GET ALL PRICES
async function getAllMarketPrices() { // API credit cost 0.005
    // let query = `${baseUrl}markets/prices${getRandomAPIkey()}`;
    let query = `${baseUrl}markets/prices${apiKey1}`;

    const response = await axios.get(query);
    console.log(response.data);
}

// GET SINGLE 24-HOUR DATA
async function getSingle24HourSummary(exchange, pair) { // API credit cost 0.005
    // let query = `${baseUrl}markets/${exchange}/${pair}/summary${getRandomAPIkey()}`;
    let query = `${baseUrl}markets/${exchange}/${pair}/summary${apiKey1}`;

    const response = await axios.get(query);
    console.log(response.data);
}

// GET ALL 24-HOUR DATA
async function getAll24HourSummary() { // API credit cost 0.015
    // let query = `${baseUrl}markets/summaries${getRandomAPIkey()}`;
    let query = `${baseUrl}markets/summaries${apiKey1}`;

    const response = await axios.get(query);
    console.log(response.data);
}

// GET SINGLE OHLC CANDLESTICKS
async function getOHLCcandlesticks(exchange, pair) { // API credit cost 0.015
    // let query = `${baseUrl}markets/${exchange}/${pair}/ohlc${getRandomAPIkey()}`;
    let query = `${baseUrl}markets/${exchange}/${pair}/ohlc${apiKey1}`;

    const response = await axios.get(query);
    console.log(response.data);
}


module.exports = { getAllMarketPrices, getSingleMarketPrice, getAllMarkets, getMarketDetails, getAll24HourSummary, getSingle24HourSummary, getOHLCcandlesticks };


// function calcGainsOnSell() {
//     let sellPrice = (currentPrice * quantity);

//     if (sellPrice >= investment){
//         let investment = 0;
//     } else {
//         let investment = (investment - sellPrice);
//     }
// }