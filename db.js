//MONGOOSE
const mongoose = require('mongoose');
const connectToDb = async () => {
    try {
        // await mongoose.connect('mongodb://127.0.0.1:27017/inotebook');
        await mongoose.connect(process.env.REACT_APP_MONGO_URL);
        console.log('Connection established successfully');
    }
    catch (error) {
        console.log("CONNECTION ERROR !!!");
    }
}
module.exports = connectToDb;
