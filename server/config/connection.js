const mongoose = require('mongoose');

let n = mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://127.0.0.1/cryptocraft',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  }
);

module.exports = n;