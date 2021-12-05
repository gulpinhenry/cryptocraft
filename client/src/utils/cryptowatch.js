const axios = require("axios");
require('dotenv').config();
const baseUrl = 'https://api.cryptowat.ch/';
// const apiKey1 = `?apikey=${process.env.API_KEY1}`;  // API credit allowance of 10 per day 
const apiKey1 = `?apikey=NHUQDGN12WOLCYB079MA`;

//Get all tickers using getAllMarkets and filtering the data response 
//Returns a list of tickers
async function getAllMarkets() { // API credit cost .003
    let query = `${baseUrl}markets${apiKey1}`;

    const response = await axios.get(query);

    let crypto_data = response.data.result;

    var ticker_arr = [];

    for (let i = 0; i < crypto_data.length; i++) {
        if (crypto_data[i].active === true
            && crypto_data[i].pair.slice(-3) == 'usd'
            && crypto_data[i].exchange == 'coinbase-pro') {
            var ticker = crypto_data[i].pair.slice(0, -3)
            ticker_arr.push(ticker);
        }
    }
    return ticker_arr;
}

// GET ALL MARKETS-DETAILS
async function getMarketDetails(exchange, pair) { // API credit cost .002
    let query = `${baseUrl}markets/${exchange}/${pair}${apiKey1}`;

    const response = await axios.get(query);
    console.log(response.data);
}

// Returns a list of tickers, with the associate values using 
// market prices api call 
async function getAllMarketPrices() { // API credit cost 0.005
    let query = `${baseUrl}markets/prices${apiKey1}`;

    const response = await axios.get(query);

    const arr = response.data.result;

    const phrase = 'market:coinbase-pro:';

    var marketPrices = Object.keys(arr).filter(function (k) {
        return k.indexOf(phrase) == 0;
    }).reduce(function(newData, k) {
        newData[k] = arr[k];
        return newData;
    }, {});
    const entries = Object.entries(marketPrices);
    var final = [];
    for (let i = 0;  i < entries.length; i++ ) {
        if(entries[i][0].slice(-3) === 'usd') {
            final.push([entries[i][0].slice(0, -3).substring(20), entries[i][1]]);
    }
    }
    return final;
}


// GET SINGLE 24-HOUR DATA
async function getSingle24HourSummary(exchange, pair) { // API credit cost 0.005
    let query = `${baseUrl}markets/${exchange}/${pair}/summary${apiKey1}`;

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
    return { last_day, last_week};
}

//RETURNS A OBJECT OF CANDLE DATA 
async function getCandlesData(pair) {
    var sixHr = [];  
    var hour = [];
    const exchange = 'coinbase';

    const candles = await getOHLCcandlesticks(exchange, pair, sixHr, hour);
    console.log(candles);
    return candles;
}

// GETS THE ALL ASSETs TICKER AND NAME 
async function getNameandTicker() {
    let query = `${baseUrl}assets${apiKey1}`;
    const response = await axios.get(query); 
    const objects = response.data.result; //objects of all cryptos with name and ticker 

    const ticker_arr = await getAllMarkets(); //array of all crypto tickers 
    const final_arr =[];
    var result = objects.filter(item => ticker_arr.includes(item.symbol));

    for (let i = 0; i < result.length; i++) {
        const object = result[i];
        const new_object = (({ name, symbol}) => ({name , symbol}))(object);
        final_arr.push(new_object);
    }
    return final_arr;
}

//Joins getNameandTicker and getAllMarketPrices array and object 
async function cryptoInfo() {
    var object = await getNameandTicker();
    var array = await getAllMarketPrices();
    
    for(let i = 0; i < array.length; i++) {
        array[i].unshift(object[i].name)
    }
    console.log(array);
    return array;
}




module.exports = { cryptoInfo, getNameandTicker, getCandlesData, getAllMarketPrices, getAllMarkets, getMarketDetails, getSingle24HourSummary, getOHLCcandlesticks };
