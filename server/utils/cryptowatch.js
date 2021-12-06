const axios = require("axios");
const { JsonWebTokenError } = require("jsonwebtoken");
require('dotenv').config();
const baseUrl = 'https://api.cryptowat.ch/';
const apiKey1 = `?apikey=${process.env.API_KEY1}`;  // API credit allowance of 10 per day 

//Get all tickers using getAllMarkets and filtering the data response 
//Returns a list of tickers
async function getAllMarkets() { // API credit cost .003
    let query = `${baseUrl}markets${apiKey1}`;

    const response = await axios.get(query);

    crypto_data = response.data.result;

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
    // console.log(response.data);
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
            final.push([entries[i][0].slice(0, -3).substring(20).toUpperCase(), entries[i][1]]);
    }
    }
    return final;
}


// GET SINGLE 24-HOUR DATA
async function getSingle24HourSummary(exchange, pair) { // API credit cost 0.005
    let query = `${baseUrl}markets/${exchange}/${pair}/summary${apiKey1}`;

    const response = await axios.get(query);
    // console.log(response.data);
}

//GET SINGLE OHLC CANDLESTICKS FOR 
async function getOHLCcandlesticks(exchange, ticker, one, six) { // API credit cost 0.015
    const pair = ticker + 'usd';
    let query = `${baseUrl}markets/${exchange}/${pair}/ohlc${apiKey1}`;

    const response = await axios.get(query);

    const candleData = response.data.result;

    // const minute = candleData[Object.keys(candleData)[0]];
    var hour = candleData[Object.keys(candleData)[5]];
    var six_hr = candleData[Object.keys(candleData)[9]];
    var week = candleData[Object.keys(candleData)[12]];


    //returns the last 24, to signify the last 24 hours 
    one = hour.slice(-24);

    //returns the last 28, to signify the last week 
    six = six_hr.slice(-28);

    //returns the last 52, to signify the last year 
    week = week.slice(-52);

    //setting empty arrays for the values of each coin at their respective time 
    var last_day = [];
    var last_week = [];
    var last_year = [];

    for (let i = 0; i < one.length; i++) {
        last_day.push(one[i][4]);
    }

    for (let i = 0; i < six.length; i++) {
        last_week.push(six[i][4]);
    }

    for (let i = 0; i < week.length; i++) {
        last_year.push(week[i][4]);
    }

    return { last_day, last_week, last_year};
}

//RETURNS A OBJECT OF CANDLE DATA 
async function getCandlesData(symbol) {
    let ticker = symbol.toLowerCase()
    var sixHr = [];  
    var hour = [];
    const exchange = 'coinbase';

    const candles = await getOHLCcandlesticks(exchange, ticker, sixHr, hour);
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

    // console.log(array);
    
    for(let i = 0; i < array.length; i++) {
        array[i].unshift(object[i].name)
    }
    // console.log(array);
    return array;
}

//Return percentage change for an individual crypto with the ticker 
async function cryptoDetails(symbol) {
    let ticker = symbol.toLowerCase()
    var candles = await getCandlesData(ticker);

    const lastDay = candles.last_day;
    const lastWeek = candles.last_week;
    const lastYear =  candles.last_year;

    const percentDay = (((lastDay[23] - lastDay[0]) / lastDay[0]) * 100).toFixed(2)
    const percentWeek = (((lastWeek[27] - lastWeek[0]) / lastWeek[0]) * 100).toFixed(2)
    const percentYear = (((lastYear[51] - lastYear[0]) / lastYear[0]) * 100).toFixed(2)

    const high = Math.max(...lastYear)
    const low = Math.min(...lastYear)

    let cryptoData = {
        dailyChange: percentDay,
        weeklyChange: percentWeek, 
        yearlyChange: percentYear, 
        yearly_high: high,
        yearly_low: low
    }

    // console.log(cryptoData)
    return cryptoData;
}


//Returns a 2-D array with unix time and price at that time  
async function unixPrice(exchange, pair) {
    let query = `${baseUrl}markets/${exchange}/${pair}/ohlc${apiKey1}`;
    const response = await axios.get(query); 


    const candleData = response.data.result;

    var six_hr = candleData[Object.keys(candleData)[9]];
    let six = six_hr.slice(-28);
    var timePrice = [];

    for (let i = 0; i < six.length; i++) {
       timePrice.push([six[i][0], six[i][4]]);
    }


    console.log(timePrice)

}




module.exports = { unixPrice, cryptoDetails, cryptoInfo, getNameandTicker, getCandlesData, getAllMarketPrices, getAllMarkets, getMarketDetails, getSingle24HourSummary, getOHLCcandlesticks };
