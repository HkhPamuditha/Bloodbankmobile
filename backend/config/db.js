const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/bloodbank', {
      serverSelectionTimeoutMS: 10000, // 10 seconds timeout
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database Connection Error: ${error.message}`);
    if (error.message.includes('ENOTFOUND')) {
      console.error('Tip: This is a DNS issue. Try checking your internet or using a different DNS (like 8.8.8.8).');
    }
    process.exit(1);
  }
};

module.exports = connectDB;
