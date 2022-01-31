// const { Schema, model } = require('mongoose');

// // This is a subdocument schema, it won't become its own model but we'll use it as in the portfolio schema
// const cryptoSchema = new Schema({
//     //
//     name: {
//         type: String,
//         required: true,
//     },
//     ticker: {
//         type: String,
//         required: true,
//     },
//     // percentage of crypto posted
//     quantity: {
//         type: Number,
//         required: true,
//     },
//     // how much money spent to purchase coin
//     investment: {
//         type: Number,
//         required: true,
//     },
//     // current price of the crypto
//     currentPrice: {
//         type: Number,
//         required: true,
//     },
//     // price every minute
//     minutelyPrice: {
//         type: Array,
//     },
//     // price per hour
//     hourlyPrice: {
//         type: Array,
//     },
//     // price per hour
//     weeklyPrice: {
//         type: Array,
//     },
// });

// const Crypto = model('Crypto', cryptoSchema);
// module.exports = Crypto;
