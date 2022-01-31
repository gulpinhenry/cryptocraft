// const axios = require('axios');
// require('dotenv').config();

// const baseUrl = 'https://api.cryptowat.ch/';
// const apiKey1 = `?apikey=${process.env.API_KEY1}`; // API credit allowance of 10 per day


// // GET SINGLE 24-HOUR DATA
// async function getSingle24HourSummary(exchange, pair) { // API credit cost 0.005
//     const query = `${baseUrl}markets/${exchange}/${pair}/summary${apiKey1}`;

//     const response = await axios.get(query);
//     // console.log(response.data);
// }


// // GET ALL MARKETS-DETAILS
// async function getMarketDetails(exchange, pair) { // API credit cost .002
//     const query = `${baseUrl}markets/${exchange}/${pair}${apiKey1}`;

//     const response = await axios.get(query);
//     // console.log(response.data); 
// }