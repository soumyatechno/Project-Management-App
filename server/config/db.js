const mongoose = require('mongoose');

const connectDB = async () => {
    const link = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MOngoDB Connected: ${link.connection.host}`.cyan.underline.bold);
};

module.exports = connectDB;