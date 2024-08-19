//MONGOOSE
const mongoose = require('mongoose');
require('dotenv').config();
const connectToDb = async () => {
    try {
        // await mongoose.connect('mongodb://127.0.0.1:27017/inotebook');
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connection established successfully');
    }
    catch (error) {
        console.log("CONNECTION ERROR !!!");
    }
}
module.exports = connectToDb;
