const axios = require('axios');
require('dotenv').config();

const baseUrl = 'https://api.cryptowat.ch/';
const apiKey1 = `?apikey=${process.env.API_KEY1}`; // API credit allowance of 10 per day

const coinmap = new Map();

//Get all tickers using getAllMarkets and filtering the data response
async function getAllMarkets() { // API credit cost .003
    const query = `${baseUrl}markets${apiKey1}`;
    const response = await axios.get(query);

    const crypto_data = response.data.result;

    let ticker_arr = [];

    for (let i = 0; i < crypto_data.length; i++) {
        if (crypto_data[i].active === true
            && crypto_data[i].pair.slice(-3) === 'usd'
            && crypto_data[i].exchange === 'coinbase-pro') {
            var ticker = crypto_data[i].pair.slice(0, -3);
            ticker_arr.push(ticker);
        }
    }
    // console.log(ticker_arr);
    return ticker_arr;
}


// Returns a list of tickers, with the associate values using
// market prices api call
async function getAllMarketPrices() { // API credit cost 0.005
    const query = `${baseUrl}markets/prices${apiKey1}`;

    const response = await axios.get(query);

    const arr = response.data.result;

    const phrase = 'market:coinbase-pro:';

    var marketPrices = Object.keys(arr).filter(function (k) {
        return k.indexOf(phrase) === 0;
    }).reduce(function (newData, k) {
        newData[k] = arr[k];
        return newData;
    }, {});
    const entries = Object.entries(marketPrices);
    var final = [];
    for (let i = 0; i < entries.length; i++) {
        if (entries[i][0].slice(-3) === 'usd') {
            final.push([entries[i][0].slice(0, -3).substring(20).toUpperCase(), entries[i][1]]);
        }
    }
    return final;
}


//GET SINGLE OHLC CANDLESTICKS FOR
async function getOHLCcandlesticks(exchange, ticker, one, six) { // API credit cost 0.015
    const pair = `${ticker}usd`;
    const query = `${baseUrl}markets/${exchange}/${pair}/ohlc${apiKey1}`;

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

    return { last_day, last_week, last_year };
}


//RETURNS A OBJECT OF CANDLE DATA
async function getCandlesData(symbol) {
    const ticker = symbol.toLowerCase();
    var sixHr = [];
    var hour = [];
    const exchange = 'coinbase-pro';

    const candles = await getOHLCcandlesticks(exchange, ticker, sixHr, hour);
    return candles;
}


// GETS THE ALL ASSETs TICKER AND NAME
async function getNameandTicker() {
    const query = `${baseUrl}assets${apiKey1}`;
    const response = await axios.get(query);
    const objects = response.data.result; //objects of all cryptos with name and ticker

    const ticker_arr = await getAllMarkets(); //array of all crypto tickers
    const final_arr = [];
    var result = objects.filter((item) => ticker_arr.includes(item.symbol));

    for (let i = 0; i < result.length; i++) {
        const object = result[i];
        coinmap.set(object.symbol.toUpperCase(), object.name);
        const new_object = (({ name, symbol }) => ({ name, symbol }))(object);
        final_arr.push(new_object);
    }
    console.log(coinmap);
    // console.log(final_arr);
    return final_arr;
}


//Joins getNameandTicker and getAllMarketPrices array and object
async function cryptoInfo() {
    var object = await getNameandTicker();
    var array = await getAllMarketPrices();


    for (let i = 0; i < array.length; i++) {
        
        if (coinmap.has(array[i][0]))
            array[i].unshift(coinmap.get(array[i][0]));
        else
            array[i].unshift("n/a");
    }
    return array;
}


//Return percentage change for an individual crypto with the ticker
async function cryptoDetails(symbol) {
    const ticker = symbol.toLowerCase();
    const candles = await getCandlesData(ticker);

    const lastDay = candles.last_day;
    const lastWeek = candles.last_week;
    const lastYear = candles.last_year;

    const percentDay = (((lastDay[23] - lastDay[0]) / lastDay[0]) * 100).toFixed(2);
    const percentWeek = (((lastWeek[27] - lastWeek[0]) / lastWeek[0]) * 100).toFixed(2);
    const percentYear = (((lastYear[51] - lastYear[0]) / lastYear[0]) * 100).toFixed(2);

    const high = Math.max(...lastYear);
    const low = Math.min(...lastYear);

    const cryptoData = {
        dailyChange: percentDay,
        weeklyChange: percentWeek,
        yearlyChange: percentYear,
        yearly_high: high,
        yearly_low: low,
    };

    // console.log(cryptoData)
    return cryptoData;
}


//Returns a 2-D array with unix time and price at that time
//first value is oldest datapoint
async function unixPrice(pair) {
    const query = `${baseUrl}markets/coinbase-pro/${pair}/ohlc${apiKey1}`;
    const response = await axios.get(query);


    const candleData = response.data.result;

    let six_hr = candleData[Object.keys(candleData)[9]];
    let six = six_hr.slice(-28);
    let timePrice = [];

    for (let i = 0; i < six.length; i++) {
        timePrice.push([six[i][0], six[i][4]]);
    }

    return timePrice;
}

async function calculateCryptoHistorical(ticker, dummy) {
    const pair = `${ticker}usd`;
    const historicalArray = await unixPrice(pair);
    var copy = [...dummy];
    var valueHistory = [];
    var x = 0;

    // console.log(copy);
    // console.log(historicalArray);

    for (let i = 0; i < historicalArray.length; i++) {
        if (copy[0].time <= historicalArray[i][0] && copy.length > 1) {
            x = copy[0].quantity;
            valueHistory.push(historicalArray[i][1] * x);
            copy.shift();
        } else if (copy.length === 1) {
            x = copy[0].quantity;
            valueHistory.push(historicalArray[i][1] * x);
        } else {
            valueHistory.push(historicalArray[i][1] * x);
        }
    }

    // console.log(valueHistory.length);
    // console.log(valueHistory);

    return valueHistory;
}


module.exports = { calculateCryptoHistorical, unixPrice, cryptoDetails, cryptoInfo, getNameandTicker, getCandlesData, getAllMarketPrices, getAllMarkets, getOHLCcandlesticks };
