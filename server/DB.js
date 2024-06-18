const mongoose = require('mongoose');

const connectDb = async (url) => {
  try {
    const data = await mongoose.connect(url);
    console.log('Connected to Database');
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDb;
