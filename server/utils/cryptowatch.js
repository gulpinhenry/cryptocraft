const axios = require("axios");
require('dotenv').config();
const baseUrl = 'https://api.cryptowat.ch/';
const apiKey1 = `?apikey=${process.env.API_KEY1}`;  // API credit allowance of 10 per day 
// const apiKey2 = `?apikey=${process.env.API_KEY2}`; // API credit allowance of 10 per day
const apiKey2 = ``; // API credit allowance of 10 per day -- CURRENTLY ANON KEY
var exchange = 'bitfinex';
var pair = 'btcusd';


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
    let query = `${baseUrl}markets${getRandomAPIkey()}`;
    const response = await axios.get(query);
    console.log(response.data);
}

// GET ALL MARKETS-DETAILS
async function getMarketDetails() { // API credit cost .002
    let query = `${baseUrl}markets/${exchange}/${pair}${getRandomAPIkey()}`;
    const response = await axios.get(query);
    console.log(response.data);
}

// GET SINGLE PRICE
async function getSingleMarketPrice() { // API credit cost 0.005
    let query = `${baseUrl}markets/${exchange}/${pair}/price${getRandomAPIkey()}`;
    const response = await axios.get(query);
    console.log(response.data);
}

// GET ALL PRICES
async function getAllMarketPrices() { // API credit cost 0.005
    let query = `${baseUrl}markets/prices${getRandomAPIkey()}`;
    const response = await axios.get(query);
    console.log(response.data);
}

// GET SINGLE 24-HOUR DATA
async function getSingle24HourSummary() { // API credit cost 0.005
    let query = `${baseUrl}markets/${exchange}/${pair}/summary${getRandomAPIkey()}`;
    const response = await axios.get(query);
    console.log(response.data);
}

// GET ALL 24-HOUR DATA
async function getAll24HourSummary() { // API credit cost 0.015
    let query = `${baseUrl}markets/summaries${getRandomAPIkey()}`;
    const response = await axios.get(query);
    console.log(response.data);
}

// GET SINGLE OHLC CANDLESTICKS
async function getOHLCcandlesticks() { // API credit cost 0.015
    let query = `${baseUrl}markets/${exchange}/${pair}/ohlc${getRandomAPIkey()}`;
    const response = await axios.get(query);
    console.log(response.data);
}


module.exports = { getAllMarketPrices, getSingleMarketPrice, getAllMarkets, getMarketDetails, getAll24HourSummary, getSingle24HourSummary, getOHLCcandlesticks };